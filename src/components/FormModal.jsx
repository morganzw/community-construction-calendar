import { useRef } from 'react'
import { config } from '../config.js'

export default function FormModal({ onClose, onSubmitted }) {
  const loadCount = useRef(0)

  const handleLoad = () => {
    loadCount.current += 1
    if (loadCount.current > 1) {
      // Second load = confirmation page = form was submitted
      onClose()
      onSubmitted()
    }
  }

  return (
    <iframe
      src={config.googleFormUrl}
      title="Submit Construction Event"
      onLoad={handleLoad}
      style={{ width: '100%', height: '70vh', border: 'none', borderRadius: '4px' }}
    />
  )
}
