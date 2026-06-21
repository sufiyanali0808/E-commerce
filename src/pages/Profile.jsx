import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets"; // Assuming default user icon is in assets

const Profile = () => {
  const { user, currency } = useContext(ShopContext); // Assuming `user` object is available in ShopContext
  const [userData, setUserData] = useState(null);
  const [userOrders, setUserOrders] = useState([]);

  useEffect(() => {
    // In a real application, you would fetch user data and orders from your backend
    // For now, we'll use a placeholder `user` object from context
    if (user) {
      setUserData({
        name: user.name || "Guest User",
        email: user.email || "guest@example.com",
        profilePicture: user.profilePicture || assets.profile, // Using assets.profile for default
        // Add more user-specific data here if available in your context or backend
      });

      // Placeholder for orders. In a real app, this would be fetched based on user ID.
      setUserOrders([
        {
          id: "ORD001",
          date: "2023-01-15",
          total: 120.00,
          items: [{ name: "Product A", quantity: 1, price: 50.00 }, { name: "Product B", quantity: 1, price: 70.00 }],
          status: "Delivered"
        },
        {
          id: "ORD002",
          date: "2023-02-20",
          total: 55.50,
          items: [{ name: "Product C", quantity: 1, price: 25.00 }, { name: "Product D", quantity: 1, price: 30.50 }],
          status: "Processing"
        },
      ]);
    }
  }, [user]);

  if (!userData) {
    return (
      <div className="border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100 min-h-screen flex items-center justify-center">
        <p>Please log in to view your profile.</p>
      </div>
    );
  }

  return (
    <div className="border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100 pb-20">
      <h1 className="text-3xl font-bold text-center mb-10">User Profile</h1>

      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6 sm:p-8">
        {/* User Info Section */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 border-b pb-6 mb-6">
          <img
            src={userData.profilePicture}
            alt="Profile"
            className="w-24 h-24 rounded-full object-cover border-2 border-gray-300 flex-shrink-0"
          />
          <div className="text-center sm:text-left">
            <h2 className="text-2xl font-semibold mb-1">{userData.name}</h2>
            <p className="text-gray-600">{userData.email}</p>
            {/* Add more user details here like address, phone etc. if available */}
          </div>
        </div>

        {/* Orders Section */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Your Orders</h3>
          {userOrders.length > 0 ? (
            <div className="space-y-4">
              {userOrders.map((order) => (
                <div key={order.id} className="border rounded-md p-4 bg-gray-50">
                  <div className="flex justify-between items-center mb-2">
                    <p className="font-medium">Order ID: <span className="text-gray-700">{order.id}</span></p>
                    <span className={`px-3 py-1 text-sm rounded-full ${order.status === "Delivered" ? "bg-green-100 text-green-800" : order.status === "Processing" ? "bg-blue-100 text-blue-800" : "bg-gray-100 text-gray-800"}`}>{order.status}</span>
                  </div>
                  <p className="text-sm text-gray-500 mb-2">Date: {order.date}</p>
                  <ul className="list-disc list-inside text-sm text-gray-700 mb-2">
                    {order.items.map((item, idx) => (
                      <li key={idx}>{item.name} (x{item.quantity}) - {currency}{item.price.toFixed(2)}</li>
                    ))}
                  </ul>
                  <p className="text-lg font-bold text-right">Total: {currency}{order.total.toFixed(2)}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">You haven't placed any orders yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
