"use client"

import React, { useEffect, useState } from 'react'

type Feedback = {
  id: string
  name?: string
  email?: string
  rating?: number
  comments?: string
  createdAt?: string
}

export default function FeedbackList({ templateId }: { templateId: string }) {
  const [items, setItems] = useState<Feedback[] | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let mounted = true

    async function load() {
      setLoading(true)
      try {
        const base = process.env.NEXT_PUBLIC_PAYLOAD_URL || ''
        const url = (base || '') + `/api/feedbacks?where[template][equals]=${templateId}&sort=-createdAt&limit=10`
        const res = await fetch(url)
        if (!res.ok) throw new Error('Failed to load feedbacks')
        const data = await res.json()
        if (mounted) setItems(data.docs || [])
      } catch (err) {
        console.error(err)
        if (mounted) setItems([])
      } finally {
        if (mounted) setLoading(false)
      }
    }

    if (templateId) load()
    return () => {
      mounted = false
    }
  }, [templateId])

  if (loading) return <p>Loading feedback…</p>
  if (!items || items.length === 0) return <p>No feedback yet — be the first to share.</p>

  return (
    <div className="feedback-list">
      {items.map((f) => (
        <div key={f.id} className="feedback-item">
          <div className="feedback-meta">
            <strong>{f.name || 'Anonymous'}</strong>
            <span className="feedback-rating">{f.rating ?? '-' } ⭐</span>
            <span className="feedback-date">{f.createdAt ? new Date(f.createdAt).toLocaleString() : ''}</span>
          </div>
          {f.comments && <p className="feedback-comments">{f.comments}</p>}
        </div>
      ))}
    </div>
  )
}
