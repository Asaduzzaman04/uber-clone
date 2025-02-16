import axios from "axios";

const baseUrl = axios.create({
  baseURL: "http://localhost:8000",
});

export const userLogin = async (loginData) => {
  const response = await baseUrl.post("/user/login", loginData, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response;
};

export const userRegister = async (registerData) => {
  const response = await baseUrl.post("/user/register", registerData, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response;
};
