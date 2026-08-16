const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
  {
    // ======================================================
    // ORDER ITEMS
    // ======================================================

    items: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },

        productName: {
          type: String,
          required: true,
        },

        price: {
          type: Number,
          required: true,
        },

        quantity: {
          type: Number,
          required: true,
        },

        image: {
          type: String,
          default: "",
        },
      },
    ],

    // ======================================================
    // ORDER TOTAL
    // ======================================================

    totalAmount: {
      type: Number,
      required: true,
    },

    // ======================================================
    // CUSTOMER DETAILS
    // ======================================================

    customerName: {
      type: String,
      required: true,
    },

    customerEmail: {
      type: String,
      required: true,
    },

    address: {
      type: String,
      required: true,
    },

    phone: {
      type: String,
      required: true,
    },

    // ======================================================
    // RAZORPAY DETAILS
    // ======================================================

    razorpayOrderId: {
      type: String,
      required: true,
    },

    razorpayPaymentId: {
      type: String,
      required: true,
    },

    razorpaySignature: {
      type: String,
      required: true,
    },

    // ======================================================
    // ORDER STATUS
    // ======================================================

    status: {
      type: String,
      enum: [
        "Paid",
        "Processing",
        "Shipped",
        "Delivered",
        "Cancelled",
      ],
      default: "Pending",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Order", OrderSchema);