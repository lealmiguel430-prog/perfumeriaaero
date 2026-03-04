import { HashRouter as Router, Routes, Route, Navigate, Outlet } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import Home from "@/pages/Home";
import Shop from "@/pages/Shop";
import Cart from "@/pages/Cart";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import ProductDetail from "@/pages/ProductDetail";

// Admin Imports
import AdminLayout from "@/layouts/AdminLayout";
import AdminLogin from "@/pages/admin/Login";
import AdminDashboard from "@/pages/admin/Dashboard";
import AdminProducts from "@/pages/admin/Products";
import AdminCustomers from "@/pages/admin/Customers";
import AdminOrders from "@/pages/admin/Orders";
import AdminCategories from "@/pages/admin/Categories";
import AdminPlaceholder from "@/pages/admin/Placeholder";
import Checkout from "@/pages/Checkout";
import Profile from "@/pages/Profile";
import { useAuthStore } from "@/store/authStore";

// Protected Route Component
const ProtectedAdminRoute = () => {
  const { user, isAuthenticated } = useAuthStore();
  // Check if authenticated and is admin
  if (!isAuthenticated || user?.role !== 'admin') {
    return <Navigate to="/admin/login" replace />;
  }
  return <Outlet />;
};

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/mujer" element={<Shop category="mujer" />} />
          <Route path="/hombre" element={<Shop category="hombre" />} />
          <Route path="/producto/:id" element={<ProductDetail />} />
          <Route path="/carrito" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/tienda" element={<Shop category="mujer" />} /> 
        </Route>

        {/* Admin Routes */}
        <Route path="/admin/login" element={<AdminLogin />} />
        
        <Route element={<ProtectedAdminRoute />}>
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Navigate to="/admin/dashboard" replace />} />
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="products" element={<AdminProducts />} />
            <Route path="categories" element={<AdminCategories />} />
            <Route path="orders" element={<AdminOrders />} />
            <Route path="customers" element={<AdminCustomers />} />
            <Route path="inventory" element={<AdminPlaceholder title="Inventario" />} />
            <Route path="settings" element={<AdminPlaceholder title="Configuración" />} />
          </Route>
        </Route>

        {/* 404 */}
        <Route path="*" element={<div className="min-h-screen bg-[#0B0B0B] text-gold flex items-center justify-center">Página no encontrada</div>} />
      </Routes>
    </Router>
  );
}
