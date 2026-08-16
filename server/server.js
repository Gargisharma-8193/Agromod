
const express = require("express");
const cors = require("cors");
require("dotenv").config();


const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");
const orderRoutes = require("./routes/orderRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());

connectDB();

app.use("/products", productRoutes);
app.use("/api/auth", authRoutes);
app.use("/orders", orderRoutes);
app.use("/uploads", express.static("uploads"));
app.use("/payments", paymentRoutes);

app.get("/", (req, res) => {
  res.send("AgroMod Backend Running");
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});