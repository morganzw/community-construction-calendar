import { config } from '../config.js'

export default function Header({ isEmbedded, isSignedIn, userProfile, onSignIn, onSignOut, onAddEvent }) {
  if (isEmbedded) return null

  return (
    <header className="header">
      <div>
        <h1>🏗 {config.streetName} Construction Calendar</h1>
        <div className="subtitle">{config.neighborhood} — neighbor coordination hub</div>
      </div>
      <div className="header-right">
        {isSignedIn ? (
          <>
            <button className="btn btn-outline btn-sm" style={{ background: 'rgba(255,255,255,.15)', border: '1px solid rgba(255,255,255,.3)', color: 'white' }} onClick={onAddEvent}>
              + Add Event
            </button>
            <div className="auth-pill" onClick={onSignOut} title="Click to sign out">
              <span>👤</span>
              <span>{userProfile?.email ?? 'Signed in'}</span>
            </div>
          </>
        ) : (
          <button className="auth-pill" onClick={onSignIn}>
            Sign in with Google to add events
          </button>
        )}
      </div>
    </header>
  )
}
