import Admin from "../models/admin.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

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




// export const loginAdmin = async (req, res) => {
//   const { username, password } = req.body;

//   try {
//     const admin = await Admin.findOne({ username });

//     if (admin && (await admin.matchPassword(password))) {
//       res.status(200).json({
//         _id: admin._id,
//         username: admin.username,
//         token: generateToken(admin._id),
//       });
//     } else {
//       res.status(401).json({ message: "Invalid username or password" });
//     }
//   } catch (error) {
//     res.status(500).json({ message: "Server error. Please try again later." });
//   }
// };
