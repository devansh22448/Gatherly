const mongoose=require('mongoose')
 const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        enum:['user','admin'],
        type:String,
        default:'user'
    },
    isVerified:{
        type:Boolean,
        default:false
    }
 })