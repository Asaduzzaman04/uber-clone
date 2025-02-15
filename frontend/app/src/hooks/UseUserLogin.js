import { useState, useCallback } from "react";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";
import { userLogin } from "../api/userApi";
import { userEmailVerify } from "../utils/UserUtils";

const useUserLogin = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const loginUser = useCallback(
    async (formData) => {
      setLoading(true);
      setError(null);

      // Show loading toast and store its ID to dismiss later
      const toastId = toast.loading("Logging in...");

      try {
        if (!formData.email || !formData.password) {
          toast.error("Please fill in all fields", { id: toastId });
          return;
        }

        if (formData.password.trim().length < 6) {
          toast.error("Password must be at least 6 characters", { id: toastId });
          return;
        }

     
        if (userEmailVerify(formData.email)) {
          toast.error("Please enter a valid email address", { id: toastId });
          return;
        }

        const response = await userLogin(formData);

        if (response?.data && response.status === 200) {
          toast.success("Login successful!", { id: toastId });
          navigate("/"); // Redirect after successful login
        } else {
          setError(response?.message || "Login failed");
          toast.error(response?.message || "Invalid credentials", { id: toastId });
        }
      } catch (err) {
        console.error("Login error:", err.message);
        setError("Something went wrong. Please try again.");
        toast.error("Something went wrong. Please try again.", { id: toastId });
      } finally {
        setLoading(false);
      }
    },
    [navigate]
  );

  return { loginUser, loading, error };
};

export default useUserLogin;
