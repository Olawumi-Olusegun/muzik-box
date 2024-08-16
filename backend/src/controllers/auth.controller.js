import constants from "../config/index.js";
import UserModel from "../models/user.model.js";
import { generateToken } from "../utils/token.js";

export const signin = async (req, res) => {

    const { email, password } = req.body;

    try {

        const userExist = await UserModel.findOne({ email });

        if(!userExist) {
            return res.status(404).json({ message: "User not found" })
        }

        const isPasswordValid = userExist.isValidPassword(password);

        if(!isPasswordValid) {
            return res.status(400).json({ message: "Invalid credentials" })
        }

        // generate token
        const accessToken = generateToken(userExist.id, constants.ACCESSTOKEN_SECRET, expiresIn = "30m")
        const refreshToken = generateToken(userExist.id, constants.REFRESHTOKEN_SECRET, expiresIn = "30d")

        // set accessToken cookies
        res.cookie("accessToken", accessToken, {
            maxAge: 30 * 60 * 1000, // Expires in 30min
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
        });

        // set refreshToken cookies
        res.cookie("refreshToken", refreshToken, {
            maxAge: 30 * 24 * 60 * 60 * 1000, // Expires in 30 days
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
        });

        return res.status(201).json({ message: "Signed in successfully" });

    } catch (error) {
        console.log("[SIGN IN]", error)
        return res.status(500).json({ message: "Something went wrong" });
    }
}

export const signup = async (req, res) => {

    const { fullName, email, password } = req.body;

    try {

        const userExist = await UserModel.findOne({ email });

        if(!userExist) {
            return res.status(404).json({ message: "User not found" })
        }

        const isPasswordValid = userExist.isValidPassword(password);

        if(!isPasswordValid) {
            return res.status(400).json({ message: "Invalid credentials" }) 
        }

        const newUser = new UserModel({fullName, email, password })

        const savedUser = await newUser.save();

        if(!savedUser) {
            return res.status(400).json({ message: "Signin aborted" })
        }

        // generate token
        const accessToken = generateToken(userExist.id, constants.ACCESSTOKEN_SECRET, expiresIn = "30m")
        const refreshToken = generateToken(userExist.id, constants.REFRESHTOKEN_SECRET, expiresIn = "30d")

        // set accessToken cookies
        res.cookie("accessToken", accessToken, {
            maxAge: 30 * 60 * 1000, // Expires in 30min
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
        });

        // set cookies
        res.cookie("refreshToken", refreshToken, {
            maxAge: 30 * 24 * 60 * 60 * 1000, // Expires in 30 days
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
        });

        return res.status(201).json({ message: "Signed up successfully" })
        
    } catch (error) {
        console.log("[SIGN UP]", error)
        return res.status(500).json({ message: "Something went wrong" })
    }
}

export const signout = async (req, res) => {
    try {
        res.cookie("accessToken", "", {maxAge: new Date(0)});
        res.cookie("refreshToken", "", {maxAge: new Date(0)});
        return res.status(200).send();
    } catch (error) {
        console.log("[SIGN OUT]", error)
        return res.status(500).json({ message: "Something went wrong" })
    }
}

export const getUser = async (req, res) => {

    const response = {
        data: req.user,
        message: "User Profile",
        success: true,
    }

    return res.status(200).json(response);

}

export const refresh = async (req, res) => {
    const response = {
        data: req.user,
        message: "User Refreshed",
        success: true,
    }
    return res.status(200).json(response);
}