"use client"

import React, { useState } from 'react'

export default function FeedbackForm({ templateId, onSuccess }: { templateId: string; onSuccess?: () => void }) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [rating, setRating] = useState(5)
  const [comments, setComments] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [message, setMessage] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSubmitting(true)
    setMessage(null)

    try {
      const base = process.env.NEXT_PUBLIC_PAYLOAD_URL || ''
      const url = (base || '') + '/api/feedbacks'

      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          template: templateId,
          name: name || undefined,
          email: email || undefined,
          rating: Number(rating),
          comments: comments || undefined,
        }),
      })

      if (!res.ok) throw new Error('Failed to submit feedback')

      setMessage('Thanks — your feedback was submitted.')
      setName('')
      setEmail('')
      setRating(5)
      setComments('')
      onSuccess?.()
    } catch (err: any) {
      console.error(err)
      setMessage(err?.message || 'Submission failed')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form className="feedback-form" onSubmit={handleSubmit}>
      <div className="feedback-grid">
        <input
          className="input"
          placeholder="Your name (optional)"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          className="input"
          placeholder="Email (optional)"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label className="rating-label">
          Rating
          <select value={rating} onChange={(e) => setRating(Number(e.target.value))}>
            {[5, 4, 3, 2, 1].map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
        </label>
      </div>

      <textarea
        className="textarea"
        placeholder="Share your thoughts about this template"
        value={comments}
        onChange={(e) => setComments(e.target.value)}
        rows={4}
      />

      <div className="form-actions">
        <button className="btn btn-primary" type="submit" disabled={submitting}>
          {submitting ? 'Submitting...' : 'Send Feedback'}
        </button>
      </div>

      {message && <p className="form-message">{message}</p>}
    </form>
  )
}
