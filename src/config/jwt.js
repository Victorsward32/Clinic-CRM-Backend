import jwt from "jsonwebtoken";
import env from "./env.js";

export const generateToken = (payload)=>{
    const token = jwt.sign(payload,env.jwtSecret,{expiresIn: env.jwtExpiresIn})
    return token;
  
}

export const verifyToken = (token)=>{
    try {
        const result=jwt.verify(token,env.jwtSecret)
        return result
    } catch (error) {
          console.log(`JWT Verification Error::${error.message}`)
          return null
    }
}
