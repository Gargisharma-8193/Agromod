import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CropPrice from "./pages/CropPrice";
import CropYield from "./pages/CropYield";
import Dashboard from "./pages/Dashboard";
import Marketplace from "./pages/Marketplace";
import AddProduct from "./pages/AddProduct";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Orders from "./pages/Orders";
import MyOrders from "./pages/MyOrders";
import FarmerOrders from "./pages/FarmerOrders";
import ManageProducts from "./pages/ManageProducts";
import GovernmentSchemes from "./pages/GovernmentSchemes";
import DiseaseDetection from "./pages/DiseaseDetection";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Home */}
        <Route path="/" element={<Home />} />

        {/* Authentication */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* ML Features */}
        <Route path="/crop-price" element={<CropPrice />} />
        <Route path="/crop-yield" element={<CropYield />} />

        {/* Dashboard */}
        <Route path="/dashboard" element={<Dashboard />} />

        {/* Marketplace */}
        <Route path="/marketplace" element={<Marketplace />} />
        <Route path="/add-product" element={<AddProduct />} />
        <Route path="/manage-products" element={<ManageProducts />} />

        {/* Cart & Payment */}
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />

        {/* Orders */}
        <Route path="/orders" element={<Orders />} />
        <Route path="/my-orders" element={<MyOrders />} />
        <Route path="/farmer-orders" element={<FarmerOrders />} />
        <Route
  path="/government-schemes"
  element={<GovernmentSchemes />}
/>
<Route
  path="/disease-detection"
  element={<DiseaseDetection />}
/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;