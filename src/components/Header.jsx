import { config } from '../config.js'

export default function Header({ isEmbedded, onAddEvent }) {
  if (isEmbedded) return null

  return (
    <header className="header">
      <div>
        <h1>🏗 {config.streetName} Construction Calendar</h1>
        <div className="subtitle">{config.neighborhood} — neighbor coordination hub</div>
      </div>
      <div className="header-right">
        <button className="btn btn-outline btn-sm"
          style={{ background: 'rgba(255,255,255,.15)', border: '1px solid rgba(255,255,255,.3)', color: 'white' }}
          onClick={onAddEvent}>
          + Add Event
        </button>
      </div>
    </header>
  )
}
