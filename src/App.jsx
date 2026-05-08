import { useState } from 'react'
import Header from './components/Header.jsx'
import GanttView from './components/GanttView.jsx'
import EventList from './components/EventList.jsx'
import FormModal from './components/FormModal.jsx'
import EmbeddedFormPanel from './components/EmbeddedFormPanel.jsx'
import { useGoogleCalendar } from './hooks/useGoogleCalendar.js'
import { DEMO_EVENTS } from './demoData.js'
import { config } from './config.js'

// Detect if running inside an iframe (Google Sites embed)
const isEmbedded = (() => {
  try { return window.self !== window.top } catch { return true }
})()

export default function App() {
  const [tab, setTab] = useState('gantt')
  const [showForm, setShowForm] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [countdown, setCountdown] = useState(null)

  const startCountdown = () => {
    setSubmitted(true)
    let secs = 5
    setCountdown(secs)
    const interval = setInterval(() => {
      secs -= 1
      setCountdown(secs)
      if (secs <= 0) {
        clearInterval(interval)
        window.location.reload()
      }
    }, 1000)
  }

  const { events, loading, error } = useGoogleCalendar({ isEmbedded })

  const isDemo = error === 'demo' || config.calendarId.includes('YOUR_')
  const displayEvents = isDemo ? DEMO_EVENTS : events

  return (
    <div className={`app${isEmbedded ? ' embedded' : ''}`}>
      <Header isEmbedded={isEmbedded} onAddEvent={() => setShowForm(true)} />

      <main className="main-content">
        {isDemo && (
          <div style={{
            background: '#fef3c7', border: '1px solid #fcd34d', borderRadius: '8px',
            padding: '0.65rem 1rem', marginBottom: '1rem', fontSize: '0.85rem', color: '#92400e'
          }}>
            <strong>Demo mode</strong> — update <code>calendarId</code> and <code>googleApiKey</code> in{' '}
            <code>src/config.js</code> to connect your real calendar.
          </div>
        )}

        {submitted && (
          <div style={{
            background: '#f0fdf4', border: '1px solid #86efac', borderRadius: '8px',
            padding: '0.65rem 1rem', marginBottom: '1rem', fontSize: '0.85rem', color: '#166534',
          }}>
            ✓ <strong>Event submitted!</strong> Refreshing in {countdown}s…{' '}
            <button
              onClick={() => window.location.reload()}
              style={{ background: 'none', border: 'none', color: '#166534', textDecoration: 'underline', cursor: 'pointer', fontSize: 'inherit', padding: 0 }}
            >
              Refresh now
            </button>
          </div>
        )}

        {error && !isDemo && (
          <div className="conflict-banner" style={{ marginBottom: '1rem' }}>
            <strong>Calendar error</strong> {error}
          </div>
        )}

        <div className="tabs">
          <button className={`tab-btn${tab === 'gantt' ? ' active' : ''}`} onClick={() => setTab('gantt')}>
            📊 Gantt Chart
          </button>
          <button className={`tab-btn${tab === 'list' ? ' active' : ''}`} onClick={() => setTab('list')}>
            📋 Event List
          </button>
          {isEmbedded && (
            <button className={`tab-btn${tab === 'submit' ? ' active' : ''}`} onClick={() => setTab('submit')}>
              ➕ Submit Event
            </button>
          )}
        </div>

        {loading && !isDemo ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#6b7280', padding: '2rem 0' }}>
            <span className="spinner dark" /> Loading calendar…
          </div>
        ) : (
          <>
            {tab === 'gantt' && <GanttView events={displayEvents} />}
            {tab === 'list'  && <EventList events={displayEvents} />}
            {tab === 'submit' && isEmbedded && <EmbeddedFormPanel />}
          </>
        )}
      </main>

      {showForm && (
        <div className="modal-backdrop" onClick={e => e.target === e.currentTarget && setShowForm(false)}>
          <div className="modal">
            <div className="modal-header">
              <h2>Add Construction Event</h2>
              <button className="modal-close" onClick={() => setShowForm(false)}>×</button>
            </div>
            <FormModal onClose={() => setShowForm(false)} onSubmitted={startCountdown} />
          </div>
        </div>
      )}
    </div>
  )
}
