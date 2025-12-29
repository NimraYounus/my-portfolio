import SectionTitle from './SectionTitle'

import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import { useState } from 'react'

import { db } from '../lib/firebase'
import NotificationTokenAdmin from './NotificationTokenAdmin'

export default function ContactSection() {
  const [values, setValues] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
  })
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle')
  const [submitError, setSubmitError] = useState('')

  const onChange = (key) => (e) => {
    setValues((v) => ({ ...v, [key]: e.target.value }))
    setErrors((prev) => ({ ...prev, [key]: '' }))
    setSubmitError('')
  }

  const validate = () => {
    const next = {}

    if (!values.name.trim()) next.name = 'Name is required.'
    if (!values.company.trim()) next.company = 'Company is required.'
    if (!values.message.trim()) next.message = 'Message is required.'

    const email = values.email.trim()
    if (!email) next.email = 'Email is required.'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) next.email = 'Enter a valid email.'

    setErrors(next)
    return Object.keys(next).length === 0
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    if (status === 'submitting') return

    const ok = validate()
    if (!ok) return

    setStatus('submitting')
    setSubmitError('')

    try {
      await addDoc(collection(db, 'contactMessages'), {
        name: values.name.trim(),
        email: values.email.trim(),
        company: values.company.trim(),
        message: values.message.trim(),
        createdAt: serverTimestamp(),
      })

      setStatus('success')
      setValues({ name: '', email: '', company: '', message: '' })
    } catch (err) {
      setStatus('error')
      setSubmitError(err?.message || 'Failed to send message. Please try again.')
    }
  }

  return (
    <section id="contact" className="pb-24">
      <SectionTitle>Contact</SectionTitle>
      <div className="mx-auto mt-6 max-w-xl rounded-xl border border-white/10 bg-white/5 p-6 shadow-[0_18px_70px_rgba(0,0,0,0.35)]">
        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="text-[12px] font-semibold tracking-wide text-white/80">Name*</label>
            <input
              value={values.name}
              onChange={onChange('name')}
              className="mt-2 w-full rounded-lg border border-white/10 bg-[#0b061a]/60 px-4 py-3 text-[13px] text-white outline-none placeholder:text-white/30 focus:border-[#a78bfa]/60"
              placeholder="Your name"
              autoComplete="name"
            />
            {errors.name ? <div className="mt-1 text-[12px] text-red-400">{errors.name}</div> : null}
          </div>

          <div>
            <label className="text-[12px] font-semibold tracking-wide text-white/80">Email*</label>
            <input
              value={values.email}
              onChange={onChange('email')}
              type="email"
              className="mt-2 w-full rounded-lg border border-white/10 bg-[#0b061a]/60 px-4 py-3 text-[13px] text-white outline-none placeholder:text-white/30 focus:border-[#a78bfa]/60"
              placeholder="you@example.com"
              autoComplete="email"
            />
            {errors.email ? <div className="mt-1 text-[12px] text-red-400">{errors.email}</div> : null}
          </div>

          <div>
            <label className="text-[12px] font-semibold tracking-wide text-white/80">Company*</label>
            <input
              value={values.company}
              onChange={onChange('company')}
              className="mt-2 w-full rounded-lg border border-white/10 bg-[#0b061a]/60 px-4 py-3 text-[13px] text-white outline-none placeholder:text-white/30 focus:border-[#a78bfa]/60"
              placeholder="Your company"
              autoComplete="organization"
            />
            {errors.company ? <div className="mt-1 text-[12px] text-red-400">{errors.company}</div> : null}
          </div>

          <div>
            <label className="text-[12px] font-semibold tracking-wide text-white/80">Message*</label>
            <textarea
              value={values.message}
              onChange={onChange('message')}
              rows={5}
              className="mt-2 w-full resize-none rounded-lg border border-white/10 bg-[#0b061a]/60 px-4 py-3 text-[13px] text-white outline-none placeholder:text-white/30 focus:border-[#a78bfa]/60"
              placeholder="Write your message..."
            />
            {errors.message ? <div className="mt-1 text-[12px] text-red-400">{errors.message}</div> : null}
          </div>

          {status === 'success' ? (
            <div className="rounded-lg border border-emerald-400/20 bg-emerald-400/10 px-4 py-3 text-[13px] text-emerald-200">
              Message sent successfully.
            </div>
          ) : null}

          {status === 'error' && submitError ? (
            <div className="rounded-lg border border-red-400/20 bg-red-400/10 px-4 py-3 text-[13px] text-red-200">
              {submitError}
            </div>
          ) : null}

          <div className="pt-2">
            <button
              type="submit"
              disabled={status === 'submitting'}
              className="inline-flex w-full items-center justify-center rounded-full border border-[#a78bfa]/40 bg-[#2b154f]/40 px-6 py-3 text-[12px] font-semibold tracking-widest text-white/80 hover:bg-[#2b154f]/55 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {status === 'submitting' ? 'SENDING…' : 'SEND MESSAGE'}
            </button>
          </div>
        </form>

        {/* {import.meta.env.DEV || import.meta.env.VITE_SHOW_NOTIFICATION_ADMIN === 'true' ? ( */}
          <NotificationTokenAdmin />
        {/* ) : null} */}
      </div>
    </section>
  )
}
