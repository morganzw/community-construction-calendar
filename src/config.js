// ─────────────────────────────────────────────────────────────────────────────
// Community Construction Calendar — Configuration
//
// When forking this repo for your own neighborhood, only this file needs to
// change. Fill in your Google Calendar ID, OAuth client ID, and street info.
// ─────────────────────────────────────────────────────────────────────────────

export const config = {
  // The ID of your shared Google Calendar.
  // Find it in Google Calendar → Settings → your calendar → "Calendar ID"
  calendarId: 'YOUR_CALENDAR_ID@group.calendar.google.com',

  // Google OAuth 2.0 client ID for the standalone web app (sign-in + submit).
  // Create one at console.cloud.google.com → APIs & Services → Credentials
  googleClientId: 'YOUR_GOOGLE_CLIENT_ID.apps.googleusercontent.com',

  // Google API key for read-only access (used in embedded/iframe mode — no login needed).
  // Same Google Cloud project → Credentials → API key (restrict to Calendar API)
  googleApiKey: 'YOUR_GOOGLE_API_KEY',

  // Your community's display info
  streetName: 'Midwick Drive',
  neighborhood: 'Altadena',
  city: 'Altadena, CA',

  // Optional: URL of the Google Form for the embedded-mode submission
  googleFormUrl: 'https://docs.google.com/forms/d/e/YOUR_FORM_ID/viewform?embedded=true',

  // How many months ahead to show on the calendar
  lookAheadMonths: 6,

  // Equipment/work types — customize for your community
  eventTypes: [
    { id: 'demolition',   label: 'Demolition',         color: '#ef4444' },
    { id: 'excavation',   label: 'Excavation / Grading', color: '#f97316' },
    { id: 'foundation',   label: 'Foundation',          color: '#eab308' },
    { id: 'framing',      label: 'Framing',             color: '#22c55e' },
    { id: 'concrete',     label: 'Concrete Pour',       color: '#6366f1' },
    { id: 'crane',        label: 'Crane / Heavy Lift',  color: '#ec4899' },
    { id: 'delivery',     label: 'Material Delivery',   color: '#14b8a6' },
    { id: 'inspection',   label: 'Inspection',          color: '#8b5cf6' },
    { id: 'other',        label: 'Other',               color: '#64748b' },
  ],
}
