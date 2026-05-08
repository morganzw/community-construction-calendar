import { config } from '../config.js'

export default function EventForm({ onClose }) {
  return (
    <div>
      <p style={{ fontSize: '0.82rem', color: '#6b7280', marginBottom: '0.75rem', lineHeight: 1.5 }}>
        Fill out the form below. Your event will be added to the shared{' '}
        <em>Alpine Villa Construction</em> calendar automatically.
      </p>
      <iframe
        src={config.googleFormUrl}
        width="100%"
        height="560"
        frameBorder="0"
        marginHeight="0"
        marginWidth="0"
        title="Add construction event"
        style={{ borderRadius: '6px', border: '1px solid #e5e7eb', display: 'block' }}
      >
        Loading form…
      </iframe>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '0.75rem' }}>
        <button className="btn btn-outline" onClick={onClose}>Close</button>
      </div>
    </div>
  )
}
