import mongoose from "mongoose";
import chatSchema from "./ChatModel.js";

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required:true
    },
    email:{
        type: String,
        required:true,
        unique:true
    },
    password:{
        type: String,
        required:true
    }, 
    chats:[chatSchema]
})

// Export model
const User = mongoose.model('User', userSchema);

export default User; 