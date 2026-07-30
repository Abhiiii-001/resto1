import { Server, Socket } from 'socket.io';

export const registerSocketHandlers = (io: Server) => {
    io.on("connection", (socket: Socket) => {
        console.log("Socket connected:", socket.id);

        socket.on('joinRoom', (restaurantId: string) => {
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
}

export const emitNewOrder = (io: Server, restaurantId: string, orderData: any) => {
    console.log(`Emitting newOrder to room: ${restaurantId}`);
    io.to(restaurantId).emit('newOrder', orderData);
};

export const emitOrderUpdated = (io: Server, restaurantId: string, orderId: string, status: string) => {
    console.log(`Emitting orderUpdated to room: ${restaurantId}`);
    io.to(restaurantId).emit('orderUpdated', { orderId, status });
};

export const emitStatsUpdated = (io: Server, restaurantId: string) => {
    console.log(`Emitting statsUpdated to room: ${restaurantId}`);
    io.to(restaurantId).emit('statsUpdated');
};
