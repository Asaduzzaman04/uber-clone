import axios from "axios";

const baseUrl = axios.create({
  baseURL: "http://localhost:8000",
});

export const userLogin = async (loginData) => {
  return await baseUrl.post("/user/login", loginData, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};


export const userRegister = async (registerData) =>{
  return await baseUrl.post("/user/register", registerData,{
    headers : {
      "Content-Type" : "application/json"
    }
  })
}