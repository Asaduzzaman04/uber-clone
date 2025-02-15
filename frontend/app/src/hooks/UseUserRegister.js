import { useCallback, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import { userEmailVerify } from "../utils/UserUtils";
import { userRegister } from "../api/userApi";

const UseUserRegister = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const registerUser = useCallback(
    async (registerUserData) => {
        setLoading(true);
        setError(null)
      const toastId = toast.loading("Signing in..");
      try {
        if (!registerUserData) {
          toast.error("Please fill in all fields", { id: toastId });
          return;
        }
        if (
          !registerUserData.fullname.firstname ||
          !registerUserData.fullname.lastname
        ) {
          toast.error("Full name is required", { id: toastId });
          return;
        }

        if (userEmailVerify(registerUserData.email)) {
          toast.error("Enter a valid email address", { id: toastId });
        }
        const response = await userRegister(registerUserData);
        if (response?.data && response.status === 201) {
          toast.success("User Created", { id: toastId });
        } else {
          throw new Error("Cannnot Register new User");
        }
      } catch (err) {
        toast.error(err.massage, { id: toastId });
        setError("Something went wrong. Please try again.");
      } finally {
        setLoading(false);
        
      }
    },
    [navigate]
  );
  return { registerUser, loading, error };
};

export default UseUserRegister;
