import {
  LayoutDashboard,
  Package,
  Truck,
  Users,
} from "lucide-react";

import { Link, useLocation } from "react-router-dom";

export default function BottomNav() {
  const location = useLocation();

  const navItems = [
    {
      icon: LayoutDashboard,
      path: "/dashboard",
      label: "Dashboard",
    },
    {
      icon: Package,
      path: "/inventory",
      label: "Inventory",
    },
    {
      icon: Truck,
      path: "/orders",
      label: "Orders",
    },
    {
      icon: Users,
      path: "/customers",
      label: "Customers",
    },
  ];

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 px-2 py-2">

      <div className="flex justify-around items-center">

        {navItems.map((item) => {
          const Icon = item.icon;

          const active =
            location.pathname === item.path;

          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center justify-center px-4 py-2 rounded-2xl transition-all duration-200 ${
                active
                  ? "bg-black text-white"
                  : "text-gray-500 hover:bg-gray-100"
              }`}
            >
              <Icon size={20} />

              <span className="text-[11px] mt-1 font-medium">
                {item.label}
              </span>
            </Link>
          );
        })}

      </div>

    </div>
  );
}