import express from "express";
import mongoose from "mongoose";
import invoiceRoutes from "./routes/invoiceRoutes.js";
import cors from "cors";
import provinceRoutes from "./routes/provinceRoutes.js";


const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/invoices", invoiceRoutes);
app.use("/api/provinces", provinceRoutes);



//for responses
app.use((err, req, res, next) => {
    console.error(err);

  if (err.code === 11000) {
    return res.status(409).json({ message: "Invoice number already exists" });
  }
  if (err.name === "ValidationError") {
    return res.status(400).json({ message: err.message });
  }
  res.status(500).json({ message: "Server error" });
});

const PORT = process.env.PORT || 5000;
const MONGO_URL =
  process.env.MONGO_URL || "mongodb://localhost:27017/invoicedb";

//mongoose
mongoose
  .connect(MONGO_URL)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => console.log(`API on port ${PORT}`));
  })
  .catch((err) => console.error("MongoDB connection failed:", err));