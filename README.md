# Community Construction Calendar

A shared construction coordination calendar for neighborhoods rebuilding after disaster. Neighbors can see a **Gantt chart** of all upcoming construction activity on their street, spot scheduling conflicts, and submit their own events — all synced with Google Calendar.

Built for the Eaton Fire recovery community in Altadena, CA. Designed to be forked by any neighborhood.

---

## Features

- **Gantt chart** — see the whole street's construction timeline at a glance
- **Conflict detection** — overlapping heavy equipment days are flagged automatically
- **Google Calendar sync** — events live in a shared GCal everyone can subscribe to
- **Two modes:**
  - **Standalone** — visit the GitHub Pages URL, sign in with Google, submit events directly
  - **Embedded** — drop the URL into a Google Site iframe; uses a Google Form for submissions
- **Demo mode** — works out of the box with sample data before you wire up a real calendar

---

## Setup for your neighborhood (fork this repo)

### 1. Fork & clone
```bash
git clone https://github.com/YOUR_USERNAME/community-construction-calendar.git
cd community-construction-calendar
npm install
```

### 2. Create a shared Google Calendar
1. Go to [calendar.google.com](https://calendar.google.com)
2. Create a new calendar (name it e.g. "Oak Street Construction")
3. Share it with your neighbors (view access)
4. Copy the **Calendar ID** from Settings → your calendar → scroll to "Calendar ID"

### 3. Set up a Google Cloud project
1. Go to [console.cloud.google.com](https://console.cloud.google.com)
2. Create a new project
3. Enable the **Google Calendar API**
4. Create an **API key** (restrict it to the Calendar API and your GitHub Pages domain)
5. Create an **OAuth 2.0 Client ID** (type: Web application)
   - Authorized JavaScript origins: `https://YOUR_USERNAME.github.io`
   - Authorized redirect URIs: `https://YOUR_USERNAME.github.io/community-construction-calendar/`

### 4. Edit `src/config.js`
```js
calendarId:    'xxxx@group.calendar.google.com',  // from step 2
googleClientId: 'xxxx.apps.googleusercontent.com', // from step 3
googleApiKey:  'AIzaSy...',                        // from step 3
streetName:    'Oak Street',
neighborhood:  'Your Town',
```

Also update `vite.config.js` — set `base` to your repo name:
```js
base: '/your-repo-name/',
```

### 5. Deploy to GitHub Pages
```bash
git add -A && git commit -m "configure for our street"
git push
```
Then in your GitHub repo: **Settings → Pages → Source: GitHub Actions**.

The site will be live at `https://YOUR_USERNAME.github.io/your-repo-name/`

---

## Google Form + Apps Script (embedded mode)

For the Google Sites embed, submissions go through a Google Form so neighbors don't need to log in.

**Form fields (exact names):**
- Event Title
- Address / Property
- Work Type *(dropdown: Demolition, Excavation / Grading, Foundation, Framing, Concrete Pour, Crane / Heavy Lift, Material Delivery, Inspection, Other)*
- Start Date & Time
- End Date & Time
- Contact Name
- Notes

**Apps Script:**
1. Open the form → Extensions → Apps Script
2. Paste the contents of `apps-script/formSync.gs`
3. Set `CALENDAR_ID` to your calendar ID
4. Add a trigger: `onFormSubmit` → From form → On form submit

Then paste your form's embed URL into `config.js` → `googleFormUrl`.

---

## Embedding in Google Sites

1. Open your Google Site
2. Insert → Embed → URL
3. Paste your GitHub Pages URL
4. Resize the embed to taste (recommend ~600px tall)

The app auto-detects it's in an iframe and shows the Gantt + a "Submit Event" tab that loads your Google Form.

---

## Local development

```bash
npm run dev
```

The app runs in demo mode with sample data until you add real credentials to `config.js`.

---

## Tech stack

- [React](https://react.dev) + [Vite](https://vitejs.dev)
- [Frappe Gantt](https://frappe.io/gantt) — Gantt chart
- Google Calendar API + Google Identity Services (OAuth)
- GitHub Pages — free hosting
- Google Apps Script — form → calendar sync

---

## License

MIT — fork freely, adapt for your street.
