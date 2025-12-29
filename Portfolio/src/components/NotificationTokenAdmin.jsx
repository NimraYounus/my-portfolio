import { doc, serverTimestamp, setDoc } from 'firebase/firestore'
import { getToken } from 'firebase/messaging'
import { useState } from 'react'

import { db, getMessagingIfSupported } from '../lib/firebase'

export default function NotificationTokenAdmin() {
  const [token, setToken] = useState('')
  const [status, setStatus] = useState('idle')
  const [error, setError] = useState('')

  const vapidKey = import.meta.env.VITE_FIREBASE_VAPID_KEY

  const enableWebPush = async () => {
    setError('')
    setStatus('requesting')

    try {
      if (!vapidKey) {
        throw new Error('Missing VITE_FIREBASE_VAPID_KEY in .env')
      }

      if (!('Notification' in window)) {
        throw new Error('Notifications are not supported in this browser.')
      }

      if (!('serviceWorker' in navigator)) {
        throw new Error('Service workers are not supported in this browser.')
      }

      const permission = await Notification.requestPermission()
      if (permission !== 'granted') {
        throw new Error('Notification permission was not granted.')
      }

      const messaging = await getMessagingIfSupported()
      if (!messaging) {
        throw new Error('Firebase messaging is not supported in this environment.')
      }

      const configJson = JSON.stringify({
        apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
        authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
        projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
        storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
        messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
        appId: import.meta.env.VITE_FIREBASE_APP_ID,
      })

      const configEncoded = btoa(unescape(encodeURIComponent(configJson)))
      const swUrl = `/firebase-messaging-sw.js?config=${encodeURIComponent(configEncoded)}`
      const registration = await navigator.serviceWorker.register(swUrl)

      const fcmToken = await getToken(messaging, {
        vapidKey,
        serviceWorkerRegistration: registration,
      })

      if (!fcmToken) {
        throw new Error('Failed to obtain an FCM token. Ensure your site is served over HTTPS (or localhost).')
      }

      setToken(fcmToken)

      await setDoc(
        doc(db, 'notificationTokens', 'personal'),
        {
          token: fcmToken,
          updatedAt: serverTimestamp(),
          platform: 'web',
        },
        { merge: true },
      )

      setStatus('enabled')
    } catch (err) {
      setStatus('error')
      setError(err?.message || 'Failed to enable web push.')
    }
  }

  return (
    <div className="mt-8 rounded-xl border border-[#a78bfa]/20 bg-[#120727]/40 p-5">
      <div className="text-[12px] font-semibold tracking-widest text-[#a78bfa]">ADMIN • FCM TOKEN</div>
      <div className="mt-2 text-[12px] leading-5 text-white/70">
        Enable Firebase Web Push for Chrome (Android/Desktop). This panel is shown only in dev mode.
      </div>

      <div className="mt-4">
        <div className="text-[12px] font-semibold tracking-wide text-white/80">FCM Token</div>
        <textarea
          value={token}
          onChange={(e) => {
            setToken(e.target.value)
            setError('')
            setStatus('idle')
          }}
          rows={4}
          className="mt-2 w-full resize-none rounded-lg border border-white/10 bg-[#0b061a]/60 px-4 py-3 text-[12px] text-white outline-none placeholder:text-white/30 focus:border-[#a78bfa]/60"
          placeholder="Token will appear here after enabling web push..."
        />
        {error ? <div className="mt-1 text-[12px] text-red-400">{error}</div> : null}
      </div>

      <div className="mt-4 flex items-center gap-3">
        <button
          type="button"
          onClick={enableWebPush}
          disabled={status === 'requesting'}
          className="inline-flex items-center justify-center rounded-full border border-[#a78bfa]/40 bg-[#2b154f]/40 px-5 py-2 text-[11px] font-semibold tracking-widest text-white/80 hover:bg-[#2b154f]/55 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {status === 'requesting' ? 'ENABLING…' : 'ENABLE WEB PUSH'}
        </button>

        {status === 'enabled' ? <div className="text-[12px] text-emerald-200">Enabled.</div> : null}
      </div>
    </div>
  )
}
