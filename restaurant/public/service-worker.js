self.addEventListener("push", (event) => {
  //console.log("Push event received:", event);

  if (!event.data) {
    console.warn("Push event has no data!");
    return;
  }

  let data;
  try {
    data = event.data.json();
  } catch (error) {
    console.error("Error parsing push data:", error);
    return;
  }

  //console.log("Notification Data:", data);

  event.waitUntil(
    self.registration.showNotification(data.title || "New Notification", {
      body: data.body || "You have a new message.",
      icon: data.icon || "/default-icon.png",
      sound: data.sound || null, // Custom sound (browser-dependent)
      actions: data.actions || [{ action: "ok", title: "OK" }],
      requireInteraction: true, // Sticky notification
    })
  );
});

self.addEventListener("notificationclick", (event) => {
  //console.log("Notification Clicked:", event);
  event.notification.close();

  event.waitUntil(
    clients.matchAll({ type: "window", includeUncontrolled: true }).then((clientList) => {
      if (clientList.length > 0) {
        // Focus the first available client tab
        return clientList[0].focus();
      }

      // Open new window if no existing tab
      return clients.openWindow("/");
    })
  );
});
