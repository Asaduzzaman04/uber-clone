import { useCallback, useState } from "react";
import toast from "react-hot-toast";
import { EmailVerify } from "../utils/UserUtils";
import { captainRegister } from "../api/captainApi";


const UseCaptainRegister = () => {
    const [loading, setloading] = useState(false)
const registerCaptain = useCallback(async (captainRegisterData) =>{
    setloading(true)
    const toastId = toast.loading("signing up..")
    try {
        if(!captainRegisterData) {
            toast.error("Please fill in all fields", { id: toastId });
            return;
        }
        if(!captainRegisterData.fullname.firstname ){
            toast.error("Firstname is required", {id: toastId})
            return;
        }
        if(captainRegisterData.password.trim().length < 6){
           toast.error("Password must be 6 character  long", {id : toastId}) 
           return;
        }
        if(EmailVerify(captainRegisterData.email)){
            toast.error("Enter a valid Email address")
            return
        }
       const response = await captainRegister(captainRegisterData)

       if(response?.data && response.status === 200){
        toast.success("your Account created Successfully", {id : toastId})
       }


    } catch (error) {
        toast.error("There was an error", {id : toastId})
        console.log(error.massage)
    }
},[])
return{loading, registerCaptain}
};

export default UseCaptainRegister;