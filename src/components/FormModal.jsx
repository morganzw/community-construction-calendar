import { useRef, useState } from 'react'
import { config } from '../config.js'

export default function FormModal({ onClose }) {
  const loadCount = useRef(0)
  const [submitted, setSubmitted] = useState(false)

  const handleLoad = () => {
    loadCount.current += 1
    if (loadCount.current > 1) {
      // Second load = confirmation page = form was submitted
      setSubmitted(true)
      setTimeout(() => {
        onClose()
        window.location.reload()
      }, 1500)
    }
  }

  return (
    <>
      {submitted ? (
        <div style={{ textAlign: 'center', padding: '2rem', color: '#16a34a' }}>
          <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>✓</div>
          <p style={{ fontWeight: 600 }}>Event submitted! Refreshing calendar…</p>
        </div>
      ) : (
        <iframe
          src={config.googleFormUrl}
          title="Submit Construction Event"
          onLoad={handleLoad}
          style={{
            width: '100%',
            height: '70vh',
            border: 'none',
            borderRadius: '4px',
          }}
        />
      )}
    </>
  )
}
