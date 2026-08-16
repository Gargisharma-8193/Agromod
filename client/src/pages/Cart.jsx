import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Cart() {
  const [cart, setCart] = useState(
    JSON.parse(localStorage.getItem("cart")) || []
  );

  const navigate = useNavigate();

  // ========================================
  // REMOVE PRODUCT
  // ========================================

  const removeFromCart = (id) => {
    const updatedCart = cart.filter(
      (item) => item._id !== id
    );

    setCart(updatedCart);

    localStorage.setItem(
      "cart",
      JSON.stringify(updatedCart)
    );
  };

  // ========================================
  // UPDATE QUANTITY
  // ========================================

  const updateQuantity = (id, change) => {
    const updatedCart = cart.map((item) => {
      if (item._id === id) {
        const currentQuantity =
          item.cartQuantity || 1;

        let newQuantity =
          currentQuantity + change;

        // Minimum quantity = 1

        if (newQuantity < 1) {
          newQuantity = 1;
        }

        // Maximum quantity = available stock

        if (
          newQuantity >
          Number(item.quantity)
        ) {
          alert(
            `Only ${item.quantity} units available.`
          );

          newQuantity = Number(item.quantity);
        }

        return {
          ...item,
          cartQuantity: newQuantity,
        };
      }

      return item;
    });

    setCart(updatedCart);

    localStorage.setItem(
      "cart",
      JSON.stringify(updatedCart)
    );
  };

  // ========================================
  // CALCULATE TOTAL
  // ========================================

  const total = cart.reduce(
    (sum, item) =>
      sum +
      Number(item.price) *
        Number(item.cartQuantity || 1),
    0
  );

  // ========================================
  // CART EMPTY
  // ========================================

  if (cart.length === 0) {
    return (
      <div
        style={{
          minHeight: "100vh",
          background: "#f4f6f8",
          padding: "40px",
        }}
      >
        <div
          style={{
            maxWidth: "700px",
            margin: "auto",
            background: "white",
            padding: "50px",
            borderRadius: "15px",
            textAlign: "center",
            boxShadow:
              "0 4px 12px rgba(0,0,0,0.1)",
          }}
        >
          <div style={{ fontSize: "70px" }}>
            🛒
          </div>

          <h1>Your Cart is Empty</h1>

          <p style={{ color: "#666" }}>
            Add some agricultural products from
            the marketplace.
          </p>

          <button
            onClick={() => navigate("/marketplace")}
            style={{
              background: "#2E7D32",
              color: "white",
              border: "none",
              padding: "12px 25px",
              borderRadius: "8px",
              cursor: "pointer",
              fontSize: "16px",
              fontWeight: "bold",
              marginTop: "15px",
            }}
          >
            🌾 Go to Marketplace
          </button>
        </div>
      </div>
    );
  }

  // ========================================
  // MAIN CART
  // ========================================

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f4f6f8",
        padding: "40px",
      }}
    >
      <div
        style={{
          maxWidth: "1000px",
          margin: "auto",
        }}
      >
        {/* HEADER */}

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "15px",
          }}
        >
          <h1 style={{ color: "#2E7D32" }}>
            🛒 My Cart
          </h1>

          <button
            onClick={() =>
              navigate("/marketplace")
            }
            style={{
              padding: "10px 18px",
              border: "1px solid #2E7D32",
              background: "white",
              color: "#2E7D32",
              borderRadius: "8px",
              cursor: "pointer",
            }}
          >
            ← Continue Shopping
          </button>
        </div>

        {/* CART PRODUCTS */}

        <div
          style={{
            display: "grid",
            gap: "20px",
            marginTop: "30px",
          }}
        >
          {cart.map((item) => (
            <div
              key={item._id}
              style={{
                background: "white",
                padding: "20px",
                borderRadius: "12px",
                display: "flex",
                gap: "20px",
                alignItems: "center",
                flexWrap: "wrap",
                boxShadow:
                  "0 4px 10px rgba(0,0,0,0.08)",
              }}
            >
              {/* IMAGE */}

              {item.image ? (
                <img
                  src={`${import.meta.env.VITE_API_URL}/uploads/${item.image}`}
                  alt={item.productName}
                  style={{
                    width: "120px",
                    height: "100px",
                    objectFit: "cover",
                    borderRadius: "8px",
                  }}
                />
              ) : (
                <div
                  style={{
                    width: "120px",
                    height: "100px",
                    background: "#e8f5e9",
                    borderRadius: "8px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "45px",
                  }}
                >
                  🌾
                </div>
              )}

              {/* PRODUCT DETAILS */}

              <div style={{ flex: 1 }}>
                <h2
                  style={{
                    marginTop: 0,
                  }}
                >
                  {item.productName}
                </h2>

                <p>
                  <strong>Price:</strong>{" "}
                  ₹{item.price}
                </p>

                <p>
                  <strong>Seller:</strong>{" "}
                  {item.seller}
                </p>

                <p
                  style={{
                    color: "#777",
                  }}
                >
                  Available: {item.quantity}
                </p>

                {/* QUANTITY */}

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "15px",
                    marginTop: "10px",
                  }}
                >
                  <button
                    onClick={() =>
                      updateQuantity(
                        item._id,
                        -1
                      )
                    }
                    style={{
                      width: "35px",
                      height: "35px",
                      border: "none",
                      borderRadius: "6px",
                      background: "#e0e0e0",
                      cursor: "pointer",
                      fontSize: "20px",
                    }}
                  >
                    −
                  </button>

                  <strong
                    style={{
                      fontSize: "18px",
                    }}
                  >
                    {item.cartQuantity || 1}
                  </strong>

                  <button
                    onClick={() =>
                      updateQuantity(
                        item._id,
                        1
                      )
                    }
                    style={{
                      width: "35px",
                      height: "35px",
                      border: "none",
                      borderRadius: "6px",
                      background: "#2E7D32",
                      color: "white",
                      cursor: "pointer",
                      fontSize: "20px",
                    }}
                  >
                    +
                  </button>
                </div>
              </div>

              {/* SUBTOTAL */}

              <div
                style={{
                  textAlign: "right",
                }}
              >
                <h3
                  style={{
                    color: "#2E7D32",
                  }}
                >
                  ₹
                  {Number(item.price) *
                    Number(
                      item.cartQuantity || 1
                    )}
                </h3>

                <button
                  onClick={() =>
                    removeFromCart(item._id)
                  }
                  style={{
                    background: "#d32f2f",
                    color: "white",
                    border: "none",
                    padding: "10px 15px",
                    borderRadius: "6px",
                    cursor: "pointer",
                  }}
                >
                  🗑️ Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* ORDER SUMMARY */}

        <div
          style={{
            background: "white",
            marginTop: "30px",
            padding: "25px",
            borderRadius: "12px",
            boxShadow:
              "0 4px 10px rgba(0,0,0,0.08)",
          }}
        >
          <h2>🧾 Order Summary</h2>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "15px",
            }}
          >
            <span>Items</span>

            <strong>
              {cart.reduce(
                (sum, item) =>
                  sum +
                  Number(
                    item.cartQuantity || 1
                  ),
                0
              )}
            </strong>
          </div>

          <hr />

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <h2>Total</h2>

            <h2
              style={{
                color: "#2E7D32",
              }}
            >
              ₹{total}
            </h2>
          </div>

          {/* CHECKOUT */}

          <button
            onClick={() => navigate("/checkout")}
            style={{
              width: "100%",
              background: "#2E7D32",
              color: "white",
              border: "none",
              padding: "15px",
              borderRadius: "8px",
              cursor: "pointer",
              fontSize: "17px",
              fontWeight: "bold",
              marginTop: "15px",
            }}
          >
            💳 Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
}

export default Cart;