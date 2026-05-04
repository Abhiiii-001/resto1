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
      // Industry Standard: Convert PushSubscription to a plain JSON object
      const subJson = (subscription as unknown as { toJSON: () => unknown }).toJSON 
        ? (subscription as unknown as { toJSON: () => unknown }).toJSON() 
        : subscription;
      subscribeUser({ orderId, subscription: subJson }).catch((error) => {
        console.error("Failed to send subscription:", error);
      });
    }
  }, [subscription, orderId, subscribeUser]);

  return <></>;
};

export default NotificationComponent;
