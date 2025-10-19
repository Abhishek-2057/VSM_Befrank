import { generateToken } from "../middleware/adminAuth.js";
import Admin from "../models/admin.js";


export const loginAdmin = async (req, res) => {
  const { username, password } = req.body;

  try {
    const admin = await Admin.findOne({ username });

    if (admin && (await admin.matchPassword(password))) {
      res.status(200).json({
        _id: admin._id,
        username: admin.username,
        token: generateToken(admin._id),
      });
    } else {
      res.status(401).json({ message: "Invalid username or password" });
    }
  } catch (error) {
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
