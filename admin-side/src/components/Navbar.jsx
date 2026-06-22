import {
  Menu,
  Search,
  X,
  LayoutDashboard,
  Package,
  ShoppingBag,
  Users,
  LogOut,
  Settings,
} from "lucide-react";

import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const location = useLocation();
  
  const user =
  JSON.parse(localStorage.getItem("loggedInUser")) || {
    name: "User",
    email: "",
    role: "",
  };

  const logout = () => {
    localStorage.removeItem("loggedInUser");
    navigate("/", { replace: true });
  };

  const navItems = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: <LayoutDashboard size={18} />,
    },
    {
      name: "Inventory",
      path: "/inventory",
      icon: <Package size={18} />,
    },
    {
      name: "Orders",
      path: "/orders",
      icon: <ShoppingBag size={18} />,
    },
    {
      name: "Customers",
      path: "/customers",
      icon: <Users size={18} />,
    },
  ];

  return (
    <>
      {/* NAVBAR */}

      <header className="sticky top-0 z-50 bg-[#f5f4f3]/95 backdrop-blur-md border-b border-gray-200">

        <div className="max-w-7xl mx-auto h-20 px-4 md:px-8 flex items-center justify-between">

          {/* LEFT */}

          <div className="flex items-center gap-4">

            <button
              onClick={() => setDrawerOpen(true)}
              className="p-2 rounded-xl hover:bg-white transition"
            >
              <Menu size={24} />
            </button>

            <h1 className="text-3xl md:text-4xl font-black tracking-tight">
              LUXE
            </h1>

          </div>

          {/* RIGHT */}

          <div className="flex items-center gap-3">

            {/* SEARCH */}

            <div
              className={`overflow-hidden transition-all duration-300 ${
                searchOpen
                  ? "w-64"
                  : "w-0"
              }`}
            >
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) =>
                  setSearchTerm(e.target.value)
                }
                className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2 outline-none"
              />
            </div>

            <button
              onClick={() =>
                setSearchOpen(!searchOpen)
              }
              className="p-2 rounded-xl hover:bg-white transition"
            >
              <Search size={20} />
            </button>

            {/* PROFILE */}

            <button
              onClick={() =>
                setProfileOpen(!profileOpen)
              }
            >
              <div className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center font-bold">
                {user?.name?.charAt(0) || "U"}
              </div>
            </button>

          </div>

        </div>
      </header>

      {/* PROFILE DROPDOWN */}

      {profileOpen && (
        <div className="fixed right-4 top-24 w-80 bg-white rounded-3xl border border-gray-200 shadow-2xl z-50">

          <div className="p-6 border-b">

            <div className="w-16 h-16 rounded-full bg-black text-white flex items-center justify-center text-2xl font-bold mb-4">
              {user?.name?.charAt(0) || "U"}
            </div>

            <h3 className="font-semibold text-lg">
              {user?.name || "User"}
            </h3>

            <p className="text-gray-500 text-sm">
              {user?.email || ""}
            </p>

            <p className="mt-2 text-xs uppercase tracking-wider text-gray-400">
              {user?.role || "User"}
            </p>

          </div>

          <div className="p-4 space-y-2">

            <button className="w-full text-left px-4 py-3 rounded-xl hover:bg-gray-100 flex items-center gap-3">
              <Settings size={18} />
              Settings
            </button>

            <button
              onClick={logout}
              className="w-full bg-black text-white py-3 rounded-xl hover:opacity-90"
            >
              Logout
            </button>

          </div>

        </div>
      )}

      {/* OVERLAY */}

      {drawerOpen && (
        <div
          onClick={() => setDrawerOpen(false)}
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
        />
      )}

      {/* DRAWER */}

      <div
        className={`fixed top-0 left-0 h-screen w-80 bg-white z-50 shadow-2xl transition-transform duration-300 ${
          drawerOpen
            ? "translate-x-0"
            : "-translate-x-full"
        }`}
      >

        <div className="flex justify-between items-center p-6 border-b">

          <h2 className="text-3xl font-black">
            LUXE
          </h2>

          <button
            onClick={() =>
              setDrawerOpen(false)
            }
          >
            <X />
          </button>

        </div>

        <div className="p-6">

          <div className="pb-6 border-b mb-6">

            <h3 className="font-semibold text-lg">
              {user?.name || "User"}
            </h3>

            <p className="text-gray-500 text-sm">
              {user?.email || ""}
            </p>

          </div>

          <div className="space-y-2">

            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                onClick={() =>
                  setDrawerOpen(false)
                }
                className={`flex items-center gap-3 px-4 py-3 rounded-2xl transition ${
                  location.pathname === item.path
                    ? "bg-black text-white"
                    : "hover:bg-gray-100"
                }`}
              >
                {item.icon}
                {item.name}
              </Link>
            ))}

            <button
              onClick={logout}
              className="flex items-center gap-3 px-4 py-3 text-red-500 w-full hover:bg-red-50 rounded-2xl mt-4"
            >
              <LogOut size={18} />
              Logout
            </button>

          </div>

        </div>

      </div>
    </>
  );
}