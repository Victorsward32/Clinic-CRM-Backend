import bcrypt from "bcrypt";

export const generateHashPassword= async (password) =>{
    return await bcrypt.hash(password,10);
}

export const comparePassword= async (password,hasedPassword)=>{
    return await bcrypt.compare(password,hasedPassword);
}