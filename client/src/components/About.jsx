function About() {
  const features = [
    {
      icon: "🌾",
      title: "Smart Farming",
      text: "AI-driven farming solutions designed to improve productivity and decision-making.",
    },
    {
      icon: "📊",
      title: "Accurate Predictions",
      text: "Machine learning helps farmers understand crop prices, yields, and future trends.",
    },
    {
      icon: "🤝",
      title: "Farmer Support",
      text: "Connecting farmers with buyers, useful resources, and technology.",
    },
  ];

  return (
    <section
      style={{
        padding: "90px 40px",
        background: "#f8fcf8",
      }}
    >
      {/* Heading */}
      <div
        style={{
          maxWidth: "850px",
          margin: "0 auto",
          textAlign: "center",
        }}
      >
        <div
          style={{
            display: "inline-block",
            padding: "8px 18px",
            background: "#e8f5e9",
            color: "#2E7D32",
            borderRadius: "30px",
            fontSize: "14px",
            fontWeight: "600",
            marginBottom: "18px",
          }}
        >
          🌱 ABOUT AGROMOD
        </div>

        <h2
          style={{
            fontSize: "42px",
            color: "#1B5E20",
            margin: "0 0 20px",
            fontWeight: "700",
          }}
        >
          Technology That Grows With Farmers
        </h2>

        <p
          style={{
            fontSize: "18px",
            lineHeight: "1.8",
            color: "#555",
            margin: 0,
          }}
        >
          AgroMod is an AI-powered smart agriculture platform designed
          to make farming more efficient, profitable, and sustainable.
          We bring intelligent predictions, agricultural insights,
          and a direct marketplace together in one platform.
        </p>
      </div>

      {/* Main Feature Area */}
      <div
        style={{
          maxWidth: "1100px",
          margin: "60px auto 0",
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "28px",
        }}
      >
        {features.map((feature, index) => (
          <div
            key={index}
            style={{
              background: "white",
              borderRadius: "20px",
              padding: "35px 30px",
              textAlign: "center",
              border: "1px solid #e2eee3",
              boxShadow:
                "0 8px 25px rgba(46,125,50,0.08)",
              transition:
                "transform 0.3s ease, box-shadow 0.3s ease",
              cursor: "pointer",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform =
                "translateY(-10px)";
              e.currentTarget.style.boxShadow =
                "0 18px 35px rgba(46,125,50,0.18)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform =
                "translateY(0)";
              e.currentTarget.style.boxShadow =
                "0 8px 25px rgba(46,125,50,0.08)";
            }}
          >
            {/* Icon */}
            <div
              style={{
                width: "75px",
                height: "75px",
                margin: "0 auto 22px",
                borderRadius: "20px",
                background: "#e8f5e9",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "38px",
              }}
            >
              {feature.icon}
            </div>

            <h3
              style={{
                color: "#2E7D32",
                fontSize: "23px",
                margin: "0 0 15px",
              }}
            >
              {feature.title}
            </h3>

            <p
              style={{
                color: "#666",
                fontSize: "15px",
                lineHeight: "1.7",
                margin: 0,
              }}
            >
              {feature.text}
            </p>
          </div>
        ))}
      </div>

      {/* Bottom Highlight */}
      <div
        style={{
          maxWidth: "1050px",
          margin: "65px auto 0",
          background:
            "linear-gradient(135deg, #1B5E20, #43A047)",
          borderRadius: "22px",
          padding: "35px 45px",
          color: "white",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "30px",
          flexWrap: "wrap",
          boxShadow:
            "0 12px 30px rgba(46,125,50,0.2)",
        }}
      >
        <div>
          <h3
            style={{
              margin: "0 0 8px",
              fontSize: "25px",
            }}
          >
            🌍 Building a smarter future for agriculture
          </h3>

          <p
            style={{
              margin: 0,
              opacity: 0.9,
              lineHeight: "1.6",
            }}
          >
            Technology, data and farmers working together
            for a better tomorrow.
          </p>
        </div>

        <div
          style={{
            fontSize: "42px",
            whiteSpace: "nowrap",
          }}
        >
          🌾 🌱 🚜
        </div>
      </div>
    </section>
  );
}

export default About;