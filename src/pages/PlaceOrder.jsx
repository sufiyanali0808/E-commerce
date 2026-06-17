import React from "react";
import Title from "../components/Title";
import CartTotal from "../components/CartTotal";
import { assets } from "../assets/assets";
import { useState } from "react";
import { useContext } from "react";
import { ShopContext } from "../context/ShopContext";

const PlaceOrder = () => {
  const [method, setMethod] = useState("cod");

  const { navigate } = useContext(ShopContext);

  return (
    <div className="flex flex-col flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t">
      {/* ================== left side ==============*/}
      <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">
        <div className="text-xl sm:text-2xl my-3">
          <Title text1={"DELIVERY"} text2={"INFORMATION"} />
        </div>
        <div className="flex gap-3">
          <input
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="text"
            placeholder="First Name"
          />

          <input
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="text"
            placeholder="Last Name"
          />
        </div>

        <input
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          type="Email address"
          placeholder="Email"
        />
        <input
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          type="text"
          placeholder="Street"
        />

        <div className="flex gap-3">
          <input
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="text"
            placeholder="City"
          />

          <input
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="text"
            placeholder="State"
          />
        </div>

        <div className="flex gap-3">
          <input
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="text"
            placeholder="Pincode"
          />

          <input
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="text"
            placeholder="Country"
          />
        </div>

        <input
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          type="text"
          placeholder="Phone"
        />
      </div>
      {/* =================text right side ====================*/}
      <div className="mt-8">
        <div className="mt-8 min-w-80">
          <CartTotal />
        </div>
        <div className="mt-12">
          <Title text1={"PAYMENT"} text2={"METHOD"} />
          {/* ---------------payment method select----------------*/}
          <div className="flex flex-col lg:flex-row gap-4 w-full">
            <div
              onClick={() => {
                setMethod("upi");
              }}
              className="flex items-center gap-3 border p-2 px-3 cursor-pointer"
            >
              <p
                className={`min-w-3.5 h-3.5 border rounded-full ${method == "upi" ? "bg-green-300" : ""} `}
              ></p>
              <img className="h-5 mx-4" src={assets.upi_logo} alt="" />
            </div>
            <div
              onClick={() => setMethod("credit")}
              className="flex items-center gap-3 border p-2 px-3 cursor-pointer"
            >
              <p
                className={`min-w-3.5 h-3.5 border rounded-full ${method == "credit" ? "bg-green-300" : ""}`}
              ></p>
              <img className="h-5 mx-4" src={assets.credit_card} alt="" />
            </div>
            <div
              onClick={() => setMethod("cod")}
              className="flex items-center gap-3 border p-2 px-3 cursor-pointer"
            >
              <p
                className={`min-w-3.5 h-3.5 border rounded-full ${method == "cod" ? "bg-green-300" : ""}`}
              ></p>
              <p className="text-gray-500 text-sm font-medium mx-4"> COD</p>
            </div>
          </div>
        </div>
        <div className="w-full text-end mt-4">
          <button
            onClick={() => navigate("/orders")}
            className="bg-black text-white px-16 py-3 text-base active:bg-gray-700"
          >
            PLACE ORDER
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrder;
