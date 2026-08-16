import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function Dashboard() {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const [editingProduct, setEditingProduct] = useState(null);

  const [editForm, setEditForm] = useState({
    productName: "",
    category: "",
    price: "",
    quantity: "",
    seller: "",
    location: "",
    image: null,
  });

  // ========================================
  // FETCH DASHBOARD DATA
  // ========================================
  const fetchDashboardData = async () => {
    try {
      const [productsResponse, ordersResponse] =
        await Promise.all([
          axios.get(`${import.meta.env.VITE_API_URL}/products`),
         axios.get(`${import.meta.env.VITE_API_URL}/orders`),
        ]);

      setProducts(productsResponse.data);
      setOrders(ordersResponse.data);
    } catch (error) {
      console.error("Dashboard data error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  // ========================================
  // TOTAL SALES
  // ========================================
  const totalSales = orders.reduce((total, order) => {
    return total + Number(order.totalAmount || 0);
  }, 0);

  // ========================================
  // CUSTOMERS
  // ========================================
  const customers = new Set(
    orders.map((order) => order.customerEmail)
  ).size;

  // ========================================
  // START EDIT PRODUCT
  // ========================================
  const handleEdit = (product) => {
    setEditingProduct(product);

    setEditForm({
      productName: product.productName,
      category: product.category,
      price: product.price,
      quantity: product.quantity,
      seller: product.seller,
      location: product.location,
      image: null,
    });
  };

  // ========================================
  // EDIT FORM CHANGE
  // ========================================
  const handleEditChange = (e) => {
    const { name, value, files } = e.target;

    setEditForm({
      ...editForm,
      [name]: files ? files[0] : value,
    });
  };

  // ========================================
  // UPDATE PRODUCT
  // ========================================
  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!editingProduct) return;

    const formData = new FormData();

    formData.append("productName", editForm.productName);
    formData.append("category", editForm.category);
    formData.append("price", editForm.price);
    formData.append("quantity", editForm.quantity);
    formData.append("seller", editForm.seller);
    formData.append("location", editForm.location);

    if (editForm.image) {
      formData.append("image", editForm.image);
    }

    try {
      await axios.put(
  `${import.meta.env.VITE_API_URL}/products/${editingProduct._id}`,
  formData
);

      alert("✅ Product updated successfully!");

      setEditingProduct(null);

      await fetchDashboardData();
    } catch (error) {
      console.error("UPDATE ERROR:", error);

      alert("❌ Error updating product");
    }
  };

  // ========================================
  // DELETE PRODUCT
  // ========================================
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmDelete) return;

    try {
      await axios.delete(
  `${import.meta.env.VITE_API_URL}/products/${id}`
);

      alert("✅ Product deleted successfully!");

      await fetchDashboardData();
    } catch (error) {
      console.error("DELETE ERROR:", error);

      alert("❌ Error deleting product");
    }
  };

  // ========================================
  // UPDATE ORDER STATUS
  // ========================================
  const handleStatusChange = async (
    orderId,
    newStatus
  ) => {
    try {
     await axios.put(
  `${import.meta.env.VITE_API_URL}/orders/${orderId}`,
  {
    status: newStatus,
  }
);
      alert("✅ Order status updated!");

      await fetchDashboardData();
    } catch (error) {
      console.error(
        "STATUS UPDATE ERROR:",
        error
      );

      alert("❌ Error updating order status");
    }
  };

  // ========================================
  // STYLES
  // ========================================
  const cardStyle = {
    background: "#fff",
    padding: "25px",
    borderRadius: "15px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    flex: "1",
    minWidth: "200px",
    textAlign: "center",
  };

  const buttonStyle = {
    background: "#2E7D32",
    color: "white",
    border: "none",
    padding: "10px 20px",
    borderRadius: "8px",
    cursor: "pointer",
    marginTop: "10px",
  };

  const inputStyle = {
    width: "100%",
    padding: "12px",
    marginBottom: "12px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    boxSizing: "border-box",
  };

  // ========================================
  // LOADING
  // ========================================
  if (loading) {
    return (
      <div
        style={{
          padding: "50px",
          textAlign: "center",
        }}
      >
        <h2>🌾 Loading Dashboard...</h2>
      </div>
    );
  }

  return (
    <div
      style={{
        padding: "40px",
        background: "#f5f7f5",
        minHeight: "100vh",
      }}
    >
      {/* ========================================
          HEADER
      ======================================== */}

      <div style={{ marginBottom: "30px" }}>
        <h1
          style={{
            color: "#2E7D32",
            fontSize: "36px",
            marginBottom: "5px",
          }}
        >
          🌾 Farmer Dashboard
        </h1>

        <p
          style={{
            fontSize: "18px",
            color: "#555",
          }}
        >
          Welcome to AgroMod! Manage your farm
          from one place.
        </p>
      </div>

      {/* ========================================
          STATISTICS
      ======================================== */}

      <div
        style={{
          display: "flex",
          gap: "20px",
          flexWrap: "wrap",
          marginBottom: "35px",
        }}
      >
        {/* PRODUCTS */}

        <div style={cardStyle}>
          <div style={{ fontSize: "40px" }}>
            📦
          </div>

          <h2>{products.length}</h2>

          <p>Total Products</p>

          <Link to="/add-product">
            <button style={buttonStyle}>
              Add Product
            </button>
          </Link>
        </div>

        {/* ORDERS */}

        <div style={cardStyle}>
          <div style={{ fontSize: "40px" }}>
            🛒
          </div>

          <h2>{orders.length}</h2>

          <p>Total Orders</p>

          <Link to="/orders">
            <button style={buttonStyle}>
              View Orders
            </button>
          </Link>
        </div>

        {/* SALES */}

        <div style={cardStyle}>
          <div style={{ fontSize: "40px" }}>
            💰
          </div>

          <h2>₹{totalSales}</h2>

          <p>Total Order Value</p>
        </div>

        {/* CUSTOMERS */}

        <div style={cardStyle}>
          <div style={{ fontSize: "40px" }}>
            👥
          </div>

          <h2>{customers}</h2>

          <p>Customers</p>
        </div>
      </div>
      <div style={cardStyle}>
  <h2>📦</h2>
  <h3>Manage Orders</h3>
  <p>View and manage customer orders.</p>

  <Link to="/farmer-orders">
    <button
      style={{
        padding: "10px 20px",
        background: "#2E7D32",
        color: "white",
        border: "none",
        borderRadius: "6px",
        cursor: "pointer",
      }}
    >
      Open
    </button>
  </Link>
</div>
<div style={cardStyle}>
  <h2>🛠️</h2>

  <h3>Manage Products</h3>

  <p>Edit or remove your products.</p>

  <Link to="/manage-products">
    <button
      style={{
        padding: "10px 20px",
        background: "#2E7D32",
        color: "white",
        border: "none",
        borderRadius: "6px",
        cursor: "pointer",
      }}
    >
      Open
    </button>
  </Link>
</div>

      {/* ========================================
          QUICK ACTIONS
      ======================================== */}

      <div
        style={{
          background: "white",
          padding: "25px",
          borderRadius: "15px",
          boxShadow:
            "0 4px 12px rgba(0,0,0,0.1)",
          marginBottom: "30px",
        }}
      >
        <h2 style={{ color: "#2E7D32" }}>
          ⚡ Quick Actions
        </h2>

        <div
          style={{
            display: "flex",
            gap: "15px",
            flexWrap: "wrap",
            marginTop: "20px",
          }}
        >
          <Link to="/crop-price">
            <button style={buttonStyle}>
              🌾 Crop Price Prediction
            </button>
          </Link>

          <Link to="/crop-yield">
            <button style={buttonStyle}>
              🌱 Crop Yield Prediction
            </button>
          </Link>

          <Link to="/disease-detection">
            <button style={buttonStyle}>
              🦠 Disease Detection
            </button>
          </Link>

          <Link to="/marketplace">
            <button style={buttonStyle}>
              🛒 Marketplace
            </button>
          </Link>

          <Link to="/add-product">
            <button style={buttonStyle}>
              ➕ Add Product
            </button>
          </Link>

          <Link to="/orders">
            <button style={buttonStyle}>
              📋 My Orders
            </button>
          </Link>
        </div>
      </div>

      {/* ========================================
          MANAGE PRODUCTS
      ======================================== */}

      <div
        style={{
          background: "white",
          padding: "25px",
          borderRadius: "15px",
          boxShadow:
            "0 4px 12px rgba(0,0,0,0.1)",
          marginBottom: "30px",
        }}
      >
        <h2 style={{ color: "#2E7D32" }}>
          📦 Manage Products
        </h2>

        {products.length === 0 ? (
          <p>No products available.</p>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit, minmax(250px, 1fr))",
              gap: "20px",
              marginTop: "20px",
            }}
          >
            {products.map((product) => (
              <div
                key={product._id}
                style={{
                  border: "1px solid #ddd",
                  borderRadius: "12px",
                  padding: "20px",
                  background: "#fafafa",
                }}
              >
                {/* PRODUCT IMAGE */}

                {product.image ? (
                  <img
                    src={`${import.meta.env.VITE_API_URL}/uploads/${product.image}`}
                    alt={product.productName}
                    style={{
                      width: "100%",
                      height: "160px",
                      objectFit: "cover",
                      borderRadius: "10px",
                    }}
                  />
                ) : (
                  <div
                    style={{
                      height: "160px",
                      background: "#eee",
                      borderRadius: "10px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "50px",
                    }}
                  >
                    🌾
                  </div>
                )}

                <h3>{product.productName}</h3>

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

                {/* EDIT */}

                <button
                  onClick={() =>
                    handleEdit(product)
                  }
                  style={{
                    ...buttonStyle,
                    background: "#1976D2",
                    marginRight: "10px",
                  }}
                >
                  ✏️ Edit
                </button>

                {/* DELETE */}

                <button
                  onClick={() =>
                    handleDelete(product._id)
                  }
                  style={{
                    ...buttonStyle,
                    background: "#D32F2F",
                  }}
                >
                  🗑️ Delete
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ========================================
          EDIT PRODUCT
      ======================================== */}

      {editingProduct && (
        <div
          style={{
            background: "white",
            padding: "30px",
            borderRadius: "15px",
            boxShadow:
              "0 4px 12px rgba(0,0,0,0.1)",
            marginBottom: "30px",
          }}
        >
          <h2 style={{ color: "#2E7D32" }}>
            ✏️ Edit Product
          </h2>

          <form onSubmit={handleUpdate}>
            <input
              style={inputStyle}
              type="text"
              name="productName"
              placeholder="Product Name"
              value={editForm.productName}
              onChange={handleEditChange}
              required
            />

            <input
              style={inputStyle}
              type="text"
              name="category"
              placeholder="Category"
              value={editForm.category}
              onChange={handleEditChange}
              required
            />

            <input
              style={inputStyle}
              type="number"
              name="price"
              placeholder="Price"
              value={editForm.price}
              onChange={handleEditChange}
              required
            />

            <input
              style={inputStyle}
              type="number"
              name="quantity"
              placeholder="Quantity"
              value={editForm.quantity}
              onChange={handleEditChange}
              required
            />

            <input
              style={inputStyle}
              type="text"
              name="seller"
              placeholder="Seller Name"
              value={editForm.seller}
              onChange={handleEditChange}
              required
            />

            <input
              style={inputStyle}
              type="text"
              name="location"
              placeholder="Location"
              value={editForm.location}
              onChange={handleEditChange}
              required
            />

            <label
              style={{
                display: "block",
                marginBottom: "8px",
                fontWeight: "bold",
              }}
            >
              Change Image (optional)
            </label>

            <input
              style={inputStyle}
              type="file"
              name="image"
              accept="image/*"
              onChange={handleEditChange}
            />

            <button
              type="submit"
              style={{
                ...buttonStyle,
                marginRight: "10px",
              }}
            >
              💾 Save Changes
            </button>

            <button
              type="button"
              onClick={() =>
                setEditingProduct(null)
              }
              style={{
                ...buttonStyle,
                background: "#757575",
              }}
            >
              Cancel
            </button>
          </form>
        </div>
      )}

      {/* ========================================
          MANAGE ORDERS
      ======================================== */}

      <div
        style={{
          background: "white",
          padding: "25px",
          borderRadius: "15px",
          boxShadow:
            "0 4px 12px rgba(0,0,0,0.1)",
          marginBottom: "30px",
        }}
      >
        <h2 style={{ color: "#2E7D32" }}>
          📋 Manage Orders
        </h2>

        {orders.length === 0 ? (
          <p>No orders available yet.</p>
        ) : (
          <div
            style={{
              display: "grid",
              gap: "20px",
              marginTop: "20px",
            }}
          >
            {orders.map((order) => (
              <div
                key={order._id}
                style={{
                  border: "1px solid #ddd",
                  borderRadius: "12px",
                  padding: "20px",
                  background: "#fafafa",
                }}
              >
                {/* ORDER HEADER */}

                <div
                  style={{
                    display: "flex",
                    justifyContent:
                      "space-between",
                    alignItems: "center",
                    flexWrap: "wrap",
                    gap: "10px",
                  }}
                >
                  <div>
                    <h3
                      style={{
                        margin: "0 0 5px",
                      }}
                    >
                      📦 Order #
                      {order._id.slice(-6)}
                    </h3>

                    <p style={{ margin: 0 }}>
                      📅{" "}
                      {new Date(
                        order.createdAt
                      ).toLocaleDateString()}
                    </p>
                  </div>

                  {/* CURRENT STATUS */}

                  <span
                    style={{
                      padding: "8px 15px",
                      borderRadius: "20px",
                      fontWeight: "bold",

                      background:
                        order.status === "Paid"
                          ? "#c8e6c9"
                          : order.status ===
                            "Processing"
                          ? "#fff3cd"
                          : order.status ===
                            "Shipped"
                          ? "#cfe2ff"
                          : order.status ===
                            "Delivered"
                          ? "#b7e4c7"
                          : "#ffcdd2",

                      color:
                        order.status === "Paid"
                          ? "#2e7d32"
                          : order.status ===
                            "Processing"
                          ? "#856404"
                          : order.status ===
                            "Shipped"
                          ? "#084298"
                          : order.status ===
                            "Delivered"
                          ? "#155724"
                          : "#842029",
                    }}
                  >
                    {order.status}
                  </span>
                </div>

                <hr />

                {/* CUSTOMER DETAILS */}

                <h4>👤 Customer Details</h4>

                <p>
                  <strong>Name:</strong>{" "}
                  {order.customerName}
                </p>

                <p>
                  <strong>Email:</strong>{" "}
                  {order.customerEmail}
                </p>

                <p>
                  <strong>Phone:</strong>{" "}
                  {order.phone}
                </p>

                <p>
                  <strong>Address:</strong>{" "}
                  {order.address}
                </p>

                {/* PRODUCTS */}

                <h4>🛒 Products</h4>

                {order.items.map(
                  (item, index) => (
                    <div
                      key={index}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "15px",
                        padding: "10px",
                        background: "white",
                        borderRadius: "8px",
                        marginBottom: "10px",
                      }}
                    >
                      {item.image ? (
                        <img
                          src={`${import.meta.env.VITE_API_URL}/uploads/${item.image}`}
                          alt={item.productName}
                          style={{
                            width: "70px",
                            height: "70px",
                            objectFit: "cover",
                            borderRadius: "8px",
                          }}
                        />
                      ) : (
                        <div
                          style={{
                            width: "70px",
                            height: "70px",
                            background: "#eee",
                            borderRadius: "8px",
                            display: "flex",
                            alignItems:
                              "center",
                            justifyContent:
                              "center",
                            fontSize: "30px",
                          }}
                        >
                          🌾
                        </div>
                      )}

                      <div>
                        <strong>
                          {item.productName}
                        </strong>

                        <p
                          style={{
                            margin: "5px 0",
                          }}
                        >
                          ₹{item.price} ×{" "}
                          {item.quantity}
                        </p>
                      </div>
                    </div>
                  )
                )}

                {/* TOTAL */}

                <h3
                  style={{
                    color: "#2E7D32",
                    marginTop: "15px",
                  }}
                >
                  💰 Total: ₹
                  {order.totalAmount}
                </h3>

                {/* STATUS UPDATE */}

                <div
                  style={{
                    marginTop: "15px",
                  }}
                >
                  <label
                    style={{
                      fontWeight: "bold",
                      marginRight: "10px",
                    }}
                  >
                    Update Status:
                  </label>

                  <select
                    value={order.status}
                    onChange={(e) =>
                      handleStatusChange(
                        order._id,
                        e.target.value
                      )
                    }
                    style={{
                      padding: "10px",
                      borderRadius: "8px",
                      border:
                        "1px solid #ccc",
                      cursor: "pointer",
                    }}
                  >
                    <option value="Paid">
                      💰 Paid
                    </option>

                    <option value="Processing">
                      ⚙️ Processing
                    </option>

                    <option value="Shipped">
                      🚚 Shipped
                    </option>

                    <option value="Delivered">
                      ✅ Delivered
                    </option>

                    <option value="Cancelled">
                      ❌ Cancelled
                    </option>
                  </select>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ========================================
          AGROMOD FEATURES
      ======================================== */}

      <div
        style={{
          background: "white",
          padding: "25px",
          borderRadius: "15px",
          boxShadow:
            "0 4px 12px rgba(0,0,0,0.1)",
        }}
      >
        <h2 style={{ color: "#2E7D32" }}>
          🌱 AgroMod Features
        </h2>

        <div
          style={{
            display: "flex",
            gap: "20px",
            flexWrap: "wrap",
            marginTop: "20px",
          }}
        >
          <FeatureCard
            emoji="🌾"
            title="Crop Price"
            description="Predict market prices."
            link="/crop-price"
          />

          <FeatureCard
            emoji="🌱"
            title="Crop Yield"
            description="Predict crop yield."
            link="/crop-yield"
          />

          <FeatureCard
            emoji="🦠"
            title="Disease Detection"
            description="Detect crop diseases."
            link="/disease-detection"
          />

          <FeatureCard
            emoji="🛒"
            title="Marketplace"
            description="Buy & sell agricultural products."
            link="/marketplace"
          />
        </div>
      </div>
    </div>
  );
}


// ========================================
// FEATURE CARD
// ========================================

function FeatureCard({
  emoji,
  title,
  description,
  link,
}) {
  return (
    <div
      style={{
        background: "#f8f9f8",
        padding: "20px",
        borderRadius: "12px",
        width: "220px",
        textAlign: "center",
      }}
    >
      <div style={{ fontSize: "35px" }}>
        {emoji}
      </div>

      <h3>{title}</h3>

      <p>{description}</p>

      <Link to={link}>
        <button
          style={{
            background: "#2E7D32",
            color: "white",
            border: "none",
            padding: "8px 18px",
            borderRadius: "7px",
            cursor: "pointer",
          }}
        >
          Open
        </button>
      </Link>
    </div>
  );
}


// ========================================
// TABLE STYLE
// ========================================

export default Dashboard;