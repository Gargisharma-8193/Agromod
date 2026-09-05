const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    console.log("🔍 Connecting to MongoDB...");

    await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 15000,
      connectTimeoutMS: 15000,
    });

    console.log("✅ MongoDB Connected");
  } catch (err) {
    console.log("❌ MongoDB Error:", err.message);
    console.log("❌ Error name:", err.name);
    console.log("❌ Error code:", err.code);

    if (err.reason) {
      console.log("❌ Reason:", err.reason);
    }

    process.exit(1);
  }
};

module.exports = connectDB;