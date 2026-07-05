const User = require('../models/users')
// register user 

exports.registerUser= async (req, res)=>{
    const {name , email, password}=req.body;
    let userExists= await uSer.findOne({email})
    if(userExists) {
        return res.status(400).json({
            error:'user already exits'
        })
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(passowrd, salt);

    try{
        const user =new User ({name , email, password:hashedPassword})
        const otp =Math.floor(100000+Math.random() * 900000).toString() ;
        console.log(`OTP for ${email}:${otp}`)
        user.otp = otp;
        await user.save();
        res.status(201).json({message:"user registered successfully"})
    }
    catch(error){
        res.status(400).json({error: error.message})
    }
};