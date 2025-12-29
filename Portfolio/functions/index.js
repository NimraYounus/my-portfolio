import { onDocumentCreated } from 'firebase-functions/v2/firestore';
import { initializeApp } from 'firebase-admin/app';
import { getFirestore, FieldValue } from 'firebase-admin/firestore';
import { getMessaging } from 'firebase-admin/messaging';
import sgMail from '@sendgrid/mail';
import dotenv from 'dotenv';

dotenv.config();

initializeApp();

const db = getFirestore();

export const onContactMessageCreated = onDocumentCreated('contactMessages/{messageId}', async (event) => {
  const snap = event.data;
  if (!snap) return;

  const data = snap.data();

  const result = {
    email: { attempted: false, sent: false, error: '' },
    push: { attempted: false, sent: false, error: '' },
  };

  const toEmail = process.env.CONTACT_TO_EMAIL;
  const fromEmail = process.env.SENDGRID_FROM_EMAIL;
  const sendgridApiKey = process.env.SENDGRID_API_KEY;

  result.email.attempted = true;
  if (sendgridApiKey && toEmail && fromEmail) {
    try {
      sgMail.setApiKey(sendgridApiKey);

      const subject = `New portfolio contact: ${data?.name || ''} (${data?.company || ''})`;
      const createdAt = data?.createdAt?.toDate ? data.createdAt.toDate().toISOString() : String(data?.createdAt || '');
      const text = [
        `Name: ${data?.name || ''}`,
        `Email: ${data?.email || ''}`,
        `Company: ${data?.company || ''}`,
        `Message:`,
        `${data?.message || ''}`,
        ``,
        `CreatedAt: ${createdAt}`,
        `DocId: ${snap.id}`,
      ].join('\n');

      await sgMail.send({
        to: toEmail,
        from: fromEmail,
        subject,
        text,
      });
      result.email.sent = true;
    } catch (err) {
      result.email.error = err?.message || String(err);
      console.error('SendGrid email failed', { messageId: snap.id, error: result.email.error });
    }
  } else {
    result.email.error = 'Missing SENDGRID_API_KEY / CONTACT_TO_EMAIL / SENDGRID_FROM_EMAIL';
    console.warn('SendGrid not configured; skipping email', { messageId: snap.id });
  }

  result.push.attempted = true;
  try {
    const personalDoc = await db.collection('notificationTokens').doc('personal').get();
    const personalToken = personalDoc.exists ? personalDoc.data()?.token : null;
    const token = typeof personalToken === 'string' && personalToken.length > 0 ? personalToken : '';

    if (token) {
      const resp = await getMessaging().send({
        token,
        notification: {
          title: 'New Portfolio Contact',
          body: `${data?.name || ''} • ${data?.company || ''}`,
        },
        data: {
          messageId: snap.id,
          email: String(data?.email || ''),
        },
        android: {
          priority: 'high',
        },
      });

      result.push.sent = Boolean(resp);
    } else {
      result.push.error = 'No personal token found at notificationTokens/personal';
      console.warn('No personal FCM token available; skipping push', { messageId: snap.id });
    }
  } catch (err) {
    result.push.error = err?.message || String(err);
    console.error('FCM push failed', { messageId: snap.id, error: result.push.error });
  }

  await snap.ref.update({
    processedAt: FieldValue.serverTimestamp(),
    notificationStatus: {
      email: result.email,
      push: result.push,
    },
  });
});
