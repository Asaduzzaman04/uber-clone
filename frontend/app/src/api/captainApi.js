import axios from "axios";

const baseUrl = axios.create({
  baseURL: "http://localhost:8000",
});

// Captain login API
export const loginCaptain = async (captainLoginData) => {
  const response = await baseUrl.post("/captain/login", captainLoginData, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response;
};

// Captain register API
export const captainRegister = async (captainRegisterData) => {
  const response = await baseUrl.post("/captain/register", captainRegisterData, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response;
};
