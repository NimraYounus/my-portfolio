import { onMessage } from 'firebase/messaging'
import { useEffect } from 'react'

import { getMessagingIfSupported } from '../lib/firebase'

export default function FcmForegroundListener() {
  useEffect(() => {
    let unsub = null

    ;(async () => {
      try {
        const messaging = await getMessagingIfSupported()
        if (!messaging) return

        unsub = onMessage(messaging, (payload) => {
          const title = payload?.notification?.title || 'New Notification'
          const body = payload?.notification?.body || ''

          // If permission is granted, show a browser notification for easy local verification.
          // Otherwise, log to console.
          if ('Notification' in window && Notification.permission === 'granted') {
            // Foreground notifications are not automatically shown by browsers.
            // We show it manually for dev/testing.
            new Notification(title, { body })
          }

          // Always log for debugging.
          // eslint-disable-next-line no-console
          console.log('[FCM foreground message]', payload)
        })
      } catch (e) {
        // eslint-disable-next-line no-console
        console.warn('FCM foreground listener failed to init', e)
      }
    })()

    return () => {
      try {
        if (typeof unsub === 'function') unsub()
      } catch {
        // ignore
      }
    }
  }, [])

  return null
}
