import jwt from "jsonwebtoken";
import UserModel from "../models/user.model.js";
import constants from "../config/index.js";


export const protectRoute = async (req, res, next) => {

    const token = req.cookies["accessToken"]

    try {

        if(!token) {
            return res.status(400).json({ message: "Unauthorized: No token"})
        }

        const decoded = jwt.verify(token, constants.ACCESSTOKEN_SECRET, token);

        if(!decoded || !decoded?.userId) {
            return res.status(400).json({ message: "Unauthorized: Invalid token"})
        }

        const user = await UserModel.findById(decoded.userId).select("-password -accessToken -refreshToken");

        if(!user) {
            return res.status(400).json({ message: "Unauthorized: User not found"}) 
        }

        req.userId = user.id;
        req.user = user;

        next();

    } catch (error) {

        console.log("[PROTECT ROUTE]", error)

        if(typeof error === jwt.TokenExpiredError) {
            return res.status(401).json({ message: "Session expired"})
        }

        if(typeof error === jwt.JsonWebTokenError) {
            return res.status(401).json({ message: "Session error"})
        }

        return res.status(500).json({ message: "Something went wrong"})
    }
}

export const refreshToken = async (req, res, next) => {

    const token = req.cookies["refreshToken"];

    try {

        if(!token) {
            return res.status(400).json({ message: "Unauthorized: No token"})
        }

        const decoded = jwt.verify(token, constants.REFRESHTOKEN_SECRET, token);

        if(!decoded || !decoded?.userId) {
            return res.status(400).json({ message: "Unauthorized: Invalid token"})
        }

        const user = await UserModel.findById(decoded.userId).select("-password -accessToken -refreshToken");

        if(!user) {
            return res.status(400).json({ message: "Unauthorized: User not found"}) 
        }

        req.userId = user.id;
        req.user = user;

        next();

    } catch (error) {

        console.log("[REFRESH TOKEN]", error)

        if(typeof error === jwt.TokenExpiredError) {
            return res.status(401).json({ message: "Session expired"})
        }

        if(typeof error === jwt.JsonWebTokenError) {
            return res.status(401).json({ message: "Session error"})
        }

        return res.status(500).json({ message: "Something went wrong"})
    }
}