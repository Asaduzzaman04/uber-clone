import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router";
import { Toaster } from "react-hot-toast";
import UseCaptainRegister from "../../hooks/UseCaptainRegister";

const CaptainSignUp = () => {
  // Form data state
  const [formData, setFormData] = useState({
    fullname: {
      firstname: "",
      lastname: "",
    },
    email: "",
    password: "",
    vehicle: {
      color: "",
      plateNumber: "",
      vehicleType: "car", // Default value
      capactiy: 1, // Default value
    },
  });

  const [showPassword, setShowPassword] = useState(false);
  const { registerCaptain, loading } = UseCaptainRegister();

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    await registerCaptain(formData);
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Handle nested objects (fullname and vehicle)
    if (name.includes(".")) {
      const [parent, child] = name.split(".");

      setFormData((prev) => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
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
      <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 py-8">
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
            Register as Captain
          </motion.h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Personal Information Section */}
            <motion.div variants={itemVariants} className="space-y-4">
              <h3 className="text-lg font-semibold">Personal Information</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    First Name
                  </label>
                  <input
                    type="text"
                    name="fullname.firstname"
                    value={formData.fullname.firstname}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all"
                    required
                    minLength={3}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Last Name
                  </label>
                  <input
                    type="text"
                    name="fullname.lastname"
                    value={formData.fullname.lastname}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all"
                  />
                </div>
              </div>

              <div>
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
              </div>

              <div>
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
                    minLength={6}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
                  >
                    {showPassword ? (
                      <FaEyeSlash className="text-xl" />
                    ) : (
                      <FaEye className="text-xl" />
                    )}
                  </button>
                </div>
              </div>
            </motion.div>

            {/* Vehicle Information Section */}
            <motion.div variants={itemVariants} className="space-y-4">
              <h3 className="text-lg font-semibold">Vehicle Information</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Vehicle Color
                  </label>
                  <input
                    type="text"
                    name="vehicle.color"
                    value={formData.vehicle.color}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all"
                    required
                    minLength={3}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Plate Number
                  </label>
                  <input
                    type="text"
                    name="vehicle.plateNumber"
                    value={formData.vehicle.plateNumber}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all"
                    required
                    minLength={3}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Vehicle Type
                  </label>
                  <select
                    name="vehicle.vehicleType"
                    value={formData.vehicle.vehicleType}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all"
                    required
                  >
                    <option value="car">Car</option>
                    <option value="motorcycle">Motorcycle</option>
                    <option value="cng">CNG</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Capacity
                  </label>
                  <input
                    type="number"
                    name="vehicle.capactiy"
                    value={formData.vehicle.capactiy}
                    onChange={handleChange}
                    min="1"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all"
                    required
                  />
                </div>
              </div>
            </motion.div>

            {/* Submit Button */}
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
                "Register"
              )}
            </motion.button>
          </form>

          <motion.p
            variants={itemVariants}
            className="mt-8 text-center text-sm text-gray-600"
          >
            Already have an account?{" "}
            <Link
              to="/login-captain"
              className="font-medium text-black hover:underline"
            >
              Log in
            </Link>
          </motion.p>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default CaptainSignUp;