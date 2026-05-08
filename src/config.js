// ─────────────────────────────────────────────────────────────────────────────
// Community Construction Calendar — Configuration
//
// When forking this repo for your own neighborhood, only this file needs to
// change. Fill in your Google Calendar ID, OAuth client ID, and street info.
// ─────────────────────────────────────────────────────────────────────────────

export const config = {
  // The ID of your shared Google Calendar.
  // Find it in Google Calendar → Settings → your calendar → "Calendar ID"
  calendarId: 'fc4bcefff50be534acb408219894c73b81a6bb4a98a87ba84e20f59dae0e875c@group.calendar.google.com',

  // Google OAuth 2.0 client ID for the standalone web app (sign-in + submit).
  // Create one at console.cloud.google.com → APIs & Services → Credentials
  googleClientId: '512896218687-vvambvg466gtd996m7fe9tb09jqkcnqq.apps.googleusercontent.com',

  // Google API key for read-only access (used in embedded/iframe mode — no login needed).
  // Same Google Cloud project → Credentials → API key (restrict to Calendar API)
  googleApiKey: 'AIzaSyCKCx14hEzI9X_8IdNluxZAhkTOfIOEU24',

  // Your community's display info
  streetName: 'Alpine Villa',
  neighborhood: 'Altadena',
  city: 'Altadena, CA',
  calendarTitle: 'Alpine Villa Neighborhood Construction Calendar',

  // Google Form for submitting construction events (used in both standalone and embedded modes)
  googleFormUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSd98knPlfNSLRmIDFGGMwTszCFQRqnOfaQzKrmumzUmBFYA6g/viewform?embedded=true',

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
