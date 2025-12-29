/* eslint-disable no-undef */

// Firebase Cloud Messaging Service Worker
// Notes:
// - In production (Firebase Hosting), this uses /__/firebase/init.js for config.
// - In local dev, we accept firebaseConfig via a dev-only query param during SW registration.

importScripts('https://www.gstatic.com/firebasejs/10.14.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.14.1/firebase-messaging-compat.js');

(async () => {
  const parseDevConfig = () => {
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

  try {
    // Works on Firebase Hosting (recommended)
    importScripts('/__/firebase/init.js');
  } catch (e) {
    const devConfig = parseDevConfig()
    if (devConfig) {
      firebase.initializeApp(devConfig)
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
