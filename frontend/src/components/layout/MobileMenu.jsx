import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  Truck,
  LogOut,
} from "lucide-react";
import { logout } from "../redux/slice/authSlice";

export default function MobileMenu({ onClose }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
    onClose?.(); // close mobile menu if exists
  };

  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 rounded-md text-sm font-medium
     ${
       isActive
         ? "bg-blue-600 text-white"
         : "text-gray-700 hover:bg-gray-100"
     }`;

  return (
    <div className="bg-white p-4 space-y-2">
      <NavLink to="/dashboard" className={linkClass} onClick={onClose}>
        <LayoutDashboard size={18} />
        Dashboard
      </NavLink>

      <NavLink to="/inventory" className={linkClass} onClick={onClose}>
        <Package size={18} />
        Inventory
      </NavLink>

      <NavLink to="/users" className={linkClass} onClick={onClose}>
        <Users size={18} />
        Users
      </NavLink>

      <NavLink to="/driver" className={linkClass} onClick={onClose}>
        <Truck size={18} />
        Drivers
      </NavLink>

      <NavLink to="/order" className={linkClass} onClick={onClose}>
        <ShoppingCart size={18} />
        Orders
      </NavLink>

      {/* 🔴 Logout Button */}
      <button
        onClick={handleLogout}
        className="flex items-center gap-3 px-4 py-3 rounded-md text-sm font-medium text-red-600 hover:bg-red-50 w-full"
      >
        <LogOut size={18} />
        Logout
      </button>
    </div>
  );
}
