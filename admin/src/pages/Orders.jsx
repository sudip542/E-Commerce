import React, { useState, useEffect } from "react";
import axios from "axios";
import { backendUrl, currency } from "../App";
import { toast } from "react-toastify";
import { assets } from "../assets/assets";
import { motion } from "framer-motion";

const Orders = ({ token }) => {
  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    if (!token) return;
    try {
      const response = await axios.post(
        `${backendUrl}/api/order/list`,
        {},
        { headers: { token } }
      );
      if (response.data.succes) {
        // Sort orders by date (newest first)
        const sortedOrders = response.data.orders.sort(
          (a, b) => new Date(b.date) - new Date(a.date)
        );
        setOrders(sortedOrders);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };
  
  
  const statusHandler =async (event,orderId)=>{
    try {
      const response= await axios.post(backendUrl+'/api/order/status',{orderId,status:event.target.value} ,{headers:{token}})
      if(response.data.succes){
        await fetchAllOrders()
        toast.success(response.data.message)
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message)
    }
  }
  useEffect(() => {
    fetchAllOrders();
  }, []);

  return (
    <div className="container mx-auto px-4 ">
      {/* Animated Heading */}
      <h3 className="text-4xl font-extrabold text-gray-800 mb-6 text-center tracking-wide relative">
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-500">
          My Orders
        </span>
      </h3>

      {orders.length === 0 ? (
        <p className="text-gray-500 text-lg text-center">
          No orders found. 😞
        </p>
      ) : (
        <div className="space-y-6">
          {orders.map((order, index) => (
            <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-6 items-center border border-gray-400 rounded-xl shadow-lg p-6 md:p-8 bg-white hover:shadow-2xl hover:border-blue-500 transition-all duration-300"
          >
            {/* Order Icon */}
            <motion.img
              src={assets.parcel_icon}
              alt="Parcel"
              className="w-16 sm:w-20 transition-transform duration-300 hover:scale-110"
            />
          
            {/* Order Details */}
            <div className="space-y-3">
              {order.items.map((item, i) => (
                <p key={i} className="text-gray-800 text-lg font-semibold">
                  {item.name} x {item.quantity}{" "}
                  <span className="text-gray-600 text-base">({item.size})</span>
                </p>
              ))}
          
              {/* Address Section */}
              <p className="text-gray-900 font-bold text-lg">
                {order.address.firstName} {order.address.lastName}
              </p>
              <p className="text-gray-700 text-sm">
                {order.address.street}, {order.address.city}
              </p>
              <p className="text-gray-700 text-sm">
                {order.address.state}, {order.address.country}, {order.address.zipcode}
              </p>
              <p className="text-gray-700 text-sm font-medium">📞 {order.address.phone}</p>
            </div>
          
            {/* Payment Details */}
            <div className="text-gray-800 space-y-2">
              <p><span className="font-bold">Items:</span> {order.items.length}</p>
              <p><span className="font-bold">Method:</span> {order.paymentMethod}</p>
              <p>
                <span className="font-bold">Payment:</span> 
                <span className={`ml-1 font-bold ${order.payment ? "text-green-600" : "text-red-500"}`}>
                  {order.payment ? "✅ Done" : "❌ Pending"}
                </span>
              </p>
              <p><span className="font-bold">Date:</span> {new Date(order.date).toLocaleDateString()}</p>
            </div>
          
            {/* Order Amount */}
            <p className="text-xl font-extrabold text-gray-900">
              Order Amount: <span className="text-blue-600">{currency}{order.amount}</span>
            </p>
          
            {/* Status Dropdown */}
            <select value={order.status} onChange={(e)=>statusHandler(e,order._id)}
              className={`border border-gray-300 rounded-lg px-4 py-2 text-gray-900 text-lg bg-white focus:ring-2 focus:ring-blue-300 transition-all duration-200 hover:bg-gray-100 cursor-pointer ${
                order.status === "Delivered"
                  ? "bg-green-200 text-green-900 border-green-600"
                  : order.status === "Out for delivery"
                  ? "bg-yellow-200 text-yellow-900 border-yellow-600"
                  : order.status === "Rejected"
                  ? "bg-red-200 text-red-900 border-red-600"
                  : "bg-blue-200 text-blue-900 border-blue-600"
              }`}
            >
              <option value="Order Placed">📦 Order Placed</option>
              <option value="Packing">📦 Packing</option>
              <option value="Shipped">🚚 Shipped</option>
              <option value="Out for delivery">🚀 Out for delivery</option>
              <option value="Delivered">✅ Delivered</option>
              <option value="Rejected">😞 Rejected</option>
            </select>
          </motion.div>          
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
