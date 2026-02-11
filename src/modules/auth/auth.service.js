import { generateHashPassword ,comparePassword } from "../../utils/password.js";
import { generateToken } from "../../config/jwt.js";
import User from "../user/user.model.js";
import Staff from "../staff/staff.model.js";
import { transporter } from "../../config/email.js";
import { emailTemplate } from "../../utils/email.template.js";


// DOCTOR REGISTRATION
export const registerUser = async (data)=>{
    const existingUser = await User.findOne({email:data.email});
    if(existingUser) throw new Error ("Doctor already exists with this email!");
    
    const hashedPassword = await generateHashPassword(data.password);
    const user = await User.create({
        ...data,
        password:hashedPassword
    })
    return user
}

// STAFF REGISTRATION (NEW)
export const registerStaff = async (data) => {
    const { email, doctorId, ...staffData } = data;
    
    // Check if staff exists
    const existingStaff = await Staff.findOne({ email });
    if(existingStaff) throw new Error("Staff member already exists with this email!");
    
    // Check if doctor exists
    const doctor = await User.findById(doctorId);
    if(!doctor) throw new Error("Doctor not found!");
    
    const hashedPassword = await generateHashPassword(staffData.password);
    
    const staff = await Staff.create({
        ...staffData,
        email,
        doctorId,
        password: hashedPassword
    })
    
    return staff;
}

// COMBINED LOGIN (Doctor + Staff)
export const loginUser = async (email, password) => {
    // Try Doctor login first
    let user = await User.findOne({email});
    
    if(user) {
        const isMatch = await comparePassword(password, user.password);
        if(!isMatch) throw new Error("Invalid credentials!");
        
        const token = await generateToken({
            id: user?._id,
            role: "DOCTOR"
        })
        
        return {
            user: { ...user.toObject(), role: "DOCTOR" },
            token
        }
    }
    
    // Try Staff login
    let staff = await Staff.findOne({email});
    
    if(staff) {
        const isMatch = await comparePassword(password, staff.password);
        if(!isMatch) throw new Error("Invalid credentials!");
        
        const token = await generateToken({
            id: staff?._id,
            role: staff?.role,
            doctorId: staff?.doctorId
        })
        
        return {
            user: { ...staff.toObject(), role: staff?.role },
            token,
            doctorId: staff?.doctorId
        }
    }
    
    throw new Error("Invalid credentials!");
}


export const forgetPasswordService = async (email)=>{
    // Check in both User and Staff collections
    let user = await User.findOne({email});
    let staff = null;
    
    if(!user) {
        staff = await Staff.findOne({email});
    }
    
    const target = user || staff;
    if (!target) throw new Error("User not found");
    
    // create otp
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    target.resetOTP = otp;
    target.resetOTPExpiry = Date.now()+10*60*1000;  // 10 mins
      
    await target.save();

    await transporter.sendMail({
        from: `"Clinic CRM" <${process.env.APP_EMAIL}>`,
        to: target.email,
        subject: "Password Reset OTP",
        html: emailTemplate(otp, target.name)
    });

    return true;
}

export const resetPasswordService = async (email, otp, newPassword) => {
    // Check in both collections
    let user = await User.findOne({
        email,
        resetOTP: String(otp),
        resetOTPExpiry: { $gt: Date.now() }
    });
    
    let staff = null;
    if(!user) {
        staff = await Staff.findOne({
            email,
            resetOTP: String(otp),
            resetOTPExpiry: { $gt: Date.now() }
        });
    }
    
    const target = user || staff;
    if (!target) throw new Error("Invalid or expired OTP");

    target.password = await generateHashPassword(newPassword);
    target.resetOTP = null;
    target.resetOTPExpiry = null;

    await target.save();
};

