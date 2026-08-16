require("dotenv").config();

const Razorpay = require("razorpay");

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID.trim(),
  key_secret: process.env.RAZORPAY_KEY_SECRET.trim(),
});

async function test() {
  try {
    const order = await razorpay.orders.create({
      amount: 10000,
      currency: "INR",
      receipt: `test_${Date.now()}`,
    });

    console.log("✅ RAZORPAY WORKING!");
    console.log("Order ID:", order.id);
  } catch (error) {
    console.log("❌ RAZORPAY FAILED");
    console.log(error);
  }
}

test();