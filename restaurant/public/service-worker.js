
self.addEventListener("push", (event) => {
  const data = event.data.json();

  event.waitUntil(
    self.registration.showNotification(data.title, {
      body: data.body,
      icon: data.icon,
      sound: data.sound,  // Custom sound
      actions: data.actions,
      requireInteraction: true,  // Sticky notification
    })
  );
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();

  if (event.action === "ok") {
    // Handle OK button click (if needed)
    console.log("OK button clicked");
  } else {
    // Handle the main notification click
    clients.openWindow("/");
  }
});

