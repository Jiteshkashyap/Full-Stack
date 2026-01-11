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
import { logout } from "../components/redux/slice/authSlice";

export default function Sidebar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/"); // redirect to login
  };

  return (
    <aside className="fixed left-0 top-0 h-screen w-[260px] bg-slate-900 text-slate-200flex flex-col hidden lg:flex">
      {/* Logo */}
      <div className="px-6 py-5 border-b border-slate-800">
        <h2 className="text-lg text-white font-semibold tracking-wide">
          Delivery Admin
        </h2>
      </div>

      {/* Menu */}
      <nav className="flex-1 py-4 space-y-1">
        <MenuItem to="/dashboard" icon={LayoutDashboard} label="Dashboard" />
        <MenuItem to="/inventory" icon={Package} label="Inventory" />
        <MenuItem to="/users" icon={Users} label="Users" />
        <MenuItem to="/driver" icon={Truck} label="Drivers" />
        <MenuItem to="/order" icon={ShoppingCart} label="Orders" />
      </nav>

      {/* Logout */}
      <button
        onClick={handleLogout}
        className="flex items-center gap-3 px-6 py-4 text-red-400 hover:bg-slate-800"
      >
        <LogOut size={18} />
        Logout
      </button>
    </aside>
  );
}

function MenuItem({ to, icon: Icon, label }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center gap-3 px-6 py-3 text-sm font-medium rounded-md mx-3 transition
         ${
           isActive
             ? "bg-blue-600 text-white"
             : "text-slate-300 hover:bg-slate-800 hover:text-white"
         }`
      }
    >
      <Icon size={18} />
      {label}
    </NavLink>
  );
}
