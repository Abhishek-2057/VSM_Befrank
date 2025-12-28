import express from "express";
import { getAdmin, getAdminProfile, loginAdmin, updateAdminProfile } from "../controllers/authController.js";
import { verifyToken } from "../middleware/jwtAuth.js";

const router = express.Router();

router.post("/login", loginAdmin);

router.get('/profile', verifyToken, getAdminProfile);

router.put('/profile', verifyToken, updateAdminProfile);

router.get('/getprofile', verifyToken, getAdmin);

export default router;


