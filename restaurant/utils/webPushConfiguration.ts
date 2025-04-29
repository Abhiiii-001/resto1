export async function requestNotificationPermission(setSubscription: any) {
  if (!("Notification" in window) || !("serviceWorker" in navigator)) {
    console.error("Push notifications are not supported in this browser.");
    return;
  }

  try {
    const registration = await navigator.serviceWorker.register("/service-worker.js");
    console.log("Service Worker Registered:", registration);


    if (!registration.active) {
      console.warn("Waiting for service worker activation...");
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }

    const permission = await Notification.requestPermission();
    if (permission !== "granted") {
      console.warn("Notification permission denied.");
      return;
    }    

    const subscription = await subscribeUserToPush(registration);
    setSubscription(subscription);
    console.log("Push Subscription:", subscription);
  } catch (error) {
    console.error("Push Subscription Failed:", error);
  }
}

async function subscribeUserToPush(registration: ServiceWorkerRegistration) {
  const vapidKey = process.env.NEXT_PUBLIC_VAPID_KEY;
  if (!vapidKey) {
    console.error("VAPID Key is missing in environment variables.");
    return null;
  }

  const convertedKey = urlBase64ToUint8Array(vapidKey);
  const subscription = await registration.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: convertedKey,
  });

  return subscription;
}

function urlBase64ToUint8Array(base64String: string) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");
  const rawData = window.atob(base64);
  return Uint8Array.from([...rawData].map((char) => char.charCodeAt(0)));
}
