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
        <p>
          A shared calendar for Alpine Villa neighbors coordinating construction and rebuild work in Altadena.
          Helping everyone plan around heavy equipment, deliveries, and street access.
        </p>
        <p>
          Click any bar on the chart to see event details. To add your own construction dates, click <strong>+ Add Event</strong> above — your neighbors will thank you.
        </p>
      </div>
    </header>
  )
}
