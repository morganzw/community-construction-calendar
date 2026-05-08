import { config } from '../config.js'

export default function Header({ isEmbedded, onAddEvent }) {
  if (isEmbedded) return null

  return (
    <header className="header">
      <div>
        <h1>{config.calendarTitle}</h1>
        <div className="subtitle">Altadena, CA — neighbor coordination</div>
      </div>
      <div className="header-right">
        <button className="btn btn-outline btn-sm"
          style={{ background: 'rgba(255,255,255,.15)', border: '1px solid rgba(255,255,255,.4)', color: 'white' }}
          onClick={onAddEvent}>
          + Add Event
        </button>
      </div>
    </header>
  )
}
