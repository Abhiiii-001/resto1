import { Server , Socket } from 'socket.io'

export const registerSocketHandlers = (io: Server) => {

    io.on("connection",(socket: Socket) => {
        console.log("Admin connected: ",socket.id);

        //seperate room for different restaurants
        socket.on('joinRoom',(restaurantId: string) => {
            socket.join(restaurantId);
            console.log(`Admin ${socket.id} joined room : ${restaurantId} `);
        });

        socket.on('orderConfirmation',(orderId: string) => {
            console.log(`Order ${orderId} verified by admin`);
            //update order status
        })

        socket.on('disconnect',() => {
            console.log("Admin disconnected",socket.id);
        });
    });

}

export const emitNewOrder = (io: Server,restaurantId: string,orderData: any) => {
    // console.log("socket new order",io,restaurantId,orderData)
    io.to(restaurantId).emit('newOrder',orderData);
};