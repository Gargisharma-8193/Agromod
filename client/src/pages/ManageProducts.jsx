import { useEffect, useState } from "react";
import axios from "axios";

function ManageProducts() {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  // ================================
  // FETCH PRODUCTS
  // ================================

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/products`
      );

      setProducts(response.data);
    } catch (error) {
      console.error("FETCH PRODUCTS ERROR:", error);
      alert("Unable to fetch products");
    } finally {
      setLoading(false);
    }
  };

  // ================================
  // DELETE PRODUCT
  // ================================

  const deleteProduct = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmDelete) return;

    try {
      await axios.delete(
        `${import.meta.env.VITE_API_URL}/products/${id}`
      );

      setProducts((previousProducts) =>
        previousProducts.filter(
          (product) => product._id !== id
        )
      );

      alert("🗑️ Product deleted successfully");
    } catch (error) {
      console.error("DELETE PRODUCT ERROR:", error);
      alert("Unable to delete product");
    }
  };

  // ================================
  // START EDIT
  // ================================

  const startEdit = (product) => {
    setEditingProduct({
      ...product,
      imageFile: null,
    });
  };

  // ================================
  // HANDLE EDIT INPUT
  // ================================

  const handleChange = (e) => {
    setEditingProduct({
      ...editingProduct,
      [e.target.name]: e.target.value,
    });
  };

  // ================================
  // HANDLE IMAGE
  // ================================

  const handleImageChange = (e) => {
    setEditingProduct({
      ...editingProduct,
      imageFile: e.target.files[0],
    });
  };

  // ================================
  // UPDATE PRODUCT
  // ================================

  const updateProduct = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      formData.append(
        "productName",
        editingProduct.productName
      );

      formData.append(
        "category",
        editingProduct.category
      );

      formData.append(
        "price",
        editingProduct.price
      );

      formData.append(
        "quantity",
        editingProduct.quantity
      );

      formData.append(
        "seller",
        editingProduct.seller
      );

      formData.append(
        "location",
        editingProduct.location
      );

      if (editingProduct.imageFile) {
        formData.append(
          "image",
          editingProduct.imageFile
        );
      }

      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/products/${editingProduct._id}`,
        formData
      );

      setProducts((previousProducts) =>
        previousProducts.map((product) =>
          product._id === editingProduct._id
            ? response.data.product
            : product
        )
      );

      setEditingProduct(null);

      alert("✅ Product updated successfully");
    } catch (error) {
      console.error("UPDATE PRODUCT ERROR:", error);

      alert(
        error.response?.data?.message ||
          "Unable to update product"
      );
    }
  };

  // ================================
  // LOADING
  // ================================

  if (loading) {
    return (
      <div style={styles.center}>
        <h2>📦 Loading products...</h2>
      </div>
    );
  }

  // ================================
  // MAIN UI
  // ================================

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <h1 style={styles.heading}>
          🛠️ Manage Products
        </h1>

        <p style={styles.subtitle}>
          Edit, update or remove your marketplace
          products.
        </p>

        {products.length === 0 ? (
          <div style={styles.empty}>
            <div style={{ fontSize: "60px" }}>
              🌾
            </div>

            <h2>No products found</h2>

            <p>
              Add products to your marketplace
              first.
            </p>
          </div>
        ) : (
          <div style={styles.grid}>
            {products.map((product) => (
              <div
                key={product._id}
                style={styles.card}
              >
                {/* PRODUCT IMAGE */}

                {product.image ? (
                  <img
                    src={`${import.meta.env.VITE_API_URL}/uploads/${product.image}`}
                    alt={product.productName}
                    style={styles.image}
                  />
                ) : (
                  <div style={styles.noImage}>
                    🌾
                  </div>
                )}

                <div style={styles.cardBody}>
                  <h2>
                    {product.productName}
                  </h2>

                  <p>
                    <strong>Category:</strong>{" "}
                    {product.category}
                  </p>

                  <p>
                    <strong>Price:</strong> ₹
                    {product.price}
                  </p>

                  <p>
                    <strong>Quantity:</strong>{" "}
                    {product.quantity}
                  </p>

                  <p>
                    <strong>Seller:</strong>{" "}
                    {product.seller}
                  </p>

                  <p>
                    <strong>Location:</strong>{" "}
                    {product.location}
                  </p>

                  {/* BUTTONS */}

                  <div style={styles.buttons}>
                    <button
                      onClick={() =>
                        startEdit(product)
                      }
                      style={styles.editButton}
                    >
                      ✏️ Edit
                    </button>

                    <button
                      onClick={() =>
                        deleteProduct(
                          product._id
                        )
                      }
                      style={
                        styles.deleteButton
                      }
                    >
                      🗑️ Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* =================================
          EDIT MODAL
      ================================= */}

      {editingProduct && (
        <div style={styles.overlay}>
          <div style={styles.modal}>
            <h2 style={styles.modalHeading}>
              ✏️ Edit Product
            </h2>

            <form onSubmit={updateProduct}>
              <input
                type="text"
                name="productName"
                placeholder="Product Name"
                value={
                  editingProduct.productName
                }
                onChange={handleChange}
                required
                style={styles.input}
              />

              <input
                type="text"
                name="category"
                placeholder="Category"
                value={
                  editingProduct.category
                }
                onChange={handleChange}
                required
                style={styles.input}
              />

              <input
                type="number"
                name="price"
                placeholder="Price"
                value={editingProduct.price}
                onChange={handleChange}
                min="0"
                required
                style={styles.input}
              />

              <input
                type="number"
                name="quantity"
                placeholder="Quantity"
                value={
                  editingProduct.quantity
                }
                onChange={handleChange}
                min="0"
                required
                style={styles.input}
              />

              <input
                type="text"
                name="seller"
                placeholder="Seller"
                value={
                  editingProduct.seller
                }
                onChange={handleChange}
                required
                style={styles.input}
              />

              <input
                type="text"
                name="location"
                placeholder="Location"
                value={
                  editingProduct.location
                }
                onChange={handleChange}
                required
                style={styles.input}
              />

              <label style={styles.label}>
                Change Image
              </label>

              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                style={styles.fileInput}
              />

              <div style={styles.modalButtons}>
                <button
                  type="submit"
                  style={styles.saveButton}
                >
                  💾 Save Changes
                </button>

                <button
                  type="button"
                  onClick={() =>
                    setEditingProduct(null)
                  }
                  style={styles.cancelButton}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

// ========================================
// STYLES
// ========================================

const styles = {
  page: {
    minHeight: "100vh",
    background: "#f4f6f8",
    padding: "40px",
  },

  container: {
    maxWidth: "1100px",
    margin: "auto",
  },

  heading: {
    color: "#2E7D32",
    marginBottom: "5px",
  },

  subtitle: {
    color: "#666",
    marginBottom: "30px",
  },

  grid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "25px",
  },

  card: {
    background: "white",
    borderRadius: "15px",
    overflow: "hidden",
    boxShadow:
      "0 4px 12px rgba(0,0,0,0.1)",
  },

  image: {
    width: "100%",
    height: "200px",
    objectFit: "cover",
  },

  noImage: {
    width: "100%",
    height: "200px",
    background: "#eee",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "60px",
  },

  cardBody: {
    padding: "20px",
  },

  buttons: {
    display: "flex",
    gap: "10px",
    marginTop: "20px",
  },

  editButton: {
    flex: 1,
    padding: "11px",
    background: "#2E7D32",
    color: "white",
    border: "none",
    borderRadius: "7px",
    cursor: "pointer",
  },

  deleteButton: {
    flex: 1,
    padding: "11px",
    background: "#d32f2f",
    color: "white",
    border: "none",
    borderRadius: "7px",
    cursor: "pointer",
  },

  empty: {
    background: "white",
    padding: "50px",
    borderRadius: "15px",
    textAlign: "center",
  },

  center: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  overlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.55)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "20px",
    zIndex: 1000,
  },

  modal: {
    background: "white",
    width: "100%",
    maxWidth: "550px",
    maxHeight: "90vh",
    overflowY: "auto",
    padding: "30px",
    borderRadius: "15px",
    boxSizing: "border-box",
  },

  modalHeading: {
    color: "#2E7D32",
    marginTop: 0,
  },

  input: {
    width: "100%",
    padding: "12px",
    marginTop: "12px",
    border: "1px solid #ccc",
    borderRadius: "7px",
    boxSizing: "border-box",
    fontSize: "15px",
  },

  label: {
    display: "block",
    marginTop: "15px",
    marginBottom: "5px",
    fontWeight: "bold",
  },

  fileInput: {
    width: "100%",
    marginBottom: "20px",
  },

  modalButtons: {
    display: "flex",
    gap: "10px",
  },

  saveButton: {
    flex: 1,
    padding: "12px",
    background: "#2E7D32",
    color: "white",
    border: "none",
    borderRadius: "7px",
    cursor: "pointer",
  },

  cancelButton: {
    flex: 1,
    padding: "12px",
    background: "#777",
    color: "white",
    border: "none",
    borderRadius: "7px",
    cursor: "pointer",
  },
};

export default ManageProducts;