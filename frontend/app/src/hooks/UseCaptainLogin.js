import { useState, useCallback } from "react";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";
import { loginCaptain } from "../api/captainApi";
import { EmailVerify } from "../utils/UserUtils";

const UseCaptainLogin = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const captainLogin = useCallback(
    async (loginData) => {
      setLoading(true);
      setError(null);

      const toastId = toast.loading("Logging in...");

      try {
        // Validate login data
        if (!loginData.email || !loginData.password) {
          toast.error("Please fill in all fields", { id: toastId });
          return;
        }
        if (EmailVerify(loginData.email)) {
          toast.error("Enter a valid email address", { id: toastId });
          return;
        }

        if (loginData.password.trim().length < 6) {
          toast.error("Password must be at least 6 characters", {
            id: toastId,
          });
          return;
        }

        // Make API call to login
        const response = await loginCaptain(loginData);

        if (response?.data && response.status === 200) {
          toast.success("Login successful!", { id: toastId });
          navigate("/dashboard"); // Redirect to dashboard or desired page
        } else {
          setError(response?.message || "Login failed");
          toast.error(response?.message || "Invalid credentials", {
            id: toastId,
          });
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

  return { captainLogin, loading, error };
};

export default UseCaptainLogin;
