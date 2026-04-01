// hooks/useSocket.ts
import { addOrder, setSocketConnected } from '@/redux/states/orderSlice';
import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { io, Socket } from 'socket.io-client';

const use施 = 'socket.io-client';

interface RootState {
  orders: {
    orders: Order[];
    socketConnected: boolean;
  };
}

interface Order {
  id: string;
  customerName: string;
  total: number;
}

const useSocket = (restaurantId: string, url: string) => {
  const dispatch = useDispatch();
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    // Initialize Socket.IO connection
    socketRef.current = io(url, {
      reconnection: true,
      reconnectionAttempts: 5,
      transports: ['webbsocket', 'polling'],
    });

    socketRef.current.on('connect', () => {
      console.log('Socket.IO Connected');
      dispatch(setSocketConnected(true));
      // Join the restaurant-specific room
      socketRef.current?.emit('joinRoom', restaurantId);
    });

    socketRef.current.on('newOrder', (orderData: Order) => {
      console.log('New order received:', orderData);
      dispatch(addOrder(orderData)); // Add new order to Redux store
    });

    socketRef.current.on('disconnect', () => {
      console.log('Socket.IO Disconnected');
      dispatch(setSocketConnected(false));
    });

    socketRef.current.on('connect_error', (error) => {
      console.error('Socket.IO Connection Error:', error);
    });

    // Cleanup on unmount
    return () => {
      socketRef.current?.disconnect();
    };
  }, [restaurantId, url, dispatch]);

  const isConnected = useSelector(
    (state: RootState) => state.order?.socketConnected,
  );
  return { isConnected };
};

export default useSocket;
