import mongoose from "mongoose";

const blackListTokenSchema = mongoose.Schema({
    token :{
        type : String,
        required : true,
        unique : true
   },
    createdAt :{
        type : Date,
        default : Date.now,
        expires : 86400 // this is the expiry time in seconds (Valid for 24 hours)

    }
})


// Create a model for temporary token storage
const blackListTokenModel = new mongoose.model('BlackListToken', blackListTokenSchema);
export default blackListTokenModel