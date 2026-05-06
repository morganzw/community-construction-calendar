import { useState, useEffect } from 'react'
import Header from './components/Header.jsx'
import GanttView from './components/GanttView.jsx'
import EventList from './components/EventList.jsx'
import EventForm from './components/EventForm.jsx'
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
  const [submitting, setSubmitting] = useState(false)

  const { gapiReady, isSignedIn, userProfile, events, loading, error,
          signIn, signOut, createEvent } = useGoogleCalendar({ isEmbedded })

  const isDemo = error === 'demo' || config.calendarId.includes('YOUR_')
  const displayEvents = isDemo ? DEMO_EVENTS : events

  const handleAddEvent = async (eventBody) => {
    setSubmitting(true)
    try {
      await createEvent(eventBody)
      setShowForm(false)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className={`app${isEmbedded ? ' embedded' : ''}`}>
      <Header
        isEmbedded={isEmbedded}
        isSignedIn={isSignedIn}
        userProfile={userProfile}
        onSignIn={signIn}
        onSignOut={signOut}
        onAddEvent={() => setShowForm(true)}
      />

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

        {/* Standalone add-event button for signed-in users on mobile / list view */}
        {!isEmbedded && !isSignedIn && tab === 'list' && (
          <div style={{ marginTop: '1.25rem', textAlign: 'center' }}>
            <button className="btn btn-primary" onClick={signIn}>
              Sign in with Google to add an event
            </button>
          </div>
        )}
      </main>

      {/* Add event modal — standalone mode only */}
      {showForm && (
        <div className="modal-backdrop" onClick={e => e.target === e.currentTarget && setShowForm(false)}>
          <div className="modal">
            <div className="modal-header">
              <h2>Add Construction Event</h2>
              <button className="modal-close" onClick={() => setShowForm(false)}>×</button>
            </div>
            <EventForm
              onSubmit={handleAddEvent}
              onClose={() => setShowForm(false)}
              submitting={submitting}
            />
          </div>
        </div>
      )}
    </div>
  )
}
