import { createSlice , PayloadAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { ProductInterface, ProductVariantsInterface } from "../api/data";

export interface SubOrderInterface{
    variant : ProductVariantsInterface;
    quantity: number;
    product: ProductInterface;
}
export interface InitialStateInterface {
    totalItem: number;
    totalAmount: number;
    isPack:boolean;
    paymentOption: string;
    orders: SubOrderInterface[]; 
}

const initialState: InitialStateInterface =  {
    totalItem: 0,
    totalAmount: 0,
    isPack: false,
    paymentOption: "Cash",
    orders: []
}

export const cartSlice = createSlice({
    name:"cart",
    initialState,
    reducers:{
        addToCart:(state,action: PayloadAction<SubOrderInterface>) => {
            const { variant , quantity ,product } = action.payload;

            const existingOrder = state.orders.findIndex((item) => item?.variant.id === variant.id);
            if(existingOrder >= 0){
                state.orders[existingOrder].quantity += quantity;
            }
            else{
                state.orders.push({variant,quantity,product});
            }
            state.totalItem += quantity;
            state.totalAmount += (variant?.price * quantity);
        },
        removeToCart:(state,action) => {
            const { variant , quantity } = action.payload;

            const existingOrder = state.orders.find((item) => item.variant.id === variant?.id);
            if(existingOrder){
                if(existingOrder.quantity <= quantity){
                    state.totalAmount -= (existingOrder.quantity * existingOrder.variant.price);
                    state.totalItem -= existingOrder.quantity;
                    state.orders = state.orders.filter((item) => item.variant.id !== variant.id);                   
                }
                else{
                    existingOrder.quantity -= quantity;
                    state.totalAmount -= (quantity * existingOrder.variant.price);
                    state.totalItem -= quantity;
                }
            }
            else{
                toast.warning("Product is not present in cart!")
            }
        },
        resetCart: (state) => {
            state.totalAmount = 0;
            state.totalItem = 0;
            state.orders = [];
        },
        setPayementOption: (state,action) => {
            const { mode } = action.payload;
            state.paymentOption = mode;
        },
        setEatingLocation: (state,action) => {
            const isPack = action.payload;
            state.isPack = isPack;
        }
    }
});

export const { addToCart , removeToCart , resetCart , setEatingLocation , setPayementOption } = cartSlice.actions;
export default cartSlice.reducer;