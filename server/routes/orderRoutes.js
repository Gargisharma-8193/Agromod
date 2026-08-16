const express = require("express");
const router = express.Router();

const Order = require("../models/Order");

// ======================================================
// CREATE ORDER AFTER PAYMENT
// ======================================================

router.post("/", async (req, res) => {
  try {
    const {
      items,
      totalAmount,
      customerName,
      customerEmail,
      address,
      phone,
      razorpayOrderId,
      razorpayPaymentId,
      razorpaySignature,
    } = req.body;

    // Check cart
    if (!items || items.length === 0) {
      return res.status(400).json({
        message: "Cart is empty",
      });
    }

    // Check payment information
    if (
      !razorpayOrderId ||
      !razorpayPaymentId ||
      !razorpaySignature
    ) {
      return res.status(400).json({
        message: "Payment information missing",
      });
    }

    const order = new Order({
      items,
      totalAmount,
      customerName,
      customerEmail,
      address,
      phone,
      razorpayOrderId,
      razorpayPaymentId,
      razorpaySignature,
      status: "Paid",
    });

    await order.save();

    res.status(201).json({
      message: "Order placed successfully",
      order,
    });
  } catch (error) {
    console.error("ORDER ERROR:", error);

    res.status(500).json({
      message: "Error placing order",
      error: error.message,
    });
  }
});

// ======================================================
// GET ALL ORDERS
// ======================================================

router.get("/", async (req, res) => {
  try {
    const orders = await Order.find().sort({
      createdAt: -1,
    });

    res.status(200).json(orders);
  } catch (error) {
    console.error("GET ORDERS ERROR:", error);

    res.status(500).json({
      message: "Error fetching orders",
      error: error.message,
    });
  }
});

// ======================================================
// UPDATE ORDER STATUS
// ======================================================

router.put("/:id/status", async (req, res) => {
  try {
    const { status } = req.body;

    const allowedStatuses = [
      "Paid",
      "Processing",
      "Shipped",
      "Delivered",
      "Cancelled",
    ];

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        message: "Invalid order status",
      });
    }

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );

    if (!order) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    res.status(200).json({
      message: "Order status updated successfully",
      order,
    });
  } catch (error) {
    console.error("UPDATE ORDER ERROR:", error);

    res.status(500).json({
      message: "Error updating order",
      error: error.message,
    });
  }
});

module.exports = router;