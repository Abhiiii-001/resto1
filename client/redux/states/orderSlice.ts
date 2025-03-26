import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    count: 0,
    orders: []
}
const orderSlice = createSlice({
    name: "order",
    initialState,
    reducers:{
        addOrder: (state,action) => {
            const newOrder = action.payload;
            state.orders.push(newOrder);
            state.count += 1;
        },
        removeOrder: (state,action) => {
            const orderId = action.payload;
            state.orders = state.orders.filter((ord) => ord?.id !== orderId);
            state.count -= 1;
        }
    }
});
export const {addOrder,removeOrder} = orderSlice.actions
export default orderSlice.reducer;