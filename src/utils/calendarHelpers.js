import { config } from '../config.js'

// Parse a Google Calendar event into the shape the app uses
export function parseGCalEvent(gcalEvent) {
  const start = gcalEvent.start?.dateTime ?? gcalEvent.start?.date
  const end = gcalEvent.end?.dateTime ?? gcalEvent.end?.date

  // Event type is stored as the first word of the description or via extendedProperties
  const typeId = gcalEvent.extendedProperties?.private?.eventType
    ?? gcalEvent.extendedProperties?.shared?.eventType
    ?? 'other'

  const eventType = config.eventTypes.find(t => t.id === typeId) ?? config.eventTypes.at(-1)

  return {
    id: gcalEvent.id,
    title: gcalEvent.summary ?? 'Untitled',
    address: gcalEvent.location ?? '',
    start: new Date(start),
    end: new Date(end),
    description: gcalEvent.description ?? '',
    contact: gcalEvent.extendedProperties?.private?.contact ?? '',
    typeId,
    color: eventType.color,
    typeLabel: eventType.label,
    raw: gcalEvent,
  }
}

// Build the Google Calendar API event body from form data
export function buildGCalEvent({ title, address, start, end, typeId, description, contact }) {
  return {
    summary: title,
    location: address,
    description,
    start: { dateTime: new Date(start).toISOString() },
    end: { dateTime: new Date(end).toISOString() },
    extendedProperties: {
      private: { eventType: typeId, contact },
    },
  }
}

// Format a date range for display
export function formatDateRange(start, end) {
  const opts = { month: 'short', day: 'numeric' }
  const startStr = start.toLocaleDateString(undefined, { ...opts, year: 'numeric' })
  if (!end || start.toDateString() === end.toDateString()) return startStr
  return `${startStr} – ${end.toLocaleDateString(undefined, opts)}`
}

// Resolve an event type config object by id
export function getEventType(typeId) {
  return config.eventTypes.find(t => t.id === typeId) ?? config.eventTypes.at(-1)
}
