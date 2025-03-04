import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";

//Placing orders using COD Method
const placeOrder =async (req,res)=>{
    try {
        const {userId , items, amount ,address}=req.body;
        
        const orderData={
            userId,
            items,
            address,
            amount,
            paymentMethod:"COD",
            payment:false,
            date:Date.now(),
        }

        const newOrder =new orderModel(orderData);
        await newOrder.save();
        await userModel.findByIdAndUpdate(userId,{cartData:{}})
        res.json({succes:true,message:'Order Placed'})
    } catch (error) {
        console.log(error);
        res.json({succes:false,message:error.message})
    }
}


//Placing orders using Rozarpay Method
const placeOrderRazorpay =async (req,res)=>{
    
}

//All Orders data for Admin Panel
const allOrders =async (req,res)=>{
    try {
        const orders=await orderModel.find({});
        res.json({succes:true,orders});
    } catch (error) {
        console.log(error);
        res.json({succes:false,message:error.message})
    }
}

//User Order Data for Frontent
const userOrders =async (req,res)=>{
    try {
        const {userId} = req.body;
        const orders=await orderModel.find({userId})
        res.json({succes:true,orders});
    } catch (error) {
        console.log(error);
        res.json({succes:false,message:error.message})
    }
}

//Update Order Status from Admin Panel
const updateStatus =async (req,res)=>{
    try {
        const {orderId ,status}=req.body;
        await orderModel.findByIdAndUpdate(orderId,{status});
        res.json({succes:true,message:"Order Status Updated!"});
    } catch (error) {
        console.log(error);
        res.json({succes:false,message:error.message})
    }
}

export {placeOrder,placeOrderRazorpay,allOrders,userOrders,updateStatus}