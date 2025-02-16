import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook, FaApple, FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router";
import { Toaster } from "react-hot-toast";
import UseCaptainLogin from "../../hooks/UseCaptainLogin";

const Captainlogin = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const { captainLogin, loading } = UseCaptainLogin();

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    await captainLogin(formData);
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Animation variants
  const pageVariants = {
    initial: {
      opacity: 0,
      y: 20,
    },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        when: "beforeChildren",
        staggerChildren: 0.1,
      },
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: {
        duration: 0.3,
      },
    },
  };

  const itemVariants = {
    initial: { opacity: 0, x: -20 },
    animate: { 
      opacity: 1, 
      x: 0,
      transition: {
        duration: 0.3,
      },
    },
  };

  return (
    <AnimatePresence mode="wait">
      <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
        <Toaster position="top-center" />
        <motion.div
          variants={pageVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md"
        >
          <motion.h2
            variants={itemVariants}
            className="text-2xl font-bold text-center mb-8"
          >
            Captain Login
          </motion.h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <motion.div variants={itemVariants}>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all"
                placeholder="Enter your email"
                required
              />
            </motion.div>

            <motion.div variants={itemVariants}>
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

            <motion.button
              variants={itemVariants}
              whileHover={{ scale: loading ? 1 : 1.01 }}
              whileTap={{ scale: loading ? 1 : 0.99 }}
              type="submit"
              disabled={loading}
              className={`w-full py-3 rounded-lg font-medium transition-all flex items-center justify-center ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-black text-white hover:bg-gray-800"
              }`}
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                </div>
              ) : (
                "Log In"
              )}
            </motion.button>
          </form>

          {/* Social Login Options */}
          <motion.div variants={itemVariants} className="mt-8">
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
            className="mt-8 text-center text-sm text-gray-600"
          >
            Don&apos;t have an account?{" "}
            <Link
              to="/register-captain"
              className="font-medium text-black hover:underline"
            >
              Sign up
            </Link>
          </motion.p>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default Captainlogin;
