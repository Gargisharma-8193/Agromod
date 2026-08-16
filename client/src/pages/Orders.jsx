import { useEffect, useState } from "react";
import axios from "axios";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // ========================================
  // FETCH ORDERS
  // ========================================

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/orders`);

      setOrders(response.data);
    } catch (error) {
      console.error(
        "Error fetching orders:",
        error
      );

      alert("Unable to fetch orders");
    } finally {
      setLoading(false);
    }
  };

  // ========================================
  // STATUS STYLE
  // ========================================

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
          background: "#f5f5f5",
          color: "#555",
        };
    }
  };

  // ========================================
  // LOADING
  // ========================================

  if (loading) {
    return (
      <div style={styles.center}>
        <div style={styles.loadingBox}>
          <div style={{ fontSize: "50px" }}>
            📦
          </div>

          <h2>Loading your orders...</h2>

          <p>
            Please wait while we fetch your
            orders.
          </p>
        </div>
      </div>
    );
  }

  // ========================================
  // MAIN
  // ========================================

  return (
    <div style={styles.page}>
      <div style={styles.mainContainer}>
        <h1 style={styles.heading}>
          📦 My Orders
        </h1>

        <p style={styles.subtitle}>
          Track all your AgroMod purchases in one
          place.
        </p>

        {/* ====================================
            EMPTY ORDERS
        ==================================== */}

        {orders.length === 0 ? (
          <div style={styles.empty}>
            <div style={{ fontSize: "70px" }}>
              📦
            </div>

            <h2>No orders yet</h2>

            <p>
              Your placed orders will appear
              here.
            </p>
          </div>
        ) : (
          /* ====================================
             ORDERS
          ==================================== */

          <div style={styles.container}>
            {orders.map((order) => (
              <div
                key={order._id}
                style={styles.orderCard}
              >
                {/* ==================================
                    ORDER HEADER
                ================================== */}

                <div style={styles.orderHeader}>
                  <div>
                    <h2
                      style={{
                        margin: "0 0 8px",
                      }}
                    >
                      Order #
                      {order._id.slice(-6)}
                    </h2>

                    <p
                      style={{
                        margin: 0,
                        color: "#666",
                      }}
                    >
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

                    <p
                      style={{
                        margin: "5px 0 0",
                        color: "#666",
                        fontSize: "14px",
                      }}
                    >
                      Order ID: {order._id}
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
                    {order.status || "Pending"}
                  </span>
                </div>

                <hr />

                {/* ==================================
                    ORDER STATUS TRACKER
                ================================== */}

                <div
                  style={{
                    background: "#f8f9fa",
                    padding: "15px",
                    borderRadius: "10px",
                    marginBottom: "20px",
                  }}
                >
                  <h3>🚚 Order Status</h3>

                  <div
                    style={{
                      display: "flex",
                      justifyContent:
                        "space-between",
                      flexWrap: "wrap",
                      gap: "10px",
                    }}
                  >
                    <StatusStep
                      label="Paid"
                      active={[
                        "Paid",
                        "Processing",
                        "Shipped",
                        "Delivered",
                      ].includes(
                        order.status
                      )}
                    />

                    <StatusStep
                      label="Processing"
                      active={[
                        "Processing",
                        "Shipped",
                        "Delivered",
                      ].includes(
                        order.status
                      )}
                    />

                    <StatusStep
                      label="Shipped"
                      active={[
                        "Shipped",
                        "Delivered",
                      ].includes(
                        order.status
                      )}
                    />

                    <StatusStep
                      label="Delivered"
                      active={
                        order.status ===
                        "Delivered"
                      }
                    />
                  </div>
                </div>

                {/* ==================================
                    PRODUCTS
                ================================== */}

                <h3>🛍️ Products</h3>

                {order.items &&
                  order.items.map(
                    (item, index) => (
                      <div
                        key={
                          item.productId ||
                          index
                        }
                        style={styles.item}
                      >
                        {/* IMAGE */}

                        {item.image ? (
                          <img
                            src={`${import.meta.env.VITE_API_URL}/uploads/${item.image}`}
                            alt={
                              item.productName
                            }
                            style={
                              styles.image
                            }
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

                        {/* DETAILS */}

                        <div
                          style={{
                            flex: 1,
                          }}
                        >
                          <h3
                            style={{
                              margin:
                                "0 0 8px",
                            }}
                          >
                            {
                              item.productName
                            }
                          </h3>

                          <p
                            style={{
                              margin: "5px 0",
                            }}
                          >
                            Price: ₹
                            {item.price}
                          </p>

                          <p
                            style={{
                              margin: "5px 0",
                            }}
                          >
                            Quantity:{" "}
                            {item.quantity}
                          </p>
                        </div>

                        {/* ITEM TOTAL */}

                        <strong
                          style={{
                            color:
                              "#2E7D32",
                            fontSize:
                              "17px",
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

                {/* ==================================
                    TOTAL
                ================================== */}

                <div style={styles.total}>
                  <span>Total Amount</span>

                  <strong>
                    ₹{order.totalAmount}
                  </strong>
                </div>

                {/* ==================================
                    PAYMENT
                ================================== */}

                <div style={styles.paymentBox}>
                  <h3>
                    💳 Payment Information
                  </h3>

                  <p>
                    <strong>Status:</strong>{" "}
                    {order.status === "Paid" ||
                    order.status ===
                      "Processing" ||
                    order.status === "Shipped" ||
                    order.status ===
                      "Delivered"
                      ? "✅ Paid"
                      : "⏳ Pending"}
                  </p>

                  {order.razorpayPaymentId && (
                    <p
                      style={{
                        fontSize: "13px",
                        color: "#666",
                        wordBreak:
                          "break-all",
                      }}
                    >
                      Payment ID:{" "}
                      {
                        order.razorpayPaymentId
                      }
                    </p>
                  )}
                </div>

                {/* ==================================
                    DELIVERY
                ================================== */}

                <div style={styles.delivery}>
                  <h3>
                    🚚 Delivery Details
                  </h3>

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
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ========================================
// STATUS COMPONENT
// ========================================

function StatusStep({ label, active }) {
  return (
    <div
      style={{
        textAlign: "center",
        flex: 1,
        minWidth: "100px",
      }}
    >
      <div
        style={{
          width: "30px",
          height: "30px",
          borderRadius: "50%",
          margin: "auto",
          background: active
            ? "#2E7D32"
            : "#ddd",
          color: active
            ? "white"
            : "#777",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontWeight: "bold",
        }}
      >
        {active ? "✓" : "•"}
      </div>

      <p
        style={{
          fontSize: "13px",
          fontWeight: active
            ? "bold"
            : "normal",
          color: active
            ? "#2E7D32"
            : "#777",
        }}
      >
        {label}
      </p>
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

  mainContainer: {
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

  container: {
    display: "grid",
    gap: "25px",
  },

  orderCard: {
    background: "white",
    padding: "25px",
    borderRadius: "15px",
    boxShadow:
      "0 4px 12px rgba(0,0,0,0.1)",
  },

  orderHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "20px",
    flexWrap: "wrap",
  },

  status: {
    padding: "8px 15px",
    borderRadius: "20px",
    fontWeight: "bold",
  },

  item: {
    display: "flex",
    alignItems: "center",
    gap: "20px",
    padding: "15px 0",
    flexWrap: "wrap",
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
    alignItems: "center",
    color: "#2E7D32",
    fontSize: "20px",
    padding: "10px 0",
  },

  paymentBox: {
    background: "#f1f8e9",
    padding: "15px",
    borderRadius: "8px",
    marginTop: "15px",
  },

  delivery: {
    background: "#f8f9fa",
    padding: "15px",
    borderRadius: "8px",
    marginTop: "15px",
  },

  empty: {
    maxWidth: "600px",
    margin: "50px auto",
    background: "white",
    padding: "50px",
    borderRadius: "12px",
    textAlign: "center",
  },

  center: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#f4f6f8",
  },

  loadingBox: {
    background: "white",
    padding: "40px",
    borderRadius: "15px",
    textAlign: "center",
    boxShadow:
      "0 4px 12px rgba(0,0,0,0.1)",
  },
};

export default Orders;