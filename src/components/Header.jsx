import { config } from '../config.js'

export default function Header({ isEmbedded, onAddEvent }) {
  if (isEmbedded) return null

  return (
    <header className="header">
      <div className="header-top">
        <h1>{config.calendarTitle}</h1>
        <div className="header-right">
          <button className="btn btn-outline btn-sm"
            style={{ background: 'rgba(255,255,255,.15)', border: '1px solid rgba(255,255,255,.4)', color: 'white' }}
            onClick={onAddEvent}>
            + Add Event
          </button>
        </div>
      </div>
      <div className="header-body">
        <p>A shared calendar for Alpine Villa — Helping everyone plan around heavy equipment, deliveries, and street access.</p>
        <p style={{ marginTop: '0.75rem', fontWeight: 600 }}>Instructions:</p>
        <ul style={{ marginTop: '0.3rem', paddingLeft: '1.25rem', lineHeight: 1.8 }}>
          <li>Click any bar on the chart below to see event details, and conflicts.</li>
          <li>To add your own construction dates, click <strong>+ Add Event</strong> (upper right).</li>
        </ul>
      </div>
    </header>
  )
}
