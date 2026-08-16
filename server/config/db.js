const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 10000,
      tls: true,
    });

    console.log("✅ MongoDB Connected");
  } catch (err) {
    console.log("❌ MongoDB Error:", err.message);
    console.log("❌ Error name:", err.name);
    console.log(err);
    process.exit(1);
  }
};

module.exports = connectDB;