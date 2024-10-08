import express from "express";
import { getUser, refresh, signin, signout, signup } from "../controllers/auth.controller.js";
import { protectRoute, refreshToken } from "../utils/protectedRoute.js";

const router = express.Router();

router.post("/signin", signin);
router.post("/signup", signup);
router.post("/signout", signout);
router.get("/me", protectRoute, getUser);
router.get("/refresh", refreshToken, refresh);

export default router;