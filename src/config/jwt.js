import jwt from "jsonwebtoken";
import dotenv from "dotenv"

dotenv.config();

const SECRET_KEY=process.env.jwt_secret_key;
const EXPIRES_IN= process.env.jwt_token_expires_in;

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