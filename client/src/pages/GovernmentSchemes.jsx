import { useState } from "react";

function GovernmentSchemes() {
  const [search, setSearch] = useState("");

  const schemes = [
    {
      icon: "🌾",
      title: "PM-KISAN",
      category: "Financial Support",
      description:
        "Financial assistance for eligible farmer families to support agricultural and household needs.",
      link: "https://pmkisan.gov.in/",
    },
    {
      icon: "🛡️",
      title: "Pradhan Mantri Fasal Bima Yojana",
      category: "Crop Insurance",
      description:
        "Crop insurance support to help farmers manage financial losses caused by crop damage.",
      link: "https://pmfby.gov.in/",
    },
    {
      icon: "💧",
      title: "Pradhan Mantri Krishi Sinchayee Yojana",
      category: "Irrigation",
      description:
        "Promotes efficient irrigation and better water management for agriculture.",
      link: "https://pmksy.gov.in/",
    },
    {
      icon: "🌱",
      title: "Soil Health Card",
      category: "Soil & Farming",
      description:
        "Provides information about soil health and recommendations for appropriate fertilizers.",
      link: "https://soilhealth.dac.gov.in/",
    },
    {
      icon: "🏦",
      title: "Kisan Credit Card",
      category: "Agricultural Credit",
      description:
        "Provides farmers access to credit for agricultural activities and related needs.",
      link: "https://www.myscheme.gov.in/",
    },
    {
      icon: "📋",
      title: "myScheme",
      category: "Government Schemes",
      description:
        "Find government schemes and check which benefits may be applicable to you.",
      link: "https://www.myscheme.gov.in/",
    },
  ];

  const filteredSchemes = schemes.filter(
    (scheme) =>
      scheme.title
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      scheme.category
        .toLowerCase()
        .includes(search.toLowerCase())
  );

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f5faf5",
        padding: "50px 30px",
      }}
    >
      <div
        style={{
          maxWidth: "1100px",
          margin: "auto",
        }}
      >
        {/* Heading */}
        <div
          style={{
            textAlign: "center",
            marginBottom: "40px",
          }}
        >
          <div
            style={{
              display: "inline-block",
              background: "#e8f5e9",
              color: "#2E7D32",
              padding: "8px 18px",
              borderRadius: "30px",
              fontWeight: "600",
              fontSize: "14px",
            }}
          >
            🏛️ FARMER BENEFITS
          </div>

          <h1
            style={{
              color: "#1B5E20",
              fontSize: "42px",
              margin: "18px 0 10px",
            }}
          >
            Government Schemes for Farmers
          </h1>

          <p
            style={{
              color: "#666",
              fontSize: "17px",
              maxWidth: "700px",
              margin: "auto",
              lineHeight: "1.7",
            }}
          >
            Explore government initiatives, financial assistance,
            insurance, irrigation and other agricultural support
            available for farmers.
          </p>
        </div>

        {/* Search */}
        <div
          style={{
            maxWidth: "600px",
            margin: "0 auto 45px",
          }}
        >
          <input
            type="text"
            placeholder="🔍 Search schemes..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              width: "100%",
              padding: "15px 20px",
              border: "1px solid #c8e6c9",
              borderRadius: "12px",
              fontSize: "16px",
              outline: "none",
              boxSizing: "border-box",
              background: "white",
            }}
          />
        </div>

        {/* Cards */}
        {filteredSchemes.length === 0 ? (
          <div
            style={{
              background: "white",
              padding: "50px",
              borderRadius: "18px",
              textAlign: "center",
            }}
          >
            <h2>No schemes found</h2>
            <p>Try searching with another keyword.</p>
          </div>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit, minmax(300px, 1fr))",
              gap: "25px",
            }}
          >
            {filteredSchemes.map((scheme, index) => (
              <div
                key={index}
                style={{
                  background: "white",
                  padding: "30px",
                  borderRadius: "20px",
                  border: "1px solid #e1eee2",
                  boxShadow:
                    "0 8px 25px rgba(46,125,50,0.08)",
                  transition:
                    "transform 0.3s ease, box-shadow 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform =
                    "translateY(-8px)";
                  e.currentTarget.style.boxShadow =
                    "0 18px 35px rgba(46,125,50,0.16)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform =
                    "translateY(0)";
                  e.currentTarget.style.boxShadow =
                    "0 8px 25px rgba(46,125,50,0.08)";
                }}
              >
                <div
                  style={{
                    width: "60px",
                    height: "60px",
                    borderRadius: "16px",
                    background: "#e8f5e9",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "30px",
                    marginBottom: "20px",
                  }}
                >
                  {scheme.icon}
                </div>

                <span
                  style={{
                    color: "#2E7D32",
                    fontSize: "13px",
                    fontWeight: "600",
                  }}
                >
                  {scheme.category}
                </span>

                <h2
                  style={{
                    margin: "10px 0",
                    color: "#222",
                    fontSize: "21px",
                  }}
                >
                  {scheme.title}
                </h2>

                <p
                  style={{
                    color: "#666",
                    lineHeight: "1.6",
                    minHeight: "75px",
                  }}
                >
                  {scheme.description}
                </p>

                <a
                  href={scheme.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "inline-block",
                    marginTop: "15px",
                    padding: "11px 18px",
                    background: "#2E7D32",
                    color: "white",
                    textDecoration: "none",
                    borderRadius: "8px",
                    fontWeight: "600",
                  }}
                >
                  Visit Official Website →
                </a>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default GovernmentSchemes;