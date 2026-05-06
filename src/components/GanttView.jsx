import { useEffect, useRef } from 'react'
import Gantt from 'frappe-gantt'
import { config } from '../config.js'
import { conflictingIds } from '../utils/conflicts.js'
import { formatDateRange } from '../utils/calendarHelpers.js'

export default function GanttView({ events }) {
  const containerRef = useRef(null)
  const ganttRef = useRef(null)

  useEffect(() => {
    if (!containerRef.current || events.length === 0) return

    const conflictIds = conflictingIds(events)

    const tasks = events.map(ev => ({
      id: ev.id,
      name: ev.address ? `${ev.address.split(',')[0]} — ${ev.typeLabel}` : ev.title,
      start: formatForFrappe(ev.start),
      end: formatForFrappe(ev.end),
      progress: 0,
      custom_class: conflictIds.has(ev.id) ? 'conflict-bar' : '',
    }))

    // Frappe Gantt mutates the container — clear it first
    containerRef.current.innerHTML = ''

    ganttRef.current = new Gantt(containerRef.current, tasks, {
      view_mode: 'Week',
      date_format: 'YYYY-MM-DD',
      bar_height: 28,
      bar_corner_radius: 4,
      arrow_curve: 4,
      padding: 18,
      popup_trigger: 'click',
      custom_popup_html: (task) => {
        const ev = events.find(e => e.id === task.id)
        if (!ev) return ''
        const isConflict = conflictIds.has(ev.id)
        return `
          <div style="padding:10px 12px; min-width:200px; font-family:system-ui,sans-serif">
            <div style="font-weight:700; margin-bottom:4px; color:#111">${ev.title}</div>
            ${ev.address ? `<div style="font-size:12px;color:#555;margin-bottom:2px">📍 ${ev.address}</div>` : ''}
            <div style="font-size:12px;color:#555;margin-bottom:2px">🗓 ${formatDateRange(ev.start, ev.end)}</div>
            <div style="font-size:12px;color:#555;margin-bottom:2px">🏗 ${ev.typeLabel}</div>
            ${ev.contact ? `<div style="font-size:12px;color:#555">👤 ${ev.contact}</div>` : ''}
            ${isConflict ? `<div style="font-size:11px;color:#ef4444;margin-top:6px;font-weight:600">⚠ Schedule conflict</div>` : ''}
          </div>`
      },
    })

    // Colorize bars by event type
    events.forEach(ev => {
      const bar = containerRef.current.querySelector(`[data-id="${ev.id}"] .bar`)
      if (bar) bar.style.fill = ev.color
    })
  }, [events])

  if (events.length === 0) {
    return (
      <div className="empty-state">
        <svg width="48" height="48" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        <p>No upcoming construction events found.</p>
        <p style={{ marginTop: '0.4rem', fontSize: '0.8rem' }}>Add the first event to get started.</p>
      </div>
    )
  }

  return (
    <div>
      <Legend events={events} />
      <div className="card gantt-wrap" style={{ padding: '0.5rem' }}>
        <div ref={containerRef} />
      </div>
      <style>{`
        .gantt .bar { rx: 4; ry: 4; }
        .conflict-bar .bar { stroke: #ef4444 !important; stroke-width: 2px !important; }
      `}</style>
    </div>
  )
}

function Legend({ events }) {
  const seen = new Set()
  const types = events.filter(ev => {
    if (seen.has(ev.typeId)) return false
    seen.add(ev.typeId)
    return true
  })
  return (
    <div className="legend">
      {types.map(ev => (
        <span className="legend-item" key={ev.typeId}>
          <span className="legend-dot" style={{ background: ev.color }} />
          {ev.typeLabel}
        </span>
      ))}
      <span className="legend-item">
        <span className="legend-dot" style={{ background: 'white', border: '2px solid #ef4444' }} />
        Conflict
      </span>
    </div>
  )
}

function formatForFrappe(date) {
  const d = new Date(date)
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}
