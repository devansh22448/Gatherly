const express=require('express')
const router=express.Router()
const {registerUser,loginUser,verifyOtp}=require('../controller/authController')
//  route
router.post('/register', registerUser)
router.post('/login', loginUser)
router.post('/verify-otp', verifyOtp)