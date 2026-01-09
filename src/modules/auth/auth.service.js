import { generateHashPassword ,comparePassword } from "../../utils/password.js";
import { generateToken } from "../../config/jwt.js";
import User from "../user/user.model.js";
import { transporter } from "../../config/email.js";


export const registerUser = async (data)=>{
    const existingUser = await User.findOne({email:data.email});
    if(existingUser) throw new Error ("User Alredy Existed!");
    const hashedPassword = await generateHashPassword(data.password);
    const user = await User.create({
        ...data,
        password:hashedPassword
    })
    return user
}

export const loginUser = async (email,password)=>{
    const user = await User.findOne({email});
    if(!user) throw new Error("Invalid credentials!");
    const isMatch = await comparePassword(password,user.password)
    if(!isMatch) throw new Error ("Invalid credentials!");
    const token= await generateToken({
        id:user?._id,
        role:user?.role
    })

    return {user,token}

}


export const forgetPasswordService = async (email)=>{
    const user=User.findOne({email});
     if (!user) throw new Error("User not found");
     // create otp
     const otp = Math.floor(100000 + Math.random()*900000).toString()
     console.log("Asshole remove this console",otp);

     user.resetOTP = otp;
     user.resetOTPExpiry = Date.now()+10*60*1000;  // 10 mins
      
    await user.save();

    await transporter.sendMail({
    from: `"Clinic CRM" <${process.env.APP_EMAIL}>`,
    to: user.email,
    subject: "Password Reset OTP",
    html: forgotPasswordTemplate(otp, user.name)
  });

    return true;
}

export const resetPasswordService = async (email, otp, newPassword) => {
  const user = await User.findOne({
    email,
    resetOTP: otp,
    resetOTPExpiry: { $gt: Date.now() }
  });

  if (!user) throw new Error("Invalid or expired OTP");

  user.password = await bcrypt.hash(newPassword, 10);
  user.resetOTP = null;
  user.resetOTPExpiry = null;

  await user.save();
};