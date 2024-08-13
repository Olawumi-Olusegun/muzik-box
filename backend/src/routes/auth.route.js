import express from "express";
import { getUser, refreshToken, signin, signout, signup } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/signin", signup);
router.post("/signup", signin);
router.post("/signout", signout);
router.get("/me", getUser);
router.get("/refresh-token", refreshToken);

export default router;