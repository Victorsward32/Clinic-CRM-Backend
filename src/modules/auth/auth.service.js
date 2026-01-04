import { generateHashPassword ,comparePassword } from "../../utils/password.js";
import { generateToken } from "../../config/jwt.js";
import User from "../user/user.model.js";


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
