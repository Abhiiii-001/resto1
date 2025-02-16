import { useEffect } from "react";


export function requestNotificationPermission(orderId: string) {
  if (!("serviceWorker" in navigator)) return;
  navigator.serviceWorker.register("/service-worker.js").then((registration) => {
    Notification.requestPermission().then((permission) => {
      if (permission === "granted") {
        subscribeUserToPush(registration,orderId);
      }
    });
  });
}

async function subscribeUserToPush(registration:any,orderId:string) {
  const subscription = await registration.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: urlBase64ToUint8Array(process.env.NEXT_PUBLIC_VAPID_KEY),
  });

console.log("Subscription",subscription);
  // Send subscription to the server
//   await fetch("/subscribe", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({ orderId: "some-unique-order-id", subscription }),
//   });
}

function urlBase64ToUint8Array(base64String:any) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");
  const rawData = window.atob(base64);
  return Uint8Array.from([...rawData].map((char) => char.charCodeAt(0)));
}
