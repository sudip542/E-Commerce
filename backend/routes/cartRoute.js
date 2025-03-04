import express from "express"
import { addToCart, UpdateCart ,getUserCart} from "../controllers/CartController.js"
import authUser from "../middleware/auth.js";

const cartRouter=express.Router();

cartRouter.post('/add',authUser,addToCart);
cartRouter.post('/update',authUser,UpdateCart);
cartRouter.post('/get',authUser,getUserCart);

export default cartRouter;
