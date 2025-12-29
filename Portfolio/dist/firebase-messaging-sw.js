/* eslint-disable no-undef */

// Firebase Cloud Messaging Service Worker
// Notes:
// - On GitHub Pages (or any static hosting), we initialize from a config query param during SW registration.
// - On Firebase Hosting, we can also use /__/firebase/init.js.

importScripts('https://www.gstatic.com/firebasejs/10.14.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.14.1/firebase-messaging-compat.js');

(async () => {
  const parseConfig = () => {
    try {
      const url = new URL(self.location.href)
      const encoded = url.searchParams.get('config')
      if (!encoded) return null

      const json = decodeURIComponent(escape(atob(encoded)))
      const cfg = JSON.parse(json)
      return cfg && typeof cfg === 'object' ? cfg : null
    } catch {
      return null
    }
  }

  const cfg = parseConfig()
  if (cfg) {
    firebase.initializeApp(cfg)
  } else {
    try {
      // Works on Firebase Hosting
      importScripts('/__/firebase/init.js');
    } catch {
      // ignore
    }
  }

  if (!self.firebase?.apps?.length) {
    // If init failed and no config was provided, do nothing.
    return;
  }

  const messaging = firebase.messaging();

  messaging.onBackgroundMessage((payload) => {
    const title = payload?.notification?.title || 'New Notification';
    const body = payload?.notification?.body || '';

    self.registration.showNotification(title, {
      body,
      data: payload?.data || {},
    });
  });
})();
