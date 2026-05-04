"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.emitNewOrder = exports.registerSocketHandlers = void 0;
const registerSocketHandlers = (io) => {
    io.on("connection", (socket) => {
        console.log("Socket connected:", socket.id);
        socket.on('joinRoom', (restaurantId) => {
            if (!restaurantId) {
                console.warn("Socket tried to join room with empty restaurantId:", socket.id);
                return;
            }
            socket.join(restaurantId);
            console.log(`Socket ${socket.id} joined room: ${restaurantId}`);
        });
        socket.on('disconnect', () => {
            console.log("Socket disconnected:", socket.id);
        });
    });
};
exports.registerSocketHandlers = registerSocketHandlers;
const emitNewOrder = (io, restaurantId, orderData) => {
    console.log(`Emitting newOrder to room: ${restaurantId}`);
    io.to(restaurantId).emit('newOrder', orderData);
};
exports.emitNewOrder = emitNewOrder;
