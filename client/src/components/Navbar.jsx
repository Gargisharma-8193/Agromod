import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav
      style={{
        width: "100%",
        background: "#2E7D32",
        padding: "0 40px",
        boxSizing: "border-box",
        position: "sticky",
        top: 0,
        zIndex: 1000,
        boxShadow: "0 2px 10px rgba(0,0,0,0.12)",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "auto",
          minHeight: "72px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "30px",
        }}
      >
        {/* Logo */}
        <Link
          to="/"
          style={{
            textDecoration: "none",
            color: "white",
            display: "flex",
            alignItems: "center",
            gap: "10px",
            flexShrink: 0,
          }}
        >
          <span style={{ fontSize: "32px" }}>🌾</span>

          <span
            style={{
              fontSize: "25px",
              fontWeight: "700",
              letterSpacing: "0.5px",
            }}
          >
            AgroMod
          </span>
        </Link>

        {/* Navigation */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "28px",
            flexWrap: "wrap",
            justifyContent: "flex-end",
          }}
        >
          <NavLink to="/">Home</NavLink>

          <NavLink to="/crop-price">
            Crop Price
          </NavLink>

          <NavLink to="/crop-yield">
            Crop Yield
          </NavLink>

          <NavLink to="/dashboard">
            Dashboard
          </NavLink>

          <NavLink to="/marketplace">
            Marketplace
          </NavLink>

          <NavLink to="/cart">
            🛒 Cart
          </NavLink>

          <NavLink to="/orders">
            📦 Orders
          </NavLink>

          <Link
            to="/login"
            style={{
              background: "white",
              color: "#2E7D32",
              padding: "9px 18px",
              borderRadius: "7px",
              textDecoration: "none",
              fontWeight: "600",
            }}
          >
            Login
          </Link>
        </div>
      </div>
    </nav>
  );
}

function NavLink({ to, children }) {
  return (
    <Link
      to={to}
      style={{
        color: "white",
        textDecoration: "none",
        fontSize: "16px",
        fontWeight: "500",
        whiteSpace: "nowrap",
      }}
    >
      {children}
    </Link>
  );
}

export default Navbar;