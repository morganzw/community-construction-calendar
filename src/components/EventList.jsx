import { conflictingIds } from '../utils/conflicts.js'
import { formatDateRange } from '../utils/calendarHelpers.js'
import { findConflicts } from '../utils/conflicts.js'

export default function EventList({ events }) {
  const conflictIds = conflictingIds(events)
  const conflicts = findConflicts(events)

  if (events.length === 0) {
    return (
      <div className="empty-state">
        <svg width="48" height="48" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
        <p>No upcoming events.</p>
      </div>
    )
  }

  return (
    <div>
      {conflicts.length > 0 && (
        <div className="conflict-banner">
          <strong>⚠ {conflicts.length} scheduling conflict{conflicts.length > 1 ? 's' : ''} detected</strong>
          {conflicts.map(([a, b], i) => (
            <div key={i} style={{ fontSize: '0.8rem', marginTop: '0.2rem' }}>
              {a.title} &amp; {b.title} overlap on {formatDateRange(
                new Date(Math.max(a.start, b.start)),
                new Date(Math.min(a.end, b.end))
              )}
            </div>
          ))}
        </div>
      )}
      <div className="event-list">
        {events.map(ev => (
          <div className="event-row" key={ev.id}
            style={conflictIds.has(ev.id) ? { borderColor: '#fca5a5' } : {}}>
            <div className="event-color-bar" style={{ background: ev.color }} />
            <div className="event-info">
              <div className="event-title">
                {ev.title}
                {conflictIds.has(ev.id) && (
                  <span style={{ marginLeft: '0.4rem', fontSize: '0.75rem', color: '#ef4444', fontWeight: 500 }}>
                    ⚠ conflict
                  </span>
                )}
              </div>
              <div className="event-meta">
                {ev.address && <span>📍 {ev.address} · </span>}
                <span>🗓 {formatDateRange(ev.start, ev.end)}</span>
                {ev.contact && <span> · 👤 {ev.contact}</span>}
              </div>
              {ev.description && (
                <div style={{ fontSize: '0.8rem', marginTop: '0.3rem', color: '#374151' }}>{ev.description}</div>
              )}
            </div>
            <div style={{ fontSize: '0.75rem', color: ev.color, fontWeight: 600, whiteSpace: 'nowrap' }}>
              {ev.typeLabel}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
