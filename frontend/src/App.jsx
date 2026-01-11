import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Inventory from "./pages/Inventory";
import Orders from "./pages/Order";
import AdminLayout from "./components/layout/AdminLayout";
import Users from "./pages/Users";
import LiveDrivers from "./pages/Driver";

import "./App.css";

export default function App() {
  const { isAuthenticated } = useSelector((state) => state.auth);

  return (
    <BrowserRouter>
      <Routes>
        {/* ---------------- PUBLIC ROUTE ---------------- */}
        <Route
          path="/"
          element={
            isAuthenticated ? (
              <Navigate to="/dashboard" />
            ) : (
              <Login />
            )
          }
        />

        {/* ---------------- PROTECTED ADMIN ROUTES ---------------- */}
        <Route
          element={
            isAuthenticated ? (
              <AdminLayout />
            ) : (
              <Navigate to="/" />
            )
          }
        >
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/order" element={<Orders />} />
          <Route path="/driver" element={<LiveDrivers />} />
          <Route path="/users" element={<Users />} />

          {/* You can add these later */}
          {/* <Route path="/users" element={<Users />} /> */}
          {/* <Route path="/drivers" element={<Drivers />} /> */}
          {/* <Route path="/orders" element={<Orders />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
