import { useState } from "react";
import { collection, addDoc, doc, deleteDoc, updateDoc } from "firebase/firestore"; 
import { db } from "../firebase";

import {
  Search,
  Mail,
  MoreVertical,
  Pencil,
  Trash2,
  X,
} from "lucide-react";

import Navbar from "../components/Navbar";
import BottomNav from "../components/BottomNav";

export default function Customers() {
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedCustomer, setSelectedCustomer] =
    useState(null);

  const [editingId, setEditingId] = useState(null);

  const [showMenu, setShowMenu] = useState(null);

  const [showMessageBox, setShowMessageBox] =
    useState(false);

  const [messageCustomer, setMessageCustomer] =
    useState(null);

  const [message, setMessage] = useState("");

  const [customers, setCustomers] = useState([
    {
      id: 1,
      name: "Julian Thorne",
      email: "julian.thorne@luxe-atelier.com",
      avatar:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e",
      spend: 42850,
      lastOrder: "2D AGO",
      tier: "PLATINUM",
      history: [
        "Rolex Daytona - $12,500",
        "Leather Wallet - $850",
        "Luxury Watch Box - $600",
      ],
    },

    {
      id: 2,
      name: "Elena Vance",
      email: "vance.elena@global-corp.io",
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
      spend: 18200,
      lastOrder: "12D AGO",
      tier: "GOLD",
      history: [
        "Luxury Bracelet - $2,100",
        "Premium Sunglasses - $1,200",
      ],
    },

    {
      id: 3,
      name: "Sarah Jenkins",
      email:
        "s.jenkins@creative-collective.com",
      avatar:
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d",
      spend: 31500,
      lastOrder: "5H AGO",
      tier: "PLATINUM",
      history: [
        "Limited Watch - $8,500",
        "Leather Belt - $650",
      ],
    },
  ]);

  const [newCustomer, setNewCustomer] =
    useState({
      name: "",
      email: "",
      avatar:
        "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde",
      spend: 0,
      tier: "Silver",
    });

  // SEARCH WORKS FOR NEWLY ADDED CUSTOMERS TOO
  const filteredCustomers = customers.filter(
    (customer) =>
      customer.name
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      customer.email
        .toLowerCase()
        .includes(search.toLowerCase())
  );

  const addCustomer = async () => {
    if (!newCustomer.name || !newCustomer.email) {
      alert("Please fill all fields");
      return;
    }

    try {
      const customer = {
        name: newCustomer.name,
        email: newCustomer.email,
        avatar: newCustomer.avatar,
        spend: Number(newCustomer.spend),
        tier: newCustomer.tier.toUpperCase(),
        lastOrder: "JUST NOW",
        history: [],
      };

      if (editingId) {
        // Update existing customer in Firestore
        const customerRef = doc(db, "customers", editingId);
        await updateDoc(customerRef, customer);

        // Update local state
        setCustomers(
          customers.map((c) =>
            c.firebaseId === editingId
              ? { ...c, ...customer }
              : c
          )
        );
        alert("Customer Updated!");
      } else {
        // Add new customer to Firestore
        const docRef = await addDoc(collection(db, "customers"), {
          ...customer,
          createdAt: new Date().toISOString(),
        });

        // Update local state with Firestore ID
        setCustomers([
          { ...customer, firebaseId: docRef.id, id: Date.now() },
          ...customers,
        ]);
        alert("Customer Added to Firestore!");
      }

      // Reset form
      setEditingId(null);
      setNewCustomer({
        name: "",
        email: "",
        avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde",
        spend: 0,
        tier: "Silver",
      });
      setShowModal(false);
    } catch (error) {
      console.error("Error saving customer: ", error);
      alert("Failed to save customer");
    }
  };

  const deleteCustomer = async (customer) => {
    if (
      window.confirm(
        "Delete this customer?"
      )
    ) {
      try {
        // Delete from Firestore if it has firebaseId
        if (customer.firebaseId) {
          await deleteDoc(doc(db, "customers", customer.firebaseId));
        }

        // Update local state
        setCustomers(
          customers.filter((c) => c.id !== customer.id)
        );
        alert("Customer Deleted!");
      } catch (error) {
        console.error("Error deleting customer: ", error);
        alert("Failed to delete customer");
      }
    }
  };

  const editCustomer = (customer) => {
    setEditingId(customer.firebaseId || customer.id);

    setNewCustomer({
      name: customer.name,
      email: customer.email,
      avatar: customer.avatar,
      spend: customer.spend,
      tier: customer.tier,
    });

    setShowModal(true);
  };


  return (
    <div className="bg-[#f5f4f3] min-h-screen pb-28 overflow-x-hidden">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 md:px-8 py-8">
      {/* <main className="w-full max-w-[1700px] mx-auto px-5 md:px-10 xl:px-16 py-6 md:py-10"> */}
      {/* <main className="max-w-7xl mx-auto px-4 md:px-8 py-8"> */}

        {/* HEADER */}

        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-10">

          <div>
            <p className="uppercase tracking-[5px] text-[11px] text-gray-500 mb-3">
              Client Directory
            </p>
            <h1 className="text-5xl md:text-6xl font-light mt-2">
              Customers
            </h1>

          </div>

          <button
            onClick={() => {
              setEditingId(null);
              setShowModal(true);
            }}
            className="bg-black text-white px-8 h-14 md:h-16 rounded-2xl hover:scale-[1.02] transition-all duration-300 tracking-[4px] uppercase text-xs md:text-sm shadow-xl w-full sm:w-fit"
          >
            + Add Customer
          </button>

        </div>

        {/* SEARCH */}

        <div className="mb-8">

          <div className="h-14 md:h-16 bg-white border border-[#dfdbd7] rounded-2xl px-5 flex items-center gap-4 shadow-sm">

            <Search
              size={20}
              className="text-gray-500 shrink-0"
            />

            <input
              type="text"
              placeholder="SEARCH CUSTOMERS..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              className="w-full bg-transparent outline-none"
              // className="w-full bg-transparent outline-none tracking-[3px] text-sm md:text-base"
            />

          </div>

        </div>

        {/* EMPTY STATE */}

        {filteredCustomers.length === 0 && (
          <div className="bg-white rounded-[30px] border border-[#e7e3df] p-10 text-center">
            <h2 className="text-2xl font-light">
              No Customers Found
            </h2>

            <p className="text-gray-500 mt-3">
              Try searching with another name
              or email.
            </p>
          </div>
        )}

        {/* CUSTOMER LIST */}

        {/* <div className="space-y-6"> */}
        <div className="space-y-5">

          {filteredCustomers.map((customer) => (

            <div
              key={customer.id}
              // className="bg-white rounded-[30px] border border-[#e7e3df] p-5 md:p-8 shadow-sm hover:shadow-xl transition-all duration-300"
              className="bg-white border rounded-3xl p-6 shadow-sm hover:shadow-lg transition"
            >

              {/* TOP */}

              <div className="flex flex-col xl:flex-row xl:items-start xl:justify-between gap-6">

                <div className="flex flex-col sm:flex-row sm:items-start gap-5">

                  <img
                    src={customer.avatar}
                    alt={customer.name}
                    // className="w-20 h-20 md:w-24 md:h-24 rounded-2xl object-cover border border-[#e7e3df]"
                    className="w-20 h-20 rounded-2xl object-cover border"
                  />

                  <div className="min-w-0">

                    {/* <h2 className="text-2xl md:text-4xl font-light tracking-tight break-words">
                      {customer.name}
                    </h2> */}
                    <h2 className="text-3xl font-medium mt-2">
                      {customer.name}
                    </h2>

                    <p className="text-gray-500 mt-2 text-sm md:text-lg break-all">
                      {customer.email}
                    </p>

                  </div>

                </div>

                <span
                  className={`w-fit px-5 py-2 rounded-full text-[10px] md:text-xs tracking-[4px] uppercase ${
                    customer.tier === "PLATINUM"
                      ? "bg-black text-white"
                      : customer.tier === "GOLD"
                      ? "bg-[#d4af37] text-white"
                      : "bg-[#ece8e4] text-black"
                  }`}
                >
                  {customer.tier}
                </span>

              </div>

              {/* STATS */}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-8 mt-8">

                <div className="bg-[#f8f6f4] rounded-3xl p-5 md:p-8 border border-[#ece8e4] overflow-hidden">

                  <p className="uppercase tracking-[4px] text-[10px] md:text-xs text-gray-500">
                    Total Spend
                  </p>
                  <h3 className="text-4xl font-light mt-4">
                  {/* <h3 className="text-4xl font-light mt-4"> */}
                    $
                    {customer.spend.toLocaleString()}
                  </h3>
                  

                </div>

                <div className="bg-[#f8f6f4] rounded-3xl p-5 md:p-8 border border-[#ece8e4] overflow-hidden">

                  <p className="uppercase tracking-[4px] text-[10px] md:text-xs text-gray-500">
                    Last Order
                  </p>

                  <h3 className="text-4xl font-light mt-4">
                    {customer.lastOrder}
                  </h3>

                </div>

              </div>

              {/* ACTIONS */}

              <div className="flex flex-col md:flex-row gap-4 mt-8">

                <button
                  onClick={() =>
                    setSelectedCustomer(
                      selectedCustomer?.id ===
                        customer.id
                        ? null
                        : customer
                    )
                  }
                  className="flex-1 h-14 md:h-16 rounded-2xl border border-black bg-white hover:bg-black hover:text-white transition-all duration-300 uppercase tracking-[4px] text-xs md:text-sm"
                >
                  View History
                </button>

                <button
                  onClick={() => {
                    setMessageCustomer(customer);
                    setShowMessageBox(true);
                  }}
                  className="h-14 md:h-16 w-full md:w-16 rounded-2xl border border-[#e7e3df] bg-white flex items-center justify-center hover:bg-black hover:text-white transition-all duration-300"
                >
                  <Mail size={20} />
                </button>

                <div className="relative w-full md:w-auto">

                  <button
                    onClick={() =>
                      setShowMenu(
                        showMenu === customer.id
                          ? null
                          : customer.id
                      )
                    }
                    className="h-14 md:h-16 w-full md:w-16 rounded-2xl border border-[#e7e3df] bg-white flex items-center justify-center hover:bg-black hover:text-white transition-all duration-300"
                  >
                    <MoreVertical size={20} />
                  </button>

                  {showMenu === customer.id && (

                    <div className="absolute right-0 top-16 md:top-20 w-full md:w-44 bg-white rounded-2xl border border-[#ece8e4] shadow-2xl overflow-hidden z-50">

                      <button
                        onClick={() =>
                          editCustomer(customer)
                        }
                        className="w-full px-5 py-4 flex items-center gap-3 hover:bg-[#f8f6f4] transition-all duration-200"
                      >
                        <Pencil size={18} />

                        <span className="uppercase tracking-[3px] text-xs">
                          Edit
                        </span>
                      </button>

                      <button
                        onClick={() =>
                          deleteCustomer(customer)
                        }
                        className="w-full px-5 py-4 flex items-center gap-3 hover:bg-red-50 text-red-600 transition-all duration-200"
                      >
                        <Trash2 size={18} />

                        <span className="uppercase tracking-[3px] text-xs">
                          Delete
                        </span>
                      </button>

                    </div>
                  )}

                </div>

              </div>

              {/* HISTORY */}

              {selectedCustomer?.id ===
                customer.id && (

                <div className="mt-8 bg-[#faf9f7] border border-[#ece8e4] rounded-3xl p-6 md:p-8">

                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">

                    <h3 className="text-2xl md:text-3xl font-light">
                      Purchase History
                    </h3>

                    <span className="uppercase tracking-[4px] text-xs text-gray-500">
                      {customer.history.length} Orders
                    </span>

                  </div>

                  <div className="space-y-4">

                    {customer.history.length >
                    0 ? (
                      customer.history.map(
                        (item, index) => (
                          <div
                            key={index}
                            className="bg-white rounded-2xl border border-[#ece8e4] p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3"
                          >

                            <p className="text-sm md:text-base break-words">
                              {item}
                            </p>

                            <span className="text-green-600 uppercase tracking-[3px] text-xs">
                              Completed
                            </span>

                          </div>
                        )
                      )
                    ) : (
                      <p className="text-gray-500">
                        No purchase history
                        found.
                      </p>
                    )}

                  </div>

                </div>
              )}

            </div>
          ))}

        </div>

      </main>

      {/* ADD / EDIT MODAL */}

      {showModal && (

        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">

          <div className="bg-white w-full max-w-2xl rounded-[32px] overflow-hidden shadow-2xl">

            {/* HEADER */}

            <div className="flex items-center justify-between px-6 md:px-8 py-6 border-b border-[#ece8e4]">

              <div>

                <p className="uppercase tracking-[4px] text-xs text-gray-500 mb-2">
                  Customer Management
                </p>

                <h2 className="text-3xl md:text-5xl font-light tracking-tight">
                  {editingId
                    ? "Edit Customer"
                    : "New Customer"}
                </h2>

              </div>

              <button
                onClick={() =>
                  setShowModal(false)
                }
                className="w-12 h-12 rounded-full border border-[#ece8e4] flex items-center justify-center hover:bg-black hover:text-white transition-all"
              >
                <X size={22} />
              </button>

            </div>

            {/* FORM */}

            <div className="p-6 md:p-8 space-y-6 max-h-[80vh] overflow-y-auto">

              <div>
                <label className="uppercase tracking-[4px] text-xs text-gray-500 block mb-3">
                  Full Name
                </label>

                <input
                  type="text"
                  value={newCustomer.name}
                  onChange={(e) =>
                    setNewCustomer({
                      ...newCustomer,
                      name: e.target.value,
                    })
                  }
                  className="w-full h-14 md:h-16 rounded-2xl border border-[#ece8e4] px-5 outline-none focus:border-black transition-all bg-[#faf9f7]"
                />
              </div>

              <div>
                <label className="uppercase tracking-[4px] text-xs text-gray-500 block mb-3">
                  Email Address
                </label>

                <input
                  type="email"
                  value={newCustomer.email}
                  onChange={(e) =>
                    setNewCustomer({
                      ...newCustomer,
                      email: e.target.value,
                    })
                  }
                  className="w-full h-14 md:h-16 rounded-2xl border border-[#ece8e4] px-5 outline-none focus:border-black transition-all bg-[#faf9f7]"
                />
              </div>

              <div>
                <label className="uppercase tracking-[4px] text-xs text-gray-500 block mb-3">
                  Avatar URL
                </label>

                <input
                  type="text"
                  value={newCustomer.avatar}
                  onChange={(e) =>
                    setNewCustomer({
                      ...newCustomer,
                      avatar: e.target.value,
                    })
                  }
                  className="w-full h-14 md:h-16 rounded-2xl border border-[#ece8e4] px-5 outline-none focus:border-black transition-all bg-[#faf9f7]"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                <div>
                  <label className="uppercase tracking-[4px] text-xs text-gray-500 block mb-3">
                    Total Spend
                  </label>

                  <input
                    type="number"
                    value={newCustomer.spend}
                    onChange={(e) =>
                      setNewCustomer({
                        ...newCustomer,
                        spend: e.target.value,
                      })
                    }
                    className="w-full h-14 md:h-16 rounded-2xl border border-[#ece8e4] px-5 outline-none focus:border-black transition-all bg-[#faf9f7]"
                  />
                </div>

                <div>
                  <label className="uppercase tracking-[4px] text-xs text-gray-500 block mb-3">
                    Tier
                  </label>

                  <select
                    value={newCustomer.tier}
                    onChange={(e) =>
                      setNewCustomer({
                        ...newCustomer,
                        tier: e.target.value,
                      })
                    }
                    className="w-full h-14 md:h-16 rounded-2xl border border-[#ece8e4] px-5 outline-none bg-[#faf9f7]"
                  >
                    <option>Silver</option>
                    <option>Gold</option>
                    <option>Platinum</option>
                  </select>
                </div>

              </div>

              <button
                onClick={addCustomer}
                className="w-full h-14 md:h-16 rounded-2xl bg-black text-white uppercase tracking-[5px] text-xs md:text-sm hover:opacity-90 transition-all"
              >
                {editingId
                  ? "Update Customer"
                  : "Add Customer"}
              </button>

            </div>

          </div>

        </div>
      )}

      {/* MESSAGE BOX */}

      {showMessageBox && (

        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">

          <div className="bg-white w-full max-w-xl rounded-[32px] overflow-hidden shadow-2xl">

            <div className="flex items-center justify-between px-6 md:px-8 py-6 border-b border-[#ece8e4]">

              <div>
                <p className="uppercase tracking-[4px] text-xs text-gray-500 mb-2">
                  Direct Message
                </p>

                <h2 className="text-2xl md:text-4xl font-light tracking-tight break-words">
                  {messageCustomer?.name}
                </h2>
              </div>

              <button
                onClick={() =>
                  setShowMessageBox(false)
                }
                className="w-12 h-12 rounded-full border border-[#ece8e4] flex items-center justify-center hover:bg-black hover:text-white transition-all"
              >
                <X size={20} />
              </button>

            </div>

            <div className="p-6 md:p-8">

              <textarea
                rows={7}
                value={message}
                onChange={(e) =>
                  setMessage(e.target.value)
                }
                placeholder="Write your message..."
                className="w-full rounded-2xl border border-[#ece8e4] p-5 outline-none resize-none bg-[#faf9f7]"
              />

              <button
                onClick={() => {
                  alert(
                    `Message sent to ${messageCustomer.name}`
                  );

                  setMessage("");

                  setShowMessageBox(false);
                }}
                className="w-full mt-6 h-14 md:h-16 rounded-2xl bg-black text-white uppercase tracking-[5px] text-xs md:text-sm hover:opacity-90 transition-all"
              >
                Send Message
              </button>

            </div>

          </div>

        </div>
      )}

      <BottomNav />
    </div>
  );
}