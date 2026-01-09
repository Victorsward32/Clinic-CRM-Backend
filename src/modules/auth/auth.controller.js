import { registerUser,loginUser, forgetPasswordService } from "./auth.service.js";


export const register =async (req,res,next)=>{
try {
    const user= await registerUser(req.body);
    res.status(201).json({
        success:true,
        message:'User registered successfully',
        data:user
    })
} catch (error) {
    console.log('Invalid user data');
    next(error);
}
}

export const login =async (req,res,next)=>{
try {
    const {email,password}= req.body;
    const result = await loginUser(email,password);
    res.status(200).json({
      success: true,
      message: "Login successful",
      token: result.token,
      user: result.user
    });
} catch (error) {
    console.log('Invalid user data')
    next(error)
    
}
}


export const forgetPassword = async (req,res,next) =>{
    try {
        const password = forgetPasswordService(req.body.email);
        res.status(201).json({
            success:true,
            message:password
        })
    } catch (error) {
        res.status(500).json({
            message:"something went wrong"
        })
        next(error)
    }
}

export const resetPassword = async (req, res, next) => {
  try {
    const { email, otp, newPassword } = req.body;
    await resetPasswordService(email, otp, newPassword);
    res.json({ success: true, message: "Password reset successful" });
  } catch (error) {
    next(error);
  }
};