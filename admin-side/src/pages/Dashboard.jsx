import { useState } from "react";
import Navbar from "../components/Navbar";
import BottomNav from "../components/BottomNav";

export default function Dashboard() {
  const [period, setPeriod] = useState("7D");
  const [showAll, setShowAll] = useState(false);
  const [showInsights, setShowInsights] = useState(false);

  const chart7D = [40, 60, 55, 90, 70, 120, 95];
  const chart1M = [30, 85, 50, 110, 75, 130, 60];

  const chartData = period === "7D" ? chart7D : chart1M;

  const activities = [
    {
      image:
        "https://images.unsplash.com/photo-1523170335258-f5ed11844a49",
      title: "Order #8429 - Watch For Men",
      time: "Processed 2 mins ago",
    },
    {
      image:
        "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
      title: "Inventory Alert - Red Runner",
      time: "Low Stock (2 units left)",
    },
    {
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
      title: "New Customer - Elena V.",
      time: "Joined 15 mins ago",
    },
    {
      image:
        "https://images.unsplash.com/photo-1523275335684-37898b6baf30",
      title: "Order #8401 Completed",
      time: "1 hour ago",
    },
    {
      image:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e",
      title: "New Customer - James Carter",
      time: "Today",
    },
  ];

  return (
    <div className="bg-[#f5f4f3] min-h-screen pb-24">
      <Navbar />

      <main className="max-w-[1280px] mx-auto px-4 md:px-8 py-8">

        <p className="uppercase tracking-[4px] text-xs text-gray-500">
          Overview
        </p>

        <h1 className="text-4xl md:text-6xl font-light mt-2 mb-10">
          Performance Dashboard
        </h1>

        {/* Revenue */}

        <div className="bg-white border border-gray-200 rounded-3xl p-8 md:p-12 shadow-sm mb-6">

          <p className="uppercase tracking-[4px] text-xs text-gray-500">
            Total Revenue
          </p>

          <h2 className="text-6xl md:text-8xl font-light mt-5">
            $124,500
          </h2>

          <p className="text-green-600 font-medium mt-10">
            ↗ +12.4% vs last month
          </p>

        </div>

        {/* Stats */}

        <div className="grid md:grid-cols-2 gap-6 mb-6">

          <div className="bg-white border border-gray-200 rounded-3xl p-8 shadow-sm">

            <p className="uppercase tracking-[4px] text-xs text-gray-500">
              Active Orders
            </p>

            <h3 className="text-5xl mt-4 font-light">
              42 Units
            </h3>

          </div>

          <div className="bg-white border border-gray-200 rounded-3xl p-8 shadow-sm">

            <p className="uppercase tracking-[4px] text-xs text-gray-500">
              New Customers
            </p>

            <h3 className="text-5xl mt-4 font-light">
              12 Daily
            </h3>

          </div>

        </div>

        {/* Chart */}

        <div className="bg-white border border-gray-200 rounded-3xl p-8 shadow-sm mb-6">

          <div className="flex justify-between items-center">

            <div>
              <h3 className="uppercase tracking-[4px] text-xs">
                Sales Overview
              </h3>

              <p className="text-gray-500 mt-1">
                Weekly growth trajectory
              </p>
            </div>

            <div className="flex gap-2">

              <button
                onClick={() => setPeriod("7D")}
                className={`px-5 py-2 rounded-xl transition ${
                  period === "7D"
                    ? "bg-black text-white"
                    : "bg-gray-100"
                }`}
              >
                7D
              </button>

              <button
                onClick={() => setPeriod("1M")}
                className={`px-5 py-2 rounded-xl transition ${
                  period === "1M"
                    ? "bg-black text-white"
                    : "bg-gray-100"
                }`}
              >
                1M
              </button>

            </div>

          </div>

          <div className="mt-10">

            <div className="h-64 flex items-end justify-between border-l border-b border-gray-300 px-3 pb-3">

              {chartData.map((value, index) => (
                <div
                  key={index}
                  className="bg-black rounded-t-md w-8 md:w-12 transition-all duration-500"
                  style={{
                    height: `${value * 1.5}px`,
                  }}
                />
              ))}

            </div>

            <div className="flex justify-between mt-4 text-xs uppercase tracking-[3px] text-gray-500">

              {period === "7D" ? (
                <>
                  <span>Mon</span>
                  <span>Tue</span>
                  <span>Wed</span>
                  <span>Thu</span>
                  <span>Fri</span>
                  <span>Sat</span>
                  <span>Sun</span>
                </>
              ) : (
                <>
                  <span>W1</span>
                  <span>W2</span>
                  <span>W3</span>
                  <span>W4</span>
                  <span>W5</span>
                  <span>W6</span>
                  <span>W7</span>
                </>
              )}

            </div>

          </div>

        </div>

        {/* Activity */}

        <div className="flex justify-between items-center mb-4">

          <h3 className="uppercase tracking-[4px]">
            Recent Activity
          </h3>

          <button
            onClick={() => setShowAll(!showAll)}
            className="underline"
          >
            {showAll ? "Show Less" : "View All"}
          </button>

        </div>

        <div className="bg-white border border-gray-200 rounded-3xl overflow-hidden shadow-sm">

          {(showAll
            ? activities
            : activities.slice(0, 3)
          ).map((item, index) => (
            <div
              key={index}
              className="flex items-center gap-4 p-5 border-b border-gray-100"
            >

              <img
                src={item.image}
                alt=""
                className="w-14 h-14 rounded-xl object-cover"
              />

              <div>
                <h4 className="font-medium">
                  {item.title}
                </h4>

                <p className="text-sm text-gray-500">
                  {item.time}
                </p>
              </div>

            </div>
          ))}

        </div>

        {/* Insights */}

        <div className="bg-black text-white rounded-3xl p-10 mt-8">

          <h3 className="text-3xl md:text-5xl leading-tight font-light">
            Your store performance is in the top 5%
            of fashion retailers this month.
          </h3>

          <p className="text-gray-400 mt-5 max-w-xl">
            Leverage this momentum by launching your
            next seasonal collection early.
          </p>

          <button
            onClick={() => setShowInsights(!showInsights)}
            className="bg-white text-black px-8 py-4 rounded-xl mt-8 font-medium"
          >
            {showInsights
              ? "HIDE INSIGHTS"
              : "VIEW INSIGHTS"}
          </button>

          {showInsights && (

            <div className="grid md:grid-cols-3 gap-4 mt-8">

              <div className="bg-white text-black rounded-2xl p-5">
                <p className="text-xs uppercase tracking-[3px] text-gray-500">
                  Revenue Growth
                </p>

                <h4 className="text-3xl mt-3">
                  +12.4%
                </h4>
              </div>

              <div className="bg-white text-black rounded-2xl p-5">
                <p className="text-xs uppercase tracking-[3px] text-gray-500">
                  Best Seller
                </p>

                <h4 className="text-2xl mt-3">
                  Watch For Men
                </h4>
              </div>

              <div className="bg-white text-black rounded-2xl p-5">
                <p className="text-xs uppercase tracking-[3px] text-gray-500">
                  Customer Retention
                </p>

                <h4 className="text-3xl mt-3">
                  89%
                </h4>
              </div>

            </div>

          )}

        </div>

      </main>

      <BottomNav />
    </div>
  );
}