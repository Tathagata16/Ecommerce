import jwt from "jsonwebtoken";
import User from "../models/user.model.js";



const ADMIN_EMAIL = 'tathagataghosh1609@gmail.com';

export const verifyAdmin = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;
        if (!token) return res.status(401).json({ message: "Not logged in" });

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.userId);

        if (!user) return res.status(401).json({ message: "Invalid user" });

        if (user.email !== ADMIN_EMAIL) {
            return res.status(403).json({ message: "Admin access only" });
        }

        req.user = user;
        next();
    } catch (error) {
        return res.status(401).json({ message: "Unauthorized" });
    }
};
