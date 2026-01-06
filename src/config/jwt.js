import jwt from "jsonwebtoken";
import dotenv from "dotenv"

dotenv.config();

const SECRET_KEY="Victorsward@6067";
const EXPIRES_IN= "8h";

export const generateToken = (payload)=>{
    const token = jwt.sign(payload,SECRET_KEY,{expiresIn: EXPIRES_IN})
    return token;
  
}

export const verifyToken = (token)=>{
    try {
        const result=jwt.verify(token,SECRET_KEY)
        return result
    } catch (error) {
          console.log(`JWT Verification Error::${error.message}`)
          return null
    }
}