import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { ProductInterface, ProductVariantsInterface } from "../api/data";

export interface SubOrderInterface {
    variant: ProductVariantsInterface;
    quantity: number;
    product: ProductInterface;
}

export interface InitialStateInterface {
    restaurantId: string | null;
    totalItem: number;
    totalAmount: number;
    isPack: boolean;
    paymentOption: string;
    orders: SubOrderInterface[];
}

const initialState: InitialStateInterface = {
    restaurantId: null,
    totalItem: 0,
    totalAmount: 0,
    isPack: false,
    paymentOption: "Cash",
    orders: []
}

export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        syncRestaurantCart: (state, action: PayloadAction<string>) => {
            const currentRestaurantId = action.payload;
            if (state.restaurantId && state.restaurantId !== currentRestaurantId) {
                state.orders = [];
                state.totalItem = 0;
                state.totalAmount = 0;
                state.restaurantId = currentRestaurantId;
            } else if (!state.restaurantId) {
                state.restaurantId = currentRestaurantId;
            }
        },
        addToCart: (state, action: PayloadAction<SubOrderInterface & { restaurantId?: string }>) => {
            const { variant, quantity, product, restaurantId } = action.payload;

            // Set the active restaurant ID
            if (restaurantId) {
                state.restaurantId = restaurantId;
            }

            const existingOrder = state.orders.findIndex((item) => item?.variant.id === variant.id);
            if (existingOrder >= 0) {
                state.orders[existingOrder].quantity += quantity;
            } else {
                state.orders.push({ variant, quantity, product });
            }
            state.totalItem += quantity;
            state.totalAmount += (variant?.price * quantity);
        },
        removeToCart: (state, action: PayloadAction<{ variant: ProductVariantsInterface; quantity: number }>) => {
            const { variant, quantity } = action.payload;

            const existingOrder = state.orders.find((item) => item.variant.id === variant?.id);
            if (existingOrder) {
                if (existingOrder.quantity <= quantity) {
                    state.totalAmount -= (existingOrder.quantity * existingOrder.variant.price);
                    state.totalItem -= existingOrder.quantity;
                    state.orders = state.orders.filter((item) => item.variant.id !== variant.id);
                } else {
                    existingOrder.quantity -= quantity;
                    state.totalAmount -= (quantity * existingOrder.variant.price);
                    state.totalItem -= quantity;
                }

                // If cart is empty after removal, clear the restaurantId
                if (state.orders.length === 0) {
                    state.restaurantId = null;
                }
            } else {
                toast.warning("Product is not present in cart!");
            }
        },
        resetCart: (state) => {
            state.restaurantId = null;
            state.totalAmount = 0;
            state.totalItem = 0;
            state.orders = [];
        },
        setPayementOption: (state, action: PayloadAction<{ mode: string }>) => {
            const { mode } = action.payload;
            state.paymentOption = mode;
        },
        setEatingLocation: (state, action: PayloadAction<boolean>) => {
            const isPack = action.payload;
            state.isPack = isPack;
        }
    }
});

export const { addToCart, removeToCart, resetCart, setEatingLocation, setPayementOption, syncRestaurantCart } = cartSlice.actions;
export default cartSlice.reducer;