import { useState } from "react";
import { Link } from "react-router";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Toaster } from "react-hot-toast";
import { motion } from "motion/react";
import UseUserRegister from "../../hooks/UseUserRegister";

const UserSignUp = () => {
  // Destructure the registerUser function and loading state from the custom hook
  const { registerUser, loading } = UseUserRegister();

  // State to store form data
  const [formData, setFormData] = useState({
    fullname: {
      firstname: "",
      lastname: "",
    },
    email: "",
    password: "",
  });

  // State to toggle password visibility
  const [showPassword, setShowPassword] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => {
      if (name === "firstname" || name === "lastname") {
        // Update the specific fullname property
        return {
          ...prevData,
          fullname: {
            ...prevData.fullname,
            [name]: value,
          },
        };
      }
      // Update email or password
      return {
        ...prevData,
        [name]: value,
      };
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Call the registerUser function to send data to the backend
      await registerUser(formData);
    } catch (error) {
      console.error("Registration error:", error);
    }
  };

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  //

  // Animation variants for container and items
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <>
      {/* Toast notifications for user feedback */}
      <Toaster position="top-center" />
      <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          transition={{ duration: 0.5 }}
          className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md"
        >
          <motion.h2
            variants={itemVariants}
            className="text-2xl font-bold text-center mb-8"
          >
            Create your account
          </motion.h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Full Name Section */}
            <div className="grid grid-cols-2 gap-4">
              <motion.div variants={itemVariants}>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  First Name
                </label>
                <input
                  type="text"
                  name="firstname"
                  value={formData.fullname.firstname}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all"
                  required
                />
              </motion.div>

              <motion.div variants={itemVariants}>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Last Name
                </label>
                <input
                  type="text"
                  name="lastname"
                  value={formData.fullname.lastname}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all"
                  required
                />
              </motion.div>
            </div>

            {/* Email Field */}
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
                required
              />
            </motion.div>

            {/* Password Field */}
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

            {/* Submit Button */}
            <motion.button
              variants={itemVariants}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              type="submit"
              disabled = {loading}
              className={`w-full py-3 rounded-lg font-medium transition-all ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-black text-white hover:bg-gray-800"
              }`}
            >
              {loading ? "Creating Account..." : "Sign Up"}
            </motion.button>
          </form>

          {/* Login Link */}
          <motion.div
            variants={itemVariants}
            className="mt-8 text-center space-y-4"
          >
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <Link
                to="/login-client"
                className="font-medium text-black hover:underline"
              >
                Log in
              </Link>
            </p>
          </motion.div>

          {/* Terms and Privacy */}
          <motion.p
            variants={itemVariants}
            className="mt-4 text-xs text-center text-gray-500"
          >
            By signing up, you agree to our{" "}
            <Link to="/terms" className="underline">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link to="/privacy" className="underline">
              Privacy Policy
            </Link>
          </motion.p>
        </motion.div>
      </div>
    </>
  );
};

export default UserSignUp;
