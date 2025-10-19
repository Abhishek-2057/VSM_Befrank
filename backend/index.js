import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

import AdminRoute from "./routes/adminroutes.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());


app.use("/api/admin", AdminRoute);

app.get("/", (req, res) => {
  res.send("Server is running successfully!");
});

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

const PORT = process.env.PORT || 5004;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
