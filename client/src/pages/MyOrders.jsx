import { useEffect, useState } from "react";
import axios from "axios";

function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // ========================================
  // FETCH ORDERS
  // ========================================
  const fetchOrders = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/orders`
      );

      setOrders(response.data);
    } catch (error) {
      console.error("GET ORDERS ERROR:", error);
      alert("❌ Unable to fetch orders");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // ========================================
  // STATUS COLOR
  // ========================================
  const getStatusStyle = (status) => {
    switch (status) {
      case "Paid":
        return {
          background: "#c8e6c9",
          color: "#2e7d32",
        };

      case "Processing":
        return {
          background: "#fff3cd",
          color: "#856404",
        };

      case "Shipped":
        return {
          background: "#cfe2ff",
          color: "#084298",
        };

      case "Delivered":
        return {
          background: "#b7e4c7",
          color: "#155724",
        };

      case "Cancelled":
        return {
          background: "#ffcdd2",
          color: "#842029",
        };

      default:
        return {
          background: "#eee",
          color: "#555",
        };
    }
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
        <h2>📦 Loading your orders...</h2>
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f5f7f5",
        padding: "40px",
      }}
    >
      <div
        style={{
          maxWidth: "1000px",
          margin: "auto",
        }}
      >
        <h1
          style={{
            color: "#2E7D32",
            marginBottom: "10px",
          }}
        >
          📦 My Orders
        </h1>

        <p style={{ color: "#666" }}>
          Track your AgroMod orders and delivery status.
        </p>

        {orders.length === 0 ? (
          <div
            style={{
              background: "white",
              padding: "40px",
              borderRadius: "15px",
              textAlign: "center",
              marginTop: "30px",
              boxShadow:
                "0 4px 12px rgba(0,0,0,0.1)",
            }}
          >
            <div style={{ fontSize: "60px" }}>
              🛒
            </div>

            <h2>No orders yet</h2>

            <p>
              Your purchased products will appear here.
            </p>
          </div>
        ) : (
          <div
            style={{
              display: "grid",
              gap: "25px",
              marginTop: "30px",
            }}
          >
            {orders.map((order) => (
              <div
                key={order._id}
                style={{
                  background: "white",
                  padding: "25px",
                  borderRadius: "15px",
                  boxShadow:
                    "0 4px 12px rgba(0,0,0,0.1)",
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
                    gap: "15px",
                  }}
                >
                  <div>
                    <h2
                      style={{
                        margin: 0,
                        color: "#333",
                      }}
                    >
                      Order #{order._id.slice(-6)}
                    </h2>

                    <p
                      style={{
                        color: "#777",
                        marginBottom: 0,
                      }}
                    >
                      {new Date(
                        order.createdAt
                      ).toLocaleString()}
                    </p>
                  </div>

                  <span
                    style={{
                      ...getStatusStyle(
                        order.status
                      ),
                      padding: "10px 18px",
                      borderRadius: "25px",
                      fontWeight: "bold",
                    }}
                  >
                    {order.status === "Paid" && "💰 "}
                    {order.status === "Processing" && "⚙️ "}
                    {order.status === "Shipped" && "🚚 "}
                    {order.status === "Delivered" && "✅ "}
                    {order.status === "Cancelled" && "❌ "}

                    {order.status}
                  </span>
                </div>

                <hr />

                {/* ORDER ITEMS */}

                <h3
                  style={{
                    color: "#2E7D32",
                  }}
                >
                  🛒 Ordered Products
                </h3>

                {order.items.map((item, index) => (
                  <div
                    key={index}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "15px",
                      padding: "15px",
                      background: "#f8f9f8",
                      borderRadius: "10px",
                      marginBottom: "12px",
                    }}
                  >
                    {/* IMAGE */}

                    {item.image ? (
                      <img
                        src={`${import.meta.env.VITE_API_URL}/uploads/${item.image}`}
                        alt={item.productName}
                        style={{
                          width: "80px",
                          height: "80px",
                          objectFit: "cover",
                          borderRadius: "10px",
                        }}
                      />
                    ) : (
                      <div
                        style={{
                          width: "80px",
                          height: "80px",
                          background: "#e8f5e9",
                          borderRadius: "10px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "35px",
                        }}
                      >
                        🌾
                      </div>
                    )}

                    <div>
                      <h3
                        style={{
                          margin: 0,
                        }}
                      >
                        {item.productName}
                      </h3>

                      <p
                        style={{
                          margin: "5px 0",
                        }}
                      >
                        ₹{item.price} ×{" "}
                        {item.quantity}
                      </p>

                      <p
                        style={{
                          margin: 0,
                          color: "#666",
                        }}
                      >
                        Subtotal: ₹
                        {Number(item.price) *
                          Number(item.quantity)}
                      </p>
                    </div>
                  </div>
                ))}

                {/* TOTAL */}

                <div
                  style={{
                    background: "#e8f5e9",
                    padding: "15px",
                    borderRadius: "10px",
                    marginTop: "15px",
                  }}
                >
                  <h2
                    style={{
                      margin: 0,
                      color: "#2E7D32",
                    }}
                  >
                    💰 Total: ₹
                    {order.totalAmount}
                  </h2>

                  <p
                    style={{
                      marginBottom: 0,
                    }}
                  >
                    Payment Status:{" "}
                    <strong>
                      {order.razorpayPaymentId
                        ? "✅ Paid"
                        : "Pending"}
                    </strong>
                  </p>
                </div>

                {/* DELIVERY DETAILS */}

                <div style={{ marginTop: "20px" }}>
                  <h3>📍 Delivery Details</h3>

                  <p>
                    <strong>Name:</strong>{" "}
                    {order.customerName}
                  </p>

                  <p>
                    <strong>Phone:</strong>{" "}
                    {order.phone}
                  </p>

                  <p>
                    <strong>Email:</strong>{" "}
                    {order.customerEmail}
                  </p>

                  <p>
                    <strong>Address:</strong>{" "}
                    {order.address}
                  </p>
                </div>

                {/* ORDER PROGRESS */}

                <div style={{ marginTop: "25px" }}>
                  <h3>🚚 Order Progress</h3>

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
                    {[
                      "Paid",
                      "Processing",
                      "Shipped",
                      "Delivered",
                    ].map((status, index) => {
                      const statuses = [
                        "Paid",
                        "Processing",
                        "Shipped",
                        "Delivered",
                      ];

                      const currentIndex =
                        statuses.indexOf(
                          order.status
                        );

                      const completed =
                        currentIndex >= index;

                      return (
                        <div
                          key={status}
                          style={{
                            textAlign: "center",
                            flex: 1,
                            minWidth: "100px",
                          }}
                        >
                          <div
                            style={{
                              width: "35px",
                              height: "35px",
                              borderRadius: "50%",
                              background:
                                completed
                                  ? "#2E7D32"
                                  : "#ddd",
                              color: "white",
                              display: "flex",
                              alignItems:
                                "center",
                              justifyContent:
                                "center",
                              margin: "auto",
                              fontWeight: "bold",
                            }}
                          >
                            {completed
                              ? "✓"
                              : index + 1}
                          </div>

                          <p
                            style={{
                              fontSize: "13px",
                              fontWeight:
                                completed
                                  ? "bold"
                                  : "normal",
                              color:
                                completed
                                  ? "#2E7D32"
                                  : "#777",
                            }}
                          >
                            {status}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default MyOrders;