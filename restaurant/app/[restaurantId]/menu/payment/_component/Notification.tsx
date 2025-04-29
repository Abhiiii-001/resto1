import { useState, useEffect } from "react";
import { useSubscribeMutation } from "@/redux/api/order";
import { requestNotificationPermission } from "@/utils/webPushConfiguration";

const NotificationComponent = ({ orderId }: { orderId: string}) => {
  const [subscription, setSubscription] = useState(null);
  const [subscribeUser] = useSubscribeMutation();

  useEffect(() => {
    requestNotificationPermission(setSubscription);
  }, []);

  useEffect(() => {
    if (subscription) {
      subscribeUser({ orderId, subscription }).catch((error) => {
        console.error("Failed to send subscription:", error);
      });
    }
  }, [subscription]);

  return <></>;
};

export default NotificationComponent;
