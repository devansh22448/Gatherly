const nodemailer=require('nodemailer')
const dotenv = require('dotenv')
dotenv.config()
const transporter =nodemailer.createTransport({
    service:'gmail',
    auth:{
        user:process.env.EMAIL_USER, 
        pass:process.env.EMAIL_PASS
    }
})

exports.sendOtpEmail= async (email, otp, type)=>{
    try{
        const mailOptions={
        from: proces.env.EMAIL_USER,
        to:email,
        subject:`YOUR OTP is :${otp}`

    }
    await transporter.sendMail(emailOptions)
    }
    catch(error){
        console.log(`error sending otp email to${email} for ${type}:`, error)
    }


}