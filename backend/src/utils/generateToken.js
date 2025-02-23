import crypto from "crypto";
import jwt from "jsonwebtoken";

const generateRandomToken = () => crypto.randomInt(100000, 999999);

const generateJWT = (payload) =>
  jwt.sign(
    {
      data: payload,
    },
    process.env.JWT_SECRET_KEY,
    { expiresIn: "15d" }
  );

  const verifyJWT = (token) => {
    console.log("Verifying Token:", token);
    console.log("Using SECRET:", process.env.JWT_SECRET_KEY || "NOT LOADED");
    try {
      console.log("JWT_SECRET_KEY:",token,process.env.JWT_SECRET_KEY); 
      return jwt.verify(token, process.env.JWT_SECRET_KEY);
    } catch (error) {
      console.error("JWT verification failed:", error.message);
      return null;  // Return null on failure instead of crashing
    }
  };
  
export { generateJWT, generateRandomToken, verifyJWT };