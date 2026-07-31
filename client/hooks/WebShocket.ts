// hooks/useSocket.ts
import { addOrder, setSocketConnected } from '@/redux/states/orderSlice';
import { Order } from '@/types/order';
import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { io, Socket } from 'socket.io-client';
import { dashboardApi } from '@/redux/api/dashboard';
import { orderApi } from '@/redux/api/order';
import { toast } from 'react-toastify';

interface RootState {
  order: {
    orders: Order[];
    socketConnected: boolean;
  };
}

const useSocket = (restaurantId: string | null, url: string) => {
  const dispatch = useDispatch();
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    if (!restaurantId || !url) return;

    // Initialize Socket.IO connection with correct industry standards
    socketRef.current = io(url, {
      reconnection: true,
      reconnectionAttempts: 5,
      // transports: ['websocket', 'polling'],
    });

    socketRef.current.on('connect', () => {
      console.log('Socket.IO Connected:', socketRef.current?.id);
      dispatch(setSocketConnected(true));

      if (restaurantId) {
        console.log('Joining room:', restaurantId);
        socketRef.current?.emit('joinRoom', restaurantId);
      }
    });

    socketRef.current.on('newOrder', (orderData: any) => {
      toast.success("New Order",)
      console.log('New order received via socket:', orderData);
      dispatch(addOrder(orderData));
    });

    socketRef.current.on('orderUpdated', (data: any) => {
      // Could also update the specific order status in redux here if needed
      dispatch(dashboardApi.util.invalidateTags(['Dashboard']));
      dispatch(orderApi.util.invalidateTags(['getOrders']));
    });

    socketRef.current.on('statsUpdated', () => {
      dispatch(dashboardApi.util.invalidateTags(['Dashboard']));
    });

    socketRef.current.on('disconnect', () => {
      //console.log('Socket.IO Disconnected');
      dispatch(setSocketConnected(false));
    });

    socketRef.current.on('connect_error', (error) => {
      console.error('Socket.IO Connection Error:', error);
    });

    // Cleanup on unmount
    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, [restaurantId, url, dispatch]);

  const isConnected = useSelector(
    (state: RootState) => state.order?.socketConnected,
  );

  return { isConnected };
};

export default useSocket;
