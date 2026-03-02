import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import Home from "@/pages/Home";
import Shop from "@/pages/Shop";
import Cart from "@/pages/Cart";
import Login from "@/pages/Login";
import Register from "@/pages/Register";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/mujer" element={<Shop category="mujer" />} />
          <Route path="/hombre" element={<Shop category="hombre" />} />
          <Route path="/producto/:id" element={<ProductDetail />} />
          <Route path="/carrito" element={<Cart />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          {/* Fallback/Other routes */}
          <Route path="/tienda" element={<Shop category="mujer" />} /> 
          <Route path="*" element={<div className="min-h-screen bg-[#0B0B0B] text-gold flex items-center justify-center">Página no encontrada</div>} />
        </Route>
      </Routes>
    </Router>
  );
}
