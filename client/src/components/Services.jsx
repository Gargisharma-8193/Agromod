import { Link } from "react-router-dom";

function Services() {
  const services = [
    {
      icon: "🌾",
      title: "Crop Price Prediction",
      description:
        "Predict market prices using AI and make smarter selling decisions.",
      path: "/crop-price",
      button: "Predict Price",
    },
    {
      icon: "🌿",
      title: "Disease Detection",
      description:
        "Upload a crop image and use AI to identify possible diseases.",
      path: "/disease-detection",
      button: "Detect Disease",
    },
    {
      icon: "🌱",
      title: "Crop Yield Prediction",
      description:
        "Estimate crop production using machine learning and data.",
      path: "/crop-yield",
      button: "Predict Yield",
    },
    {
      icon: "🏛️",
      title: "Government Schemes",
      description:
        "Discover useful government schemes and benefits available for farmers.",
      path: "/government-schemes",
      button: "Explore Schemes",
    },
    {
      icon: "🛒",
      title: "Agro Marketplace",
      description:
        "Buy and sell agricultural products directly through our marketplace.",
      path: "/marketplace",
      button: "Visit Marketplace",
    },
    {
      icon: "💳",
      title: "Secure Payments",
      description:
        "Complete your agricultural purchases with a simple and secure payment process.",
      path: "/cart",
      button: "Start Shopping",
    },
  ];

  return (
    <section style={styles.section}>

      {/* HEADER */}
      <div style={styles.headingContainer}>
        <div style={styles.badge}>
          🌱 SMART AGRICULTURE
        </div>

        <h2 style={styles.heading}>
          Everything Farmers Need
        </h2>

        <p style={styles.subtitle}>
          From intelligent crop predictions to direct selling,
          AgroMod brings modern technology and agriculture together
          in one powerful platform.
        </p>
      </div>

      {/* SERVICES */}
      <div style={styles.grid}>
        {services.map((service, index) => (
          <Link
            to={service.path}
            key={index}
            style={styles.link}
          >
            <div
              style={styles.card}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform =
                  "translateY(-10px)";

                e.currentTarget.style.boxShadow =
                  "0 20px 45px rgba(46,125,50,0.18)";

                e.currentTarget.style.borderColor =
                  "#66bb6a";

                const arrow =
                  e.currentTarget.querySelector(".service-arrow");

                if (arrow) {
                  arrow.style.transform =
                    "translateX(5px)";
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform =
                  "translateY(0)";

                e.currentTarget.style.boxShadow =
                  "0 8px 25px rgba(46,125,50,0.08)";

                e.currentTarget.style.borderColor =
                  "#e8f5e9";

                const arrow =
                  e.currentTarget.querySelector(".service-arrow");

                if (arrow) {
                  arrow.style.transform =
                    "translateX(0)";
                }
              }}
            >

              {/* ICON */}
              <div style={styles.iconBox}>
                {service.icon}
              </div>

              {/* CONTENT */}
              <div>
                <h3 style={styles.cardTitle}>
                  {service.title}
                </h3>

                <p style={styles.cardDescription}>
                  {service.description}
                </p>
              </div>

              {/* ACTION */}
              <div style={styles.cardBottom}>

                <span style={styles.cardButton}>
                  {service.button}
                </span>

                <span
                  className="service-arrow"
                  style={styles.arrow}
                >
                  →
                </span>

              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* CTA */}
      <div style={styles.cta}>

        <div>
          <div style={styles.ctaSmall}>
            🌾 SMART FARMING
          </div>

          <h2 style={styles.ctaHeading}>
            Ready to grow smarter?
          </h2>

          <p style={styles.ctaText}>
            Use AI-powered tools to make better farming
            decisions and improve productivity.
          </p>
        </div>

        <Link
          to="/dashboard"
          style={styles.ctaButton}
        >
          Explore Dashboard →
        </Link>

      </div>

    </section>
  );
}

const styles = {
  section: {
    padding: "90px 40px",
    background:
      "linear-gradient(180deg, #ffffff 0%, #f3faf4 100%)",
  },

  headingContainer: {
    textAlign: "center",
    maxWidth: "750px",
    margin: "0 auto 55px",
  },

  badge: {
    display: "inline-block",
    padding: "8px 18px",
    borderRadius: "30px",
    background: "#e8f5e9",
    color: "#2e7d32",
    fontWeight: "700",
    fontSize: "13px",
    letterSpacing: "0.5px",
    marginBottom: "16px",
  },

  heading: {
    fontSize: "42px",
    color: "#1b5e20",
    margin: "0 0 15px",
    fontWeight: "800",
  },

  subtitle: {
    fontSize: "17px",
    color: "#666",
    lineHeight: "1.8",
    margin: 0,
  },

  grid: {
    maxWidth: "1100px",
    margin: "auto",
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "28px",
  },

  link: {
    textDecoration: "none",
    color: "inherit",
  },

  card: {
    background: "#ffffff",
    padding: "30px",
    borderRadius: "22px",
    minHeight: "260px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    boxShadow:
      "0 8px 25px rgba(46,125,50,0.08)",
    border: "1px solid #e8f5e9",
    transition:
      "all 0.3s ease",
    cursor: "pointer",
  },

  iconBox: {
    width: "65px",
    height: "65px",
    borderRadius: "18px",
    background:
      "linear-gradient(135deg, #e8f5e9, #d9f0dc)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "32px",
    marginBottom: "22px",
    transition: "0.3s",
  },

  cardTitle: {
    fontSize: "22px",
    color: "#222",
    margin: "0 0 12px",
    fontWeight: "700",
  },

  cardDescription: {
    color: "#666",
    lineHeight: "1.65",
    fontSize: "15px",
    margin: 0,
  },

  cardBottom: {
    marginTop: "25px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },

  cardButton: {
    color: "#2e7d32",
    fontWeight: "700",
    fontSize: "15px",
  },

  arrow: {
    width: "36px",
    height: "36px",
    borderRadius: "50%",
    background: "#2e7d32",
    color: "#ffffff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "19px",
    transition: "transform 0.3s ease",
  },

  cta: {
    maxWidth: "1000px",
    margin: "65px auto 0",
    padding: "38px 42px",
    borderRadius: "24px",
    background:
      "linear-gradient(135deg, #1b5e20, #43a047)",
    color: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "30px",
    flexWrap: "wrap",
    boxShadow:
      "0 15px 35px rgba(46,125,50,0.2)",
  },

  ctaSmall: {
    fontSize: "12px",
    fontWeight: "700",
    letterSpacing: "1px",
    opacity: 0.85,
    marginBottom: "8px",
  },

  ctaHeading: {
    margin: "0 0 8px",
    fontSize: "27px",
  },

  ctaText: {
    margin: 0,
    opacity: 0.9,
    lineHeight: "1.6",
  },

  ctaButton: {
    textDecoration: "none",
    background: "#ffffff",
    color: "#2e7d32",
    padding: "14px 25px",
    borderRadius: "10px",
    fontWeight: "700",
    whiteSpace: "nowrap",
    transition: "0.3s",
  },
};

export default Services;