import { useState } from "react";
import Navbar from "../components/Navbar";
import BottomNav from "../components/BottomNav";

export default function Orders() {
  const [activeTab, setActiveTab] = useState("ALL ORDERS");
  const [search, setSearch] = useState("");

  const [orders, setOrders] = useState([
    {
      id: "LX-89021",
      customer: "Julianne Moore",
      date: "Oct 24, 2023",
      items: 2,
      total: 1240,
      status: "SHIPPED",
    },
    {
      id: "LX-89020",
      customer: "Alexander Wang",
      date: "Oct 24, 2023",
      items: 1,
      total: 450,
      status: "PROCESSING",
    },
    {
      id: "LX-89019",
      customer: "Sienna Miller",
      date: "Oct 23, 2023",
      items: 5,
      total: 3890,
      status: "DELIVERED",
    },
    {
      id: "LX-89018",
      customer: "David Gandy",
      date: "Oct 23, 2023",
      items: 1,
      total: 820,
      status: "SHIPPED",
    },
    {
      id: "LX-89017",
      customer: "Adut Akech",
      date: "Oct 22, 2023",
      items: 3,
      total: 2100,
      status: "PROCESSING",
    },
    {
      id: "LX-89016",
      customer: "Chris Evans",
      date: "Oct 21, 2023",
      items: 2,
      total: 1750,
      status: "DELIVERED",
    },
  ]);

  const updateStatus = (id, newStatus) => {
    setOrders(
      orders.map((order) =>
        order.id === id
          ? { ...order, status: newStatus }
          : order
      )
    );
  };

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.customer
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      order.id
        .toLowerCase()
        .includes(search.toLowerCase());

    const matchesTab =
      activeTab === "ALL ORDERS"
        ? true
        : order.status === activeTab;

    return matchesSearch && matchesTab;
  });

  const processingCount = orders.filter(
    (o) => o.status === "PROCESSING"
  ).length;

  const shippedCount = orders.filter(
    (o) => o.status === "SHIPPED"
  ).length;

  const deliveredCount = orders.filter(
    (o) => o.status === "DELIVERED"
  ).length;

  const statusStyle = (status) => {
    switch (status) {
      case "PROCESSING":
        return "border-black text-black";

      case "SHIPPED":
        return "border-green-600 text-green-600";

      case "DELIVERED":
        return "border-gray-400 text-gray-500";

      default:
        return "border-gray-300";
    }
  };

  return (
    <div className="bg-[#f5f4f3] min-h-screen pb-24">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 md:px-8 py-8">
        {/* Header */}

        <div className="mb-10">
          <p className="uppercase tracking-[4px] text-xs text-gray-500">
            Orders
          </p>

          <h1 className="text-5xl md:text-6xl font-light mt-2">
            Orders
          </h1>

          <p className="text-gray-500 mt-3 text-lg">
            Managing {orders.length} active transactions
          </p>
        </div>

        {/* Stats */}

        <div className="grid md:grid-cols-3 gap-5 mb-8">
          <div className="bg-white rounded-3xl border p-8">
            <p className="uppercase tracking-[4px] text-xs text-gray-500">
              Processing
            </p>

            <h2 className="text-5xl font-light mt-4">
              {processingCount}
            </h2>
          </div>

          <div className="bg-white rounded-3xl border p-8">
            <p className="uppercase tracking-[4px] text-xs text-gray-500">
              Shipped
            </p>

            <h2 className="text-5xl font-light mt-4">
              {shippedCount}
            </h2>
          </div>

          <div className="bg-white rounded-3xl border p-8">
            <p className="uppercase tracking-[4px] text-xs text-gray-500">
              Delivered
            </p>

            <h2 className="text-5xl font-light mt-4">
              {deliveredCount}
            </h2>
          </div>
        </div>

        {/* Search */}

        <div className="bg-white border rounded-2xl p-4 mb-6">
          <input
            type="text"
            placeholder="SEARCH ORDER ID OR CUSTOMER..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            className="w-full outline-none bg-transparent"
          />
        </div>

        {/* Tabs */}

        <div className="flex gap-3 overflow-auto mb-8">
          {[
            "ALL ORDERS",
            "PROCESSING",
            "SHIPPED",
            "DELIVERED",
          ].map((tab) => (
            <button
              key={tab}
              onClick={() =>
                setActiveTab(tab)
              }
              className={`px-6 py-3 border rounded-xl whitespace-nowrap transition ${
                activeTab === tab
                  ? "bg-black text-white"
                  : "bg-white"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Orders List */}

        <div className="space-y-5">
          {filteredOrders.map((order) => (
            <div
              key={order.id}
              className="bg-white border rounded-3xl p-6"
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                <div>
                  <p className="text-gray-500 tracking-[2px]">
                    #{order.id}
                  </p>

                  <h2 className="text-3xl font-medium mt-2">
                    {order.customer}
                  </h2>

                  <p className="text-gray-500 mt-4">
                    {order.date}
                  </p>

                  <p className="text-gray-500">
                    {order.items} Item
                    {order.items > 1 ? "s" : ""}
                  </p>
                </div>

                <div className="flex flex-col items-start md:items-end gap-4">
                  <select
                    value={order.status}
                    onChange={(e) =>
                      updateStatus(
                        order.id,
                        e.target.value
                      )
                    }
                    className={`border px-4 py-2 tracking-[2px] font-medium bg-white ${statusStyle(
                      order.status
                    )}`}
                  >
                    <option value="PROCESSING">
                      PROCESSING
                    </option>

                    <option value="SHIPPED">
                      SHIPPED
                    </option>

                    <option value="DELIVERED">
                      DELIVERED
                    </option>
                  </select>

                  <h3 className="text-4xl font-light">
                    $
                    {order.total.toLocaleString()}
                    .00
                  </h3>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More */}

        <button
          className="w-full bg-black text-white py-6 mt-8 rounded-2xl tracking-[3px] hover:opacity-90 transition"
        >
          LOAD MORE ARCHIVE
        </button>
      </main>

      <BottomNav />
    </div>
  );
}
