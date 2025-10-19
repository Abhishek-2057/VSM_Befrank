import express from "express";
import { getAdminProfile, loginAdmin } from "../controllers/authController.js";
import { verifyToken } from "../middleware/jwtAuth.js";

const router = express.Router();

router.post("/login", loginAdmin);

router.get('/profile', verifyToken, getAdminProfile);

export default router;


