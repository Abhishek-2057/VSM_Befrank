import express from "express";
import { loginAdmin } from "../controllers/adminController.js";
import { verifyToken } from "../middleware/adminAuth.js";

const router = express.Router();

router.post("/login", loginAdmin);

router.get("/profile", verifyToken, (req, res) => {
  if (req.admin) {
    res.status(200).json(req.admin);
  } else {
    res.status(404).json({ message: "Admin not found" });
  }
});

export default router;
