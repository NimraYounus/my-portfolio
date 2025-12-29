import { initializeApp } from 'firebase/app'
import { connectFirestoreEmulator, getFirestore } from 'firebase/firestore'
import { getMessaging, isSupported } from 'firebase/messaging'

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
}

const missingFirebaseEnv = Object.entries({
  VITE_FIREBASE_API_KEY: firebaseConfig.apiKey,
  VITE_FIREBASE_AUTH_DOMAIN: firebaseConfig.authDomain,
  VITE_FIREBASE_PROJECT_ID: firebaseConfig.projectId,
  VITE_FIREBASE_STORAGE_BUCKET: firebaseConfig.storageBucket,
  VITE_FIREBASE_MESSAGING_SENDER_ID: firebaseConfig.messagingSenderId,
  VITE_FIREBASE_APP_ID: firebaseConfig.appId,
})
  .filter(([, v]) => !v)
  .map(([k]) => k)

if (missingFirebaseEnv.length > 0) {
  // eslint-disable-next-line no-console
  console.error(
    `Missing Firebase env vars: ${missingFirebaseEnv.join(', ')}. ` +
      `Create a .env file in the project root (same folder as package.json) and restart \"npm run dev\".`,
  )
}

export const app = initializeApp(firebaseConfig)

export const db = getFirestore(app)

if (import.meta.env.VITE_USE_FIRESTORE_EMULATOR === 'true') {
  const host = import.meta.env.VITE_FIRESTORE_EMULATOR_HOST || '127.0.0.1'
  const port = Number(import.meta.env.VITE_FIRESTORE_EMULATOR_PORT || 8080)

  if (!globalThis.__portfolio_firestore_emulator_connected__) {
    connectFirestoreEmulator(db, host, port)
    globalThis.__portfolio_firestore_emulator_connected__ = true
  }
}

export async function getMessagingIfSupported() {
  const supported = await isSupported()
  if (!supported) return null
  return getMessaging(app)
}
