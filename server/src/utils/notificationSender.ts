import webpush from "web-push";

export const sendPushNotification = async (subscription:any, message:any) => {
    try {
      const payload = JSON.stringify({
        title: message.title,
        body: message.body,
        icon: message.icon || "/default-icon.png", // Set an icon
        badge: message.badge || "/badge-icon.png", // Small badge icon (optional)
        vibrate: [200, 100, 200], // Vibration pattern
        requireInteraction: true, // Makes notification sticky (won’t disappear)
        // data: { url: message.url || "/" }, // URL to open on click
      });
  
      await webpush.sendNotification(subscription, payload);
      //console.log("Push notification sent");
    } catch (error) {
      console.error("Error sending push notification", error);
    }
  };
  