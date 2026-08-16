import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Marketplace() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cartCount, setCartCount] = useState(0);

  // ========================================
  // FETCH PRODUCTS
  // ========================================

  useEffect(() => {
    fetchProducts();
    updateCartCount();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/products`);

      setProducts(response.data);
    } catch (error) {
      console.error("GET PRODUCTS ERROR:", error);

      alert("❌ Unable to load products");
    } finally {
      setLoading(false);
    }
  };

  // ========================================
  // UPDATE CART COUNT
  // ========================================

  const updateCartCount = () => {
    const cart =
      JSON.parse(localStorage.getItem("cart")) || [];

    const count = cart.reduce(
      (total, item) =>
        total + (item.cartQuantity || 1),
      0
    );

    setCartCount(count);
  };

  // ========================================
  // ADD TO CART
  // ========================================

  const addToCart = (product) => {
    const existingCart =
      JSON.parse(localStorage.getItem("cart")) || [];

    const existingProduct = existingCart.find(
      (item) => item._id === product._id
    );

    let updatedCart;

    if (existingProduct) {
      const currentQuantity =
        existingProduct.cartQuantity || 1;

      // Don't allow quantity above available stock

      if (
        currentQuantity >=
        Number(product.quantity)
      ) {
        alert(
          `⚠️ Only ${product.quantity} units available.`
        );

        return;
      }

      updatedCart = existingCart.map((item) =>
        item._id === product._id
          ? {
              ...item,
              cartQuantity:
                currentQuantity + 1,
            }
          : item
      );
    } else {
      updatedCart = [
        ...existingCart,
        {
          ...product,
          cartQuantity: 1,
        },
      ];
    }

    localStorage.setItem(
      "cart",
      JSON.stringify(updatedCart)
    );

    updateCartCount();

    alert("🛒 Product added to cart!");
  };

  // ========================================
  // LOADING
  // ========================================

  if (loading) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#f4f6f8",
        }}
      >
        <h2>🌾 Loading Marketplace...</h2>
      </div>
    );
  }

  return (
    <div
      style={{
        padding: "40px",
        background: "#f4f6f8",
        minHeight: "100vh",
      }}
    >
      {/* ========================================
          HEADER
      ======================================== */}

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "15px",
          marginBottom: "30px",
        }}
      >
        <div>
          <h1
            style={{
              color: "#2E7D32",
              marginBottom: "5px",
            }}
          >
            🛒 Farmer Marketplace
          </h1>

          <p style={{ color: "#666" }}>
            Buy fresh agricultural products directly
            from farmers.
          </p>
        </div>

        {/* CART BUTTON */}

        <Link
          to="/cart"
          style={{
            textDecoration: "none",
          }}
        >
          <button
            style={{
              padding: "12px 20px",
              background: "#2E7D32",
              color: "white",
              border: "none",
              borderRadius: "10px",
              cursor: "pointer",
              fontSize: "16px",
              fontWeight: "bold",
            }}
          >
            🛒 Cart ({cartCount})
          </button>
        </Link>
      </div>

      {/* ========================================
          NO PRODUCTS
      ======================================== */}

      {products.length === 0 ? (
        <div
          style={{
            background: "white",
            padding: "50px",
            textAlign: "center",
            borderRadius: "15px",
            boxShadow:
              "0 4px 12px rgba(0,0,0,0.1)",
          }}
        >
          <div style={{ fontSize: "60px" }}>
            🌾
          </div>

          <h2>No products available</h2>

          <p>
            Farmers haven't added any products yet.
          </p>
        </div>
      ) : (
        /* ========================================
           PRODUCT GRID
        ======================================== */

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "25px",
          }}
        >
          {products.map((product) => (
            <div
              key={product._id}
              style={{
                background: "#fff",
                borderRadius: "15px",
                overflow: "hidden",
                boxShadow:
                  "0 5px 15px rgba(0,0,0,0.12)",
                transition: "transform 0.2s",
              }}
            >
              {/* ==================================
                  PRODUCT IMAGE
              ================================== */}

              {product.image ? (
                <img
                  src={`${import.meta.env.VITE_API_URL}/uploads/${product.image}`}
                  alt={product.productName}
                  style={{
                    width: "100%",
                    height: "210px",
                    objectFit: "cover",
                  }}
                />
              ) : (
                <div
                  style={{
                    width: "100%",
                    height: "210px",
                    background: "#e8f5e9",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "70px",
                  }}
                >
                  🌾
                </div>
              )}

              {/* ==================================
                  PRODUCT DETAILS
              ================================== */}

              <div style={{ padding: "20px" }}>
                <h2
                  style={{
                    marginTop: 0,
                    color: "#333",
                  }}
                >
                  {product.productName}
                </h2>

                <p>
                  <strong>Category:</strong>{" "}
                  {product.category}
                </p>

                <p
                  style={{
                    fontSize: "20px",
                    fontWeight: "bold",
                    color: "#2E7D32",
                  }}
                >
                  ₹{product.price}
                </p>

                <p>
                  <strong>Available:</strong>{" "}
                  {product.quantity}
                </p>

                <p>
                  <strong>👨‍🌾 Seller:</strong>{" "}
                  {product.seller}
                </p>

                <p>
                  <strong>📍 Location:</strong>{" "}
                  {product.location}
                </p>

                {/* STOCK STATUS */}

                {Number(product.quantity) > 0 ? (
                  <p
                    style={{
                      color: "#2E7D32",
                      fontWeight: "bold",
                    }}
                  >
                    🟢 In Stock
                  </p>
                ) : (
                  <p
                    style={{
                      color: "#D32F2F",
                      fontWeight: "bold",
                    }}
                  >
                    🔴 Out of Stock
                  </p>
                )}

                {/* ADD TO CART */}

                <button
                  onClick={() =>
                    addToCart(product)
                  }
                  disabled={
                    Number(product.quantity) <= 0
                  }
                  style={{
                    width: "100%",
                    padding: "13px",
                    background:
                      Number(product.quantity) > 0
                        ? "#2E7D32"
                        : "#999",
                    color: "white",
                    border: "none",
                    borderRadius: "8px",
                    cursor:
                      Number(product.quantity) > 0
                        ? "pointer"
                        : "not-allowed",
                    fontSize: "16px",
                    fontWeight: "bold",
                  }}
                >
                  {Number(product.quantity) > 0
                    ? "🛒 Add to Cart"
                    : "Out of Stock"}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Marketplace;