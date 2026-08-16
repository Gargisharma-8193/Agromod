const express = require("express");
const router = express.Router();

const Product = require("../models/Product");
const upload = require("../middleware/uploads/uploads");

// =====================================================
// ADD PRODUCT
// =====================================================

router.post("/", upload.single("image"), async (req, res) => {
  try {
    console.log("Product request received");
    console.log("Body:", req.body);
    console.log("File:", req.file);

    const product = new Product({
      productName: req.body.productName,
      category: req.body.category,
      price: Number(req.body.price),
      quantity: Number(req.body.quantity),
      seller: req.body.seller,
      location: req.body.location,
      image: req.file ? req.file.filename : "",
    });

    await product.save();

    console.log("Product saved:", product);

    res.status(201).json({
      message: "Product added successfully",
      product,
    });
  } catch (error) {
    console.error("PRODUCT ERROR:", error);

    res.status(500).json({
      message: "Error adding product",
      error: error.message,
    });
  }
});

// =====================================================
// GET ALL PRODUCTS
// =====================================================

router.get("/", async (req, res) => {
  try {
    const products = await Product.find();

    res.status(200).json(products);
  } catch (error) {
    console.error("GET PRODUCTS ERROR:", error);

    res.status(500).json({
      message: "Error fetching products",
      error: error.message,
    });
  }
});

// =====================================================
// UPDATE PRODUCT
// =====================================================

router.put("/:id", upload.single("image"), async (req, res) => {
  try {
    console.log("Updating product:", req.params.id);
    console.log("Body:", req.body);
    console.log("File:", req.file);

    const updateData = {
      productName: req.body.productName,
      category: req.body.category,
      price: Number(req.body.price),
      quantity: Number(req.body.quantity),
      seller: req.body.seller,
      location: req.body.location,
    };

    // Update image only if a new image was uploaded
    if (req.file) {
      updateData.image = req.file.filename;
    }

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      updateData,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    console.log("Product updated:", product);

    res.status(200).json({
      message: "Product updated successfully",
      product,
    });
  } catch (error) {
    console.error("UPDATE PRODUCT ERROR:", error);

    res.status(500).json({
      message: "Error updating product",
      error: error.message,
    });
  }
});

// =====================================================
// DELETE PRODUCT
// =====================================================

router.delete("/:id", async (req, res) => {
  try {
    console.log("Deleting product:", req.params.id);

    const product = await Product.findByIdAndDelete(
      req.params.id
    );

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    console.log("Product deleted:", product);

    res.status(200).json({
      message: "Product deleted successfully",
    });
  } catch (error) {
    console.error("DELETE PRODUCT ERROR:", error);

    res.status(500).json({
      message: "Error deleting product",
      error: error.message,
    });
  }
});

module.exports = router;