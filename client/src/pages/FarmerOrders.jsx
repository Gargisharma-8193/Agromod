import { useEffect, useState } from "react";
import axios from "axios";

function FarmerOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/orders`
      );

      setOrders(response.data);
    } catch (error) {
      console.error("FETCH ORDERS ERROR:", error);
      alert("Unable to fetch orders");
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (orderId, status) => {
    try {
      setUpdating(orderId);

      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/orders/${orderId}/status`,
        {
          status,
        }
      );

      setOrders((previousOrders) =>
        previousOrders.map((order) =>
          order._id === orderId
            ? response.data.order
            : order
        )
      );

      alert(`Order status changed to ${status}`);
    } catch (error) {
      console.error(
        "UPDATE STATUS ERROR:",
        error
      );

      alert("Unable to update order status");
    } finally {
      setUpdating(null);
    }
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case "Paid":
        return {
          background: "#e8f5e9",
          color: "#2e7d32",
        };

      case "Processing":
        return {
          background: "#fff3cd",
          color: "#856404",
        };

      case "Shipped":
        return {
          background: "#e3f2fd",
          color: "#1565c0",
        };

      case "Delivered":
        return {
          background: "#e8f5e9",
          color: "#1b5e20",
        };

      case "Cancelled":
        return {
          background: "#ffebee",
          color: "#c62828",
        };

      default:
        return {
          background: "#eee",
          color: "#555",
        };
    }
  };

  if (loading) {
    return (
      <div style={styles.center}>
        <h2>📦 Loading orders...</h2>
      </div>
    );
  }

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <h1 style={styles.heading}>
          🌾 Farmer Order Management
        </h1>

        <p style={styles.subtitle}>
          Manage customer orders and update their
          delivery status.
        </p>

        {orders.length === 0 ? (
          <div style={styles.empty}>
            <div style={{ fontSize: "60px" }}>
              📦
            </div>

            <h2>No orders received</h2>

            <p>
              Customer orders will appear here.
            </p>
          </div>
        ) : (
          orders.map((order) => (
            <div
              key={order._id}
              style={styles.card}
            >
              {/* ORDER HEADER */}

              <div style={styles.header}>
                <div>
                  <h2>
                    Order #
                    {order._id.slice(-6)}
                  </h2>

                  <p style={styles.date}>
                    📅{" "}
                    {new Date(
                      order.createdAt
                    ).toLocaleDateString(
                      "en-IN",
                      {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      }
                    )}
                  </p>
                </div>

                <span
                  style={{
                    ...styles.status,
                    ...getStatusStyle(
                      order.status
                    ),
                  }}
                >
                  {order.status}
                </span>
              </div>

              <hr />

              {/* CUSTOMER */}

              <div style={styles.customer}>
                <h3>👤 Customer Details</h3>

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
              </div>

              {/* PRODUCTS */}

              <h3>🛍️ Products Ordered</h3>

              {order.items?.map(
                (item, index) => (
                  <div
                    key={
                      item.productId || index
                    }
                    style={styles.item}
                  >
                    {item.image ? (
                      <img
                        src={`${import.meta.env.VITE_API_URL}/uploads/${item.image}`}
                        alt={
                          item.productName
                        }
                        style={styles.image}
                      />
                    ) : (
                      <div
                        style={
                          styles.noImage
                        }
                      >
                        🌾
                      </div>
                    )}

                    <div
                      style={{
                        flex: 1,
                      }}
                    >
                      <h3>
                        {item.productName}
                      </h3>

                      <p>
                        Price: ₹{item.price}
                      </p>

                      <p>
                        Quantity:{" "}
                        {item.quantity}
                      </p>
                    </div>

                    <strong
                      style={{
                        color: "#2E7D32",
                      }}
                    >
                      ₹
                      {Number(
                        item.price
                      ) *
                        Number(
                          item.quantity
                        )}
                    </strong>
                  </div>
                )
              )}

              <hr />

              {/* TOTAL */}

              <div style={styles.total}>
                <span>Total Amount</span>

                <strong>
                  ₹{order.totalAmount}
                </strong>
              </div>

              {/* PAYMENT */}

              <div style={styles.payment}>
                <h3>💳 Payment</h3>

                <p>
                  Status:{" "}
                  <strong>
                    {order.status ===
                      "Paid" ||
                    order.status ===
                      "Processing" ||
                    order.status ===
                      "Shipped" ||
                    order.status ===
                      "Delivered"
                      ? "✅ Paid"
                      : "⏳ Pending"}
                  </strong>
                </p>

                {order.razorpayPaymentId && (
                  <p
                    style={{
                      fontSize: "13px",
                      color: "#666",
                    }}
                  >
                    Payment ID:{" "}
                    {
                      order.razorpayPaymentId
                    }
                  </p>
                )}
              </div>

              {/* STATUS UPDATE */}

              <div style={styles.updateBox}>
                <h3>
                  🚚 Update Order Status
                </h3>

                <select
                  value={order.status}
                  disabled={
                    updating === order._id
                  }
                  onChange={(e) =>
                    updateStatus(
                      order._id,
                      e.target.value
                    )
                  }
                  style={styles.select}
                >
                  <option value="Paid">
                    Paid
                  </option>

                  <option value="Processing">
                    Processing
                  </option>

                  <option value="Shipped">
                    Shipped
                  </option>

                  <option value="Delivered">
                    Delivered
                  </option>

                  <option value="Cancelled">
                    Cancelled
                  </option>
                </select>

                {updating === order._id && (
                  <span
                    style={{
                      marginLeft: "10px",
                    }}
                  >
                    Updating...
                  </span>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "#f4f6f8",
    padding: "40px",
  },

  container: {
    maxWidth: "1000px",
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

  card: {
    background: "white",
    padding: "25px",
    borderRadius: "15px",
    marginBottom: "25px",
    boxShadow:
      "0 4px 12px rgba(0,0,0,0.1)",
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "20px",
    flexWrap: "wrap",
  },

  date: {
    color: "#666",
  },

  status: {
    padding: "8px 16px",
    borderRadius: "20px",
    fontWeight: "bold",
  },

  customer: {
    background: "#f8f9fa",
    padding: "15px",
    borderRadius: "10px",
    marginBottom: "20px",
  },

  item: {
    display: "flex",
    alignItems: "center",
    gap: "20px",
    padding: "15px 0",
  },

  image: {
    width: "90px",
    height: "70px",
    objectFit: "cover",
    borderRadius: "8px",
  },

  noImage: {
    width: "90px",
    height: "70px",
    background: "#eee",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "8px",
    fontSize: "30px",
  },

  total: {
    display: "flex",
    justifyContent: "space-between",
    fontSize: "20px",
    color: "#2E7D32",
    padding: "10px 0",
  },

  payment: {
    background: "#f1f8e9",
    padding: "15px",
    borderRadius: "10px",
    marginTop: "15px",
  },

  updateBox: {
    background: "#e8f5e9",
    padding: "20px",
    borderRadius: "10px",
    marginTop: "20px",
  },

  select: {
    padding: "10px",
    borderRadius: "7px",
    border: "1px solid #ccc",
    fontSize: "15px",
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
};

export default FarmerOrders;