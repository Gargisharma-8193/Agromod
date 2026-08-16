import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Checkout() {
  const navigate = useNavigate();

  const [cart] = useState(
    JSON.parse(localStorage.getItem("cart")) || []
  );

  const [form, setForm] = useState({
    customerName: "",
    customerEmail: "",
    address: "",
    phone: "",
  });

  const [loading, setLoading] = useState(false);

  const totalAmount = cart.reduce(
    (total, item) =>
      total +
      Number(item.price) *
        Number(item.cartQuantity || 1),
    0
  );

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const placeOrder = async (e) => {
    e.preventDefault();

    if (cart.length === 0) {
      alert("🛒 Your cart is empty!");
      navigate("/marketplace");
      return;
    }

    if (totalAmount <= 0) {
      alert("❌ Invalid order amount.");
      return;
    }

    try {
      setLoading(true);

      console.log("Creating Razorpay order...");

      const orderResponse = await axios.post(
        `${import.meta.env.VITE_API_URL}/payments/create-order`,
        {
          amount: totalAmount,
        }
      );

      console.log(
        "Razorpay order:",
        orderResponse.data
      );

      const razorpayOrder =
        orderResponse.data.order;

      if (!razorpayOrder) {
        throw new Error(
          "Razorpay order was not created."
        );
      }

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,

        amount: razorpayOrder.amount,

        currency: razorpayOrder.currency,

        name: "AgroMod",

        description:
          "AgroMod Farmer Marketplace",

        order_id: razorpayOrder.id,

        prefill: {
          name: form.customerName,
          email: form.customerEmail,
          contact: form.phone,
        },

        theme: {
          color: "#2E7D32",
        },

        handler: async function (response) {
          try {
            console.log(
              "Razorpay response:",
              response
            );

            const verifyResponse =
              await axios.post(
                `${import.meta.env.VITE_API_URL}/payments/verify-payment`,
                {
                  razorpay_order_id:
                    response.razorpay_order_id,

                  razorpay_payment_id:
                    response.razorpay_payment_id,

                  razorpay_signature:
                    response.razorpay_signature,
                }
              );

            console.log(
              "Payment verification:",
              verifyResponse.data
            );

            if (!verifyResponse.data.success) {
              alert(
                "❌ Payment verification failed."
              );

              return;
            }

            const orderItems = cart.map(
              (item) => ({
                productId: item._id,

                productName:
                  item.productName,

                price: Number(item.price),

                quantity: Number(
                  item.cartQuantity || 1
                ),

                image: item.image || "",
              })
            );

            const saveResponse =
              await axios.post(
                `${import.meta.env.VITE_API_URL}/orders`,
                {
                  items: orderItems,

                  totalAmount,

                  customerName:
                    form.customerName,

                  customerEmail:
                    form.customerEmail,

                  address: form.address,

                  phone: form.phone,

                  razorpayOrderId:
                    response.razorpay_order_id,

                  razorpayPaymentId:
                    response.razorpay_payment_id,

                  razorpaySignature:
                    response.razorpay_signature,
                }
              );

            console.log(
              "Order saved:",
              saveResponse.data
            );

            localStorage.removeItem("cart");

            alert(
              "🎉 Payment successful!\n\nYour order has been placed successfully."
            );

            navigate("/orders");
          } catch (error) {
            console.error(
              "PAYMENT / ORDER ERROR:",
              error
            );

            if (error.response) {
              console.error(
                "Server response:",
                error.response.data
              );
            }

            alert(
              "Payment was successful, but there was a problem saving your order."
            );
          }
        },

        modal: {
          ondismiss: function () {
            console.log(
              "Razorpay payment window closed."
            );

            setLoading(false);
          },
        },
      };

      if (!window.Razorpay) {
        alert(
          "❌ Razorpay SDK is not loaded."
        );

        setLoading(false);

        return;
      }

      const razorpay =
        new window.Razorpay(options);

      razorpay.on(
        "payment.failed",
        function (response) {
          console.error(
            "Payment failed:",
            response.error
          );

          alert(
            "❌ Payment failed. Please try again."
          );

          setLoading(false);
        }
      );

      razorpay.open();
    } catch (error) {
      console.error(
        "PAYMENT ERROR:",
        error
      );

      if (error.response) {
        console.error(
          "Server response:",
          error.response.data
        );

        alert(
          error.response.data.message ||
            "Unable to create payment."
        );
      } else {
        alert(
          "❌ Unable to connect to payment server."
        );
      }

      setLoading(false);
    }
  };

  if (cart.length === 0) {
    return (
      <div
        style={{
          minHeight: "100vh",
          background: "#f4f6f8",
          padding: "40px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            background: "white",
            padding: "50px",
            borderRadius: "15px",
            textAlign: "center",
            maxWidth: "500px",
            width: "100%",
            boxShadow:
              "0 4px 12px rgba(0,0,0,0.1)",
          }}
        >
          <div style={{ fontSize: "60px" }}>
            🛒
          </div>

          <h2>Your cart is empty</h2>

          <p>
            Add products before proceeding to
            checkout.
          </p>

          <button
            onClick={() =>
              navigate("/marketplace")
            }
            style={{
              background: "#2E7D32",
              color: "white",
              border: "none",
              padding: "12px 25px",
              borderRadius: "8px",
              cursor: "pointer",
              fontSize: "16px",
            }}
          >
            🌾 Go to Marketplace
          </button>
        </div>
      </div>
    );
  }

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
          maxWidth: "750px",
          margin: "auto",
        }}
      >
        <h1 style={{ color: "#2E7D32" }}>
          🛍️ Checkout
        </h1>

        <p style={{ color: "#666" }}>
          Enter your delivery details to place
          your AgroMod order.
        </p>

        <div
          style={{
            background: "white",
            padding: "25px",
            borderRadius: "12px",
            marginTop: "25px",
            boxShadow:
              "0 4px 10px rgba(0,0,0,0.08)",
          }}
        >
          <h2>🧾 Order Summary</h2>

          {cart.map((item) => (
            <div
              key={item._id}
              style={{
                display: "flex",
                justifyContent:
                  "space-between",
                padding: "10px 0",
                borderBottom:
                  "1px solid #eee",
              }}
            >
              <span>
                {item.productName} ×{" "}
                {item.cartQuantity || 1}
              </span>

              <strong>
                ₹
                {Number(item.price) *
                  Number(
                    item.cartQuantity || 1
                  )}
              </strong>
            </div>
          ))}

          <div
            style={{
              display: "flex",
              justifyContent:
                "space-between",
              marginTop: "20px",
            }}
          >
            <h2>Total</h2>

            <h2
              style={{
                color: "#2E7D32",
              }}
            >
              ₹{totalAmount}
            </h2>
          </div>
        </div>

        <div
          style={{
            background: "white",
            padding: "30px",
            borderRadius: "12px",
            marginTop: "25px",
            boxShadow:
              "0 4px 10px rgba(0,0,0,0.08)",
          }}
        >
          <h2>👤 Delivery Details</h2>

          <form onSubmit={placeOrder}>
            <input
              type="text"
              name="customerName"
              placeholder="Full Name"
              value={form.customerName}
              onChange={handleChange}
              required
              style={inputStyle}
            />

            <input
              type="email"
              name="customerEmail"
              placeholder="Email Address"
              value={form.customerEmail}
              onChange={handleChange}
              required
              style={inputStyle}
            />

            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              value={form.phone}
              onChange={handleChange}
              required
              style={inputStyle}
            />

            <textarea
              name="address"
              placeholder="Complete Delivery Address"
              value={form.address}
              onChange={handleChange}
              required
              rows="4"
              style={inputStyle}
            />

            <button
              type="submit"
              disabled={loading}
              style={{
                width: "100%",
                padding: "14px",
                background: loading
                  ? "#999"
                  : "#2E7D32",
                color: "white",
                border: "none",
                borderRadius: "8px",
                fontSize: "17px",
                cursor: loading
                  ? "not-allowed"
                  : "pointer",
                marginTop: "20px",
                fontWeight: "bold",
              }}
            >
              {loading
                ? "⏳ Processing..."
                : `💳 Pay ₹${totalAmount}`}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "12px",
  marginTop: "15px",
  border: "1px solid #ccc",
  borderRadius: "6px",
  boxSizing: "border-box",
  fontSize: "15px",
};

export default Checkout;