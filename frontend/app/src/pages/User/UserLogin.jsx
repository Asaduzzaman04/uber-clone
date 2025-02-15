import { useState } from "react";
import { motion } from "motion/react";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook, FaApple, FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router";
import  { Toaster } from "react-hot-toast";
import useUserLogin from "../../hooks/UseUserLogin";

const UserLogin = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  //   user-login custom hooks
  const { loginUser, loading } = useUserLogin();

  //handle default sumbit and sent the data to custom userlogin hooks
  const handleSubmit = async (e) => {
    e.preventDefault();
     loginUser(formData);
  };

  const handleChange = (e) => {
    const {name, value} = e.target
    setFormData({ ...formData, [name]: value });
  };

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
  };

  // Add loading animation variants
  const loadingVariants = {
    start: {
      scale: 0.95,
      opacity: 0.8,
    },
    end: {
      scale: 1,
      opacity: 1,
    },
  };

  const loadingCircleVariants = {
    start: {
      rotate: 0,
    },
    end: {
      rotate: 360,
      transition: {
        duration: 1,
        repeat: Infinity,
        ease: "linear",
      },
    },
  };

  return (
    <>
      <Toaster position="top-center" />
      <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.5 }}
          className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md"
        >
          <motion.h2
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.2 }}
            className="text-2xl font-bold text-center mb-8"
          >
            Login to your account
          </motion.h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <motion.div
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.3 }}
            >
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="text"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all"
                placeholder="Enter your email"
                required
              />
            </motion.div>

            <motion.div
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.4 }}
            >
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all"
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
                >
                  {showPassword ? (
                    <FaEyeSlash className="text-xl" />
                  ) : (
                    <FaEye className="text-xl" />
                  )}
                </button>
              </div>
            </motion.div>

            <motion.div
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.5 }}
              className="flex items-center justify-between"
            >
              <Link
                to="/forgot-password"
                className="text-sm text-gray-600 hover:text-black"
              >
                Forgot Password?
              </Link>
            </motion.div>

            <motion.button
              variants={loadingVariants}
              initial="end"
              animate={loading ? "start" : "end"}
              whileHover={{ scale: loading ? 1 : 1.01 }}
              whileTap={{ scale: loading ? 1 : 0.99 }}
              type="submit"
              disabled={loading}
              className={`w-full py-3 rounded-lg font-medium transition-all relative ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-black text-white hover:bg-gray-800"
              }`}
            >
              {loading ? (
                <div className="flex items-center justify-center gap-2">
                  <motion.div
                    variants={loadingCircleVariants}
                    initial="start"
                    animate="end"
                    className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                  />
                  <span>Logging in...</span>
                </div>
              ) : (
                "Log In"
              )}
            </motion.button>
          </form>

          {/* Google authentication */}
          <motion.div
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.6 }}
            className="mt-8"
          >
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">
                  Or Login with
                </span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-3 gap-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex justify-center items-center py-2.5 border rounded-lg hover:bg-gray-50 transition-all"
              >
                <FcGoogle className="text-2xl" />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex justify-center items-center py-2.5 border rounded-lg hover:bg-gray-50 transition-all"
              >
                <FaFacebook className="text-2xl text-blue-600" />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex justify-center items-center py-2.5 border rounded-lg hover:bg-gray-50 transition-all"
              >
                <FaApple className="text-2xl" />
              </motion.button>
            </div>
          </motion.div>

          <motion.p
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.7 }}
            className="mt-8 text-center text-sm text-gray-600"
          >
            Don&apos;t have an account?{" "}
            <Link
              to="/register-client"
              className="font-medium text-black hover:underline"
            >
              Sign up
            </Link>
          </motion.p>
        </motion.div>
      </div>
    </>
  );
};

export default UserLogin;
