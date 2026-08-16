import { useState } from "react";

function AddProduct() {
  const [product, setProduct] = useState({
    productName: "",
    category: "",
    price: "",
    quantity: "",
    seller: "",
    location: "",
    image: null,
  });

  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("productName", product.productName);
    formData.append("category", product.category);
    formData.append("price", product.price);
    formData.append("quantity", product.quantity);
    formData.append("seller", product.seller);
    formData.append("location", product.location);

    if (product.image) {
      formData.append("image", product.image);
    }

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/products`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Failed to add product");
      }

      const data = await response.json();

      console.log(data);

      alert("✅ Product Added Successfully");

      setProduct({
        productName: "",
        category: "",
        price: "",
        quantity: "",
        seller: "",
        location: "",
        image: null,
      });
    } catch (error) {
      console.error("ADD PRODUCT ERROR:", error);
      alert("❌ Error adding product");
    }
  };

  return (
    <div
      style={{
        padding: "40px",
        maxWidth: "600px",
        margin: "auto",
      }}
    >
      <h1>🛒 Add Product</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="productName"
          placeholder="Product Name"
          value={product.productName}
          onChange={handleChange}
          required
        />
        <br />
        <br />

        <input
          type="text"
          name="category"
          placeholder="Category"
          value={product.category}
          onChange={handleChange}
          required
        />
        <br />
        <br />

        <input
          type="number"
          name="price"
          placeholder="Price"
          value={product.price}
          onChange={handleChange}
          required
        />
        <br />
        <br />

        <input
          type="number"
          name="quantity"
          placeholder="Quantity"
          value={product.quantity}
          onChange={handleChange}
          required
        />
        <br />
        <br />

        <input
          type="text"
          name="seller"
          placeholder="Seller Name"
          value={product.seller}
          onChange={handleChange}
          required
        />
        <br />
        <br />

        <input
          type="text"
          name="location"
          placeholder="Location"
          value={product.location}
          onChange={handleChange}
          required
        />
        <br />
        <br />

        {/* Image Upload
        <input
          type="file"
          accept="image/*"
          onChange={(e) =>
            setProduct({
              ...product,
              image: e.target.files[0],
            })
          }
          required
        />
        <br /><br /> */}

        <button
          type="submit"
          style={{
            background: "#2E7D32",
            color: "white",
            padding: "10px 20px",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          Add Product
        </button>
      </form>
    </div>
  );
}

export default AddProduct;