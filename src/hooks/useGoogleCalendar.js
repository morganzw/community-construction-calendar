import { useState, useEffect, useCallback } from 'react'
import { config } from '../config.js'
import { parseGCalEvent } from '../utils/calendarHelpers.js'

const DISCOVERY_DOC = 'https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest'
const SCOPES = 'https://www.googleapis.com/auth/calendar.events'

export function useGoogleCalendar({ isEmbedded }) {
  const [gapiReady, setGapiReady] = useState(false)
  const [isSignedIn, setIsSignedIn] = useState(false)
  const [userProfile, setUserProfile] = useState(null)
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Initialize gapi — API key only (read-only) for embedded, full OAuth for standalone
  useEffect(() => {
    const initGapi = async () => {
      try {
        await new Promise((resolve) => window.gapi.load('client', resolve))
        await window.gapi.client.init({
          apiKey: config.googleApiKey,
          discoveryDocs: [DISCOVERY_DOC],
        })
        setGapiReady(true)
      } catch (err) {
        setError('Failed to initialize Google API. Check your API key in config.js.')
        setLoading(false)
      }
    }

    if (window.gapi) {
      initGapi()
    } else {
      // gapi script hasn't loaded yet — retry
      const timer = setInterval(() => {
        if (window.gapi) { clearInterval(timer); initGapi() }
      }, 200)
      return () => clearInterval(timer)
    }
  }, [])

  // Initialize Google Identity Services (OAuth) for standalone mode
  useEffect(() => {
    if (isEmbedded || !gapiReady) return
    if (!window.google?.accounts?.oauth2) {
      const timer = setInterval(() => {
        if (window.google?.accounts?.oauth2) { clearInterval(timer); initGIS() }
      }, 200)
      return () => clearInterval(timer)
    }
    initGIS()
  }, [gapiReady, isEmbedded])

  const initGIS = () => {
    window._tokenClient = window.google.accounts.oauth2.initTokenClient({
      client_id: config.googleClientId,
      scope: SCOPES,
      callback: async (response) => {
        if (response.error) { setError(response.error); return }
        setIsSignedIn(true)
        // Fetch basic profile from tokeninfo
        try {
          const info = await fetch(
            `https://oauth2.googleapis.com/tokeninfo?access_token=${response.access_token}`
          ).then(r => r.json())
          setUserProfile({ email: info.email })
        } catch {}
      },
    })
  }

  const signIn = () => {
    if (window._tokenClient) window._tokenClient.requestAccessToken()
  }

  const signOut = () => {
    const token = window.gapi.client.getToken()
    if (token) {
      window.google.accounts.oauth2.revoke(token.access_token)
      window.gapi.client.setToken(null)
    }
    setIsSignedIn(false)
    setUserProfile(null)
  }

  const fetchEvents = useCallback(async () => {
    if (!gapiReady) return
    setLoading(true)
    setError(null)
    try {
      const now = new Date()
      const future = new Date(now)
      future.setMonth(future.getMonth() + config.lookAheadMonths)

      const res = await window.gapi.client.calendar.events.list({
        calendarId: config.calendarId,
        timeMin: now.toISOString(),
        timeMax: future.toISOString(),
        showDeleted: false,
        singleEvents: true,
        orderBy: 'startTime',
        maxResults: 250,
      })
      setEvents((res.result.items ?? []).map(parseGCalEvent))
    } catch (err) {
      // If calendarId is placeholder, show a helpful message
      if (config.calendarId.includes('YOUR_')) {
        setError('demo')
      } else {
        setError(err.result?.error?.message ?? 'Failed to load calendar events.')
      }
    } finally {
      setLoading(false)
    }
  }, [gapiReady])

  useEffect(() => { fetchEvents() }, [fetchEvents])

  const createEvent = async (eventBody) => {
    if (!isSignedIn) throw new Error('Not signed in')
    const res = await window.gapi.client.calendar.events.insert({
      calendarId: config.calendarId,
      resource: eventBody,
    })
    await fetchEvents()
    return res.result
  }

  return { gapiReady, isSignedIn, userProfile, events, loading, error, signIn, signOut, createEvent, refetch: fetchEvents }
}
