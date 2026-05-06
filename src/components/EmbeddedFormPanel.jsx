import { config } from '../config.js'

// Shown in embedded (iframe) mode — links out to the Google Form rather than
// using OAuth, since Google blocks auth flows inside iframes.
export default function EmbeddedFormPanel() {
  if (!config.googleFormUrl || config.googleFormUrl.includes('YOUR_FORM_ID')) {
    return (
      <div className="card" style={{ marginTop: '1rem' }}>
        <p style={{ fontSize: '0.85rem', color: '#6b7280' }}>
          Configure <code>googleFormUrl</code> in <code>config.js</code> to show the submission form here.
        </p>
      </div>
    )
  }

  return (
    <div style={{ marginTop: '1rem' }}>
      <h3 style={{ fontWeight: 700, marginBottom: '0.5rem', fontSize: '0.95rem' }}>Submit a Construction Event</h3>
      <iframe
        src={config.googleFormUrl}
        width="100%"
        height="600"
        frameBorder="0"
        marginHeight="0"
        marginWidth="0"
        title="Submit construction event"
        style={{ borderRadius: '8px', border: '1px solid #e5e7eb' }}
      >
        Loading form…
      </iframe>
    </div>
  )
}
