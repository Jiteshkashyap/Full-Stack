import { useState } from "react";
import Sidebar from "../SideBar";
import MobileMenu from "./MobileMenu";
import { Outlet } from "react-router-dom";
import { Menu, X } from "lucide-react";

export default function AdminLayout() {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* ===== DESKTOP SIDEBAR ===== */}
      <aside className="hidden lg:block fixed left-0 top-0 h-screen w-[260px]">
        <Sidebar />
      </aside>

      {/* ===== MOBILE OVERLAY ===== */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* ===== MOBILE MENU ===== */}
      {open && (
        <div className="fixed top-0 left-0 w-full z-50 lg:hidden">
          <div className="flex items-center justify-between px-4 py-3 bg-white shadow">
            <span className="font-semibold">Menu</span>
            <button onClick={() => setOpen(false)}>
              <X size={22} />
            </button>
          </div>

          <MobileMenu onClose={() => setOpen(false)} />
        </div>
      )}

      {/* ===== MAIN CONTENT ===== */}
      <div className="flex-1 lg:ml-[260px]">
        {/* MOBILE HEADER */}
        <header className="lg:hidden bg-white shadow px-4 py-3 flex items-center">
          <button
            onClick={() => setOpen(true)}
            className="p-2 rounded hover:bg-gray-100"
          >
            <Menu size={22} />
          </button>

          <h1 className="ml-3 font-semibold text-gray-700">
            Admin Panel
          </h1>
        </header>

        <main className="p-4 sm:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
