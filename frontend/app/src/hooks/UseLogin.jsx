import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";
import { userLogin } from "../api/userApi";


const UseUserLogin =async (formdata) => {
  try {
    if (!formdata.email || !formdata.password) {
      return toast.error("Please fill in all fiends");
    }

    if (formdata.password.trim().length < 6) {
      return toast.error("Password must be at least 6 characters");
    }
    
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if(!emailRegex.test(formdata.email.trim())){
     return toast.error("Please Enter a Valid email address") 
    }

    const response = await userLogin(formdata)
    
  } catch (error) {
    console.log(error);
  }
};






// Convert to a custom hook
// export const useUserLogin = () => {
//   const navigate = useNavigate();

//   const loginUser = async (formData) => {
//     try {
//       // Input validation
//       if (!formData.email || !formData.password) {
//         toast.error("Please fill in all fields");
//         return;
//       }

//       if (formData.password.trim().length < 6) {
//         toast.error("Password must be at least 6 characters");
//         return;
//       }

//       // Email validation using regex
//       const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

//       if (!emailRegex.test(formData.email.trim())) {
//         toast.error("Please enter a valid email address");
//         return;
//       }

//       // Make API call
//       const response = await userLogin(formData);
//       console.log(response);

//       if (response.data.success) {
//         // Store token in localStorage
//         localStorage.setItem("token", response.data.token);

//         // Show success message
//         toast.success("Login successful!");

//         // Navigate to dashboard
//         navigate("/dashboard");
//       }
//     } catch (error) {
//       // Handle different types of errors
//       if (error.response) {
//         // Server responded with an error
//         toast.error(error.response.data.message || "Login failed");
//       } else if (error.request) {
//         // Request was made but no response
//         toast.error("Network error. Please check your connection.");
//       } else {
//         // Something else went wrong
//         toast.error("An error occurred. Please try again.");
//       }
//       console.error("Login error:", error);
//     }
//   };

//   return { loginUser };
// };

// Convert to a custom hook
// export const useUserLogout = () => {
//   const navigate = useNavigate();

//   const logoutUser = () => {
//     try {
//       // Remove token from localStorage
//       localStorage.removeItem("token");

//       // Show success message
//       toast.success("Logged out successfully");

//       // Navigate to home page
//       navigate("/");
//     } catch (error) {
//       toast.error("Error logging out");
//       console.error("Logout error:", error);
//     }
//   };

//   return { logoutUser };
// };

// export const UseUserRegister = async (formData) => {
//   const navigate = useNavigate();

//   try {
//     // Input validation
//     if (!formData.email || !formData.password || !formData.name) {
//       toast.error("Please fill in all fields");
//       return;
//     }

//     if (formData.password.length < 6) {
//       toast.error("Password must be at least 6 characters");
//       return;
//     }

//     // Email validation
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!emailRegex.test(formData.email)) {
//       toast.error("Please enter a valid email address");
//       return;
//     }

//     // Make API call
//     const response = await axios.post(
//       "http://localhost:5000/api/v1/auth/register",
//       formData,
//       {
//         headers: {
//           "Content-Type": "application/json",
//         },
//       }
//     );

//     if (response.data.success) {
//       toast.success("Registration successful! Please login.");
//       navigate("/login-client");
//     }
//   } catch (error) {
//     if (error.response) {
//       toast.error(error.response.data.message || "Registration failed");
//     } else if (error.request) {
//       toast.error("Network error. Please check your connection.");
//     } else {
//       toast.error("An error occurred. Please try again.");
//     }
//     console.error("Registration error:", error);
//   }
// };

// Already a custom hook
// export const useAuthCheck = () => {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     if (token) {
//       setIsAuthenticated(true);
//     }
//     setLoading(false);
//   }, []);

//   return { isAuthenticated, loading };
// };
