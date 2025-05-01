"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.emitNewOrder = exports.registerSocketHandlers = void 0;
const registerSocketHandlers = (io) => {
    io.on("connection", (socket) => {
        console.log("Admin connected: ", socket.id);
        //seperate room for different restaurants
        socket.on('joinRoom', (restaurantId) => {
            socket.join(restaurantId);
            console.log(`Admin ${socket.id} joined room : ${restaurantId} `);
        });
        socket.on('orderConfirmation', (orderId) => {
            console.log(`Order ${orderId} verified by admin`);
            //update order status
        });
        socket.on('disconnect', () => {
            console.log("Admin disconnected", socket.id);
        });
    });
};
exports.registerSocketHandlers = registerSocketHandlers;
const emitNewOrder = (io, restaurantId, orderData) => {
    // console.log("socket new order",io,restaurantId,orderData)
    io.to(restaurantId).emit('newOrder', orderData);
};
exports.emitNewOrder = emitNewOrder;
