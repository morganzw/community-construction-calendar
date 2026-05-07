import { useState } from 'react'
import { config } from '../config.js'
import { getEventType } from '../utils/calendarHelpers.js'

const defaultForm = () => {
  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)
  tomorrow.setHours(8, 0, 0, 0)
  const end = new Date(tomorrow)
  end.setHours(17, 0, 0, 0)
  return {
    title: '',
    address: '',
    typeId: config.eventTypes[0].id,
    start: toLocalISOString(tomorrow),
    end: toLocalISOString(end),
    description: '',
    contact: '',
  }
}

// Opens a pre-filled Google Calendar event in a new tab — no OAuth needed.
// The user saves it themselves to the shared calendar.
function buildGCalUrl(form) {
  const type = getEventType(form.typeId)
  const title = form.title || `${type.label}${form.address ? ` — ${form.address}` : ''}`
  const details = [
    `Work type: ${type.label}`,
    form.contact ? `Contact: ${form.contact}` : '',
    form.description,
  ].filter(Boolean).join('\n')

  const fmt = (iso) => iso.replace(/[-:]/g, '').replace('T', 'T').slice(0, 15)
  const dates = `${fmt(form.start)}/${fmt(form.end)}`

  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: title,
    dates,
    details,
    location: form.address,
    add: config.calendarId,
  })
  return `https://calendar.google.com/calendar/render?${params}`
}

export default function EventForm({ onClose }) {
  const [form, setForm] = useState(defaultForm())
  const [error, setError] = useState(null)

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))

  const handleSubmit = (e) => {
    e.preventDefault()
    setError(null)
    if (!form.title.trim()) { setError('Please enter a title.'); return }
    if (new Date(form.start) >= new Date(form.end)) { setError('End must be after start.'); return }
    window.open(buildGCalUrl(form), '_blank', 'noopener')
    onClose()
  }

  return (
    <form onSubmit={handleSubmit}>
      <p style={{ fontSize: '0.82rem', color: '#6b7280', marginBottom: '1rem', lineHeight: 1.5 }}>
        Fill in your event details and click <strong>Open in Google Calendar</strong>. A pre-filled event will open in a new tab — just save it to the shared <em>{config.streetName}</em> calendar.
      </p>
      <div className="form-group">
        <label>Event Title *</label>
        <input value={form.title} onChange={e => set('title', e.target.value)}
          placeholder={`e.g. Foundation pour at 123 ${config.streetName}`} required />
      </div>
      <div className="form-group">
        <label>Address / Property</label>
        <input value={form.address} onChange={e => set('address', e.target.value)}
          placeholder={`e.g. 123 ${config.streetName}`} />
      </div>
      <div className="form-group">
        <label>Work Type</label>
        <select value={form.typeId} onChange={e => set('typeId', e.target.value)}>
          {config.eventTypes.map(t => (
            <option key={t.id} value={t.id}>{t.label}</option>
          ))}
        </select>
      </div>
      <div className="form-row">
        <div className="form-group">
          <label>Start *</label>
          <input type="datetime-local" value={form.start} onChange={e => set('start', e.target.value)} required />
        </div>
        <div className="form-group">
          <label>End *</label>
          <input type="datetime-local" value={form.end} onChange={e => set('end', e.target.value)} required />
        </div>
      </div>
      <div className="form-group">
        <label>Contact Name</label>
        <input value={form.contact} onChange={e => set('contact', e.target.value)}
          placeholder="Your name / contractor" />
      </div>
      <div className="form-group">
        <label>Notes</label>
        <textarea value={form.description} onChange={e => set('description', e.target.value)}
          placeholder="Street access needs, noise warnings, etc." />
      </div>
      {error && (
        <div style={{ color: '#ef4444', fontSize: '0.85rem', marginBottom: '1rem' }}>⚠ {error}</div>
      )}
      <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
        <button type="button" className="btn btn-outline" onClick={onClose}>Cancel</button>
        <button type="submit" className="btn btn-primary">Open in Google Calendar →</button>
      </div>
    </form>
  )
}

function toLocalISOString(date) {
  const offset = date.getTimezoneOffset()
  const local = new Date(date.getTime() - offset * 60000)
  return local.toISOString().slice(0, 16)
}
