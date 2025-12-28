import { generateToken } from "../middleware/jwtAuth.js";
import Admin from "../models/admin.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();


export const loginAdmin = async (req, res) => {
  const { username, password } = req.body;

  try {
    const existingAdmins = await Admin.find();

    if (existingAdmins.length === 0) {
      const newAdmin = await Admin.create({ username, password });

      return res.status(201).json({
        message: "First admin created successfully",
        _id: newAdmin._id,
        username: newAdmin.username,
        token: generateToken(newAdmin._id),
      });
    }

   
    const admin = await Admin.findOne({ username });

    if (admin && (await admin.matchPassword(password))) {
      return res.status(200).json({
        _id: admin._id,
        username: admin.username,
        token: generateToken(admin._id),
      });
    } else {
      return res.status(401).json({ message: "Invalid username or password" });
    }
  } catch (error) {
    console.error("Error in loginAdmin:", error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};


export const getAdminProfile = (req, res) => {
  
  if (req.admin) {
    res.status(200).json({
      _id: req.admin._id,
      username: req.admin.username,
    });
  } else {
    res.status(404).json({ message: "Admin not found" });
  }
};

export const getAdmin = async (req, res) => {
  try {
    // Assuming your auth middleware adds the admin object or ID to req.user or req.admin
    const admin = await Admin.findById(req.admin._id).select("-password");

    if (admin) {
      res.json({
        _id: admin._id,
        username: admin.username,
      });
    } else {
      res.status(404).json({ message: "Admin not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};


export const updateAdminProfile = async (req, res) => {
  try {
    const admin = await Admin.findById(req.admin._id);

    if (admin) {
      // 1. Update Username
      admin.username = req.body.username || admin.username;

      // 2. Update Password (only if provided)
      if (req.body.password) {
        // The pre('save') hook in your model will automatically hash this
        admin.password = req.body.password;
      }

      const updatedAdmin = await admin.save();

      res.json({
        _id: updatedAdmin._id,
        username: updatedAdmin.username,
        message: "Profile updated successfully",
      });
    } else {
      res.status(404).json({ message: "Admin not found" });
    }
  } catch (error) {
    // Handle duplicate username error
    if (error.code === 11000) {
      res.status(400).json({ message: "Username already exists" });
    } else {
      res.status(500).json({ message: "Server Error", error: error.message });
    }
  }
};
