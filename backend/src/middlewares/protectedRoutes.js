import User from '../models/userModels.js';
import {} from 'dotenv/config';
import { verifyJWT } from "../utils/generateToken.js";
const protectedRoutes = async (req, res, next) => {
    try {
        // dotenv.config();
        const { token = " "} = req.headers;
        if (!token) {
            return res.status(404).json({ message: "Token not found" });
        }
        console.log(token);
        const decoded = verifyJWT(token);
        console.log("this is the decoded",decoded)
        if (!decoded) {
            return res.status(401).json({ message: "Unauthorized: Invalid token" });
        }
        const user = await User.findById(decoded.userId).select("-password");
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        req.user = user;
        next();
    } catch (error) {
        return res.status(500).json({ message: "Internal server error", error: error.message,code:error.code });
    }
}

export { protectedRoutes };
