// Shown when calendarId is not yet configured, so the app is usable out of the box
import { config } from './config.js'

function daysFromNow(n) {
  const d = new Date()
  d.setDate(d.getDate() + n)
  d.setHours(8, 0, 0, 0)
  return d
}
function hoursAfter(date, h) {
  return new Date(date.getTime() + h * 3600000)
}

const getType = (id) => config.eventTypes.find(t => t.id === id) ?? config.eventTypes.at(-1)

export const DEMO_EVENTS = [
  { id: 'd1', typeId: 'demolition', address: `101 ${config.streetName}`, start: daysFromNow(2), end: hoursAfter(daysFromNow(2), 8), contact: 'Maria G.' },
  { id: 'd2', typeId: 'excavation', address: `115 ${config.streetName}`, start: daysFromNow(4), end: hoursAfter(daysFromNow(5), 6), contact: 'Tom K.' },
  { id: 'd3', typeId: 'foundation', address: `101 ${config.streetName}`, start: daysFromNow(9), end: hoursAfter(daysFromNow(11), 4), contact: 'Maria G.' },
  { id: 'd4', typeId: 'crane',      address: `130 ${config.streetName}`, start: daysFromNow(9), end: hoursAfter(daysFromNow(9), 6), contact: 'BuildRight Inc.' },
  { id: 'd5', typeId: 'delivery',   address: `115 ${config.streetName}`, start: daysFromNow(12), end: hoursAfter(daysFromNow(12), 4), contact: 'Tom K.' },
  { id: 'd6', typeId: 'framing',    address: `101 ${config.streetName}`, start: daysFromNow(15), end: hoursAfter(daysFromNow(21), 0), contact: 'Maria G.' },
  { id: 'd7', typeId: 'concrete',   address: `130 ${config.streetName}`, start: daysFromNow(17), end: hoursAfter(daysFromNow(17), 8), contact: 'BuildRight Inc.' },
  { id: 'd8', typeId: 'inspection', address: `115 ${config.streetName}`, start: daysFromNow(22), end: hoursAfter(daysFromNow(22), 2), contact: 'County Inspector' },
].map(ev => ({
  ...ev,
  title: `${getType(ev.typeId).label} — ${ev.address.split(',')[0]}`,
  description: '',
  typeLabel: getType(ev.typeId).label,
  color: getType(ev.typeId).color,
}))
