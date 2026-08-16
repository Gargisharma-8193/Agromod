import { Link } from "react-router-dom";
import diseaseGif from "../assets/images/disease.gif";

function Hero() {
  return (
    <section
      style={{
        minHeight: "88vh",
        padding: "70px 8%",
        background:
          "linear-gradient(135deg, #f1f8e9 0%, #ffffff 55%, #e8f5e9 100%)",
        display: "flex",
        alignItems: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Decorative circles */}
      <div
        style={{
          position: "absolute",
          width: "280px",
          height: "280px",
          borderRadius: "50%",
          background: "rgba(76, 175, 80, 0.08)",
          top: "-100px",
          right: "-80px",
        }}
      />

      <div
        style={{
          position: "absolute",
          width: "180px",
          height: "180px",
          borderRadius: "50%",
          background: "rgba(46, 125, 50, 0.06)",
          bottom: "-70px",
          left: "-50px",
        }}
      />

      <div
        style={{
          width: "100%",
          maxWidth: "1250px",
          margin: "auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "60px",
          flexWrap: "wrap",
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* LEFT CONTENT */}
        <div
          style={{
            flex: "1.1",
            minWidth: "320px",
          }}
        >
          {/* Badge */}
          <div
            style={{
              display: "inline-block",
              padding: "8px 16px",
              background: "#e8f5e9",
              color: "#2E7D32",
              borderRadius: "30px",
              fontWeight: "600",
              fontSize: "14px",
              marginBottom: "20px",
            }}
          >
            🌱 Smart Agriculture • AI Powered
          </div>

          <h1
            style={{
              fontSize: "clamp(42px, 5vw, 68px)",
              lineHeight: "1.1",
              color: "#1B5E20",
              margin: "0 0 22px",
              fontWeight: "800",
            }}
          >
            Grow Smarter.
            <br />
            <span style={{ color: "#43A047" }}>
              Farm Better. 🌾
            </span>
          </h1>

          <p
            style={{
              fontSize: "19px",
              color: "#555",
              lineHeight: "1.8",
              maxWidth: "650px",
              marginBottom: "30px",
            }}
          >
            AgroMod brings modern technology to agriculture.
            Predict crop prices, estimate crop yield, detect
            crop diseases, and buy or sell agricultural products
            — all from one platform.
          </p>

          {/* BUTTONS */}
          <div
            style={{
              display: "flex",
              gap: "15px",
              flexWrap: "wrap",
            }}
          >
            <Link
              to="/dashboard"
              style={{
                textDecoration: "none",
              }}
            >
              <button
                style={{
                  padding: "14px 30px",
                  background: "#2E7D32",
                  color: "white",
                  border: "none",
                  borderRadius: "10px",
                  fontSize: "17px",
                  fontWeight: "600",
                  cursor: "pointer",
                  boxShadow: "0 6px 15px rgba(46,125,50,0.25)",
                }}
              >
                Get Started →
              </button>
            </Link>

            <Link
              to="/marketplace"
              style={{
                textDecoration: "none",
              }}
            >
              <button
                style={{
                  padding: "13px 30px",
                  background: "white",
                  color: "#2E7D32",
                  border: "2px solid #2E7D32",
                  borderRadius: "10px",
                  fontSize: "17px",
                  fontWeight: "600",
                  cursor: "pointer",
                }}
              >
                🛒 Explore Marketplace
              </button>
            </Link>
          </div>

          {/* HIGHLIGHTS */}
          <div
            style={{
              display: "flex",
              gap: "35px",
              marginTop: "45px",
              flexWrap: "wrap",
            }}
          >
            <div>
              <h3
                style={{
                  margin: 0,
                  color: "#2E7D32",
                  fontSize: "26px",
                }}
              >
                🤖 AI
              </h3>
              <p
                style={{
                  margin: "5px 0 0",
                  color: "#666",
                  fontSize: "14px",
                }}
              >
                Smart Predictions
              </p>
            </div>

            <div>
              <h3
                style={{
                  margin: 0,
                  color: "#2E7D32",
                  fontSize: "26px",
                }}
              >
                🌾 24/7
              </h3>
              <p
                style={{
                  margin: "5px 0 0",
                  color: "#666",
                  fontSize: "14px",
                }}
              >
                Agricultural Support
              </p>
            </div>

            <div>
              <h3
                style={{
                  margin: 0,
                  color: "#2E7D32",
                  fontSize: "26px",
                }}
              >
                🛒 Easy
              </h3>
              <p
                style={{
                  margin: "5px 0 0",
                  color: "#666",
                  fontSize: "14px",
                }}
              >
                Buy & Sell
              </p>
            </div>
          </div>
        </div>

        {/* RIGHT IMAGE */}
        <div
          style={{
            flex: "0.9",
            minWidth: "320px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              position: "relative",
              background: "white",
              padding: "15px",
              borderRadius: "25px",
              boxShadow: "0 20px 50px rgba(46,125,50,0.18)",
              maxWidth: "520px",
              width: "100%",
            }}
          >
            <img
              src={diseaseGif}
              alt="AgroMod Smart Agriculture"
              style={{
                width: "100%",
                height: "430px",
                objectFit: "cover",
                borderRadius: "18px",
                display: "block",
              }}
            />

            {/* Floating card */}
            <div
              style={{
                position: "absolute",
                bottom: "35px",
                left: "-25px",
                background: "white",
                padding: "15px 20px",
                borderRadius: "12px",
                boxShadow: "0 8px 25px rgba(0,0,0,0.15)",
              }}
            >
              <strong
                style={{
                  color: "#2E7D32",
                  fontSize: "15px",
                }}
              >
                🌱 Smart Farming
              </strong>

              <p
                style={{
                  margin: "5px 0 0",
                  color: "#666",
                  fontSize: "13px",
                }}
              >
                Powered by Technology
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;