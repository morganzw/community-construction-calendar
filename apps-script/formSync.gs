/**
 * Community Construction Calendar — Google Apps Script
 *
 * Paste this entire file into https://script.google.com
 * Connect it to your Google Form via Extensions → Apps Script,
 * then set a "On form submit" trigger.
 *
 * The form should have these fields (exact names matter):
 *   - Event Title
 *   - Address / Property
 *   - Work Type          (dropdown matching eventTypes in config.js)
 *   - Start Date & Time  (date/time question)
 *   - End Date & Time    (date/time question)
 *   - Contact Name
 *   - Notes
 */

// ── Configure these two values ──────────────────────────────────────────────
var CALENDAR_ID = 'YOUR_CALENDAR_ID@group.calendar.google.com';
var NOTIFY_EMAIL = '';  // optional: email to notify on new submissions
// ────────────────────────────────────────────────────────────────────────────

// Event type → color map (matches config.js)
var TYPE_COLORS = {
  'Demolition':           CalendarApp.EventColor.RED,
  'Excavation / Grading': CalendarApp.EventColor.ORANGE,
  'Foundation':           CalendarApp.EventColor.YELLOW,
  'Framing':              CalendarApp.EventColor.GREEN,
  'Concrete Pour':        CalendarApp.EventColor.BLUE,
  'Crane / Heavy Lift':   CalendarApp.EventColor.PINK,
  'Material Delivery':    CalendarApp.EventColor.TEAL,
  'Inspection':           CalendarApp.EventColor.PURPLE,
  'Other':                CalendarApp.EventColor.GRAPHITE,
};

function onFormSubmit(e) {
  var responses = e.namedValues;

  var title    = getVal(responses, 'Event Title')         || 'Untitled';
  var address  = getVal(responses, 'Address / Property')  || '';
  var typeStr  = getVal(responses, 'Work Type')           || 'Other';
  var startStr = getVal(responses, 'Start Date & Time')   || '';
  var endStr   = getVal(responses, 'End Date & Time')     || '';
  var contact  = getVal(responses, 'Contact Name')        || '';
  var notes    = getVal(responses, 'Notes')               || '';

  if (!startStr || !endStr) {
    Logger.log('Missing start or end time — skipping.');
    return;
  }

  var start = new Date(startStr);
  var end   = new Date(endStr);

  if (isNaN(start) || isNaN(end) || end <= start) {
    Logger.log('Invalid date range — skipping.');
    return;
  }

  var cal = CalendarApp.getCalendarById(CALENDAR_ID);
  if (!cal) {
    Logger.log('Calendar not found: ' + CALENDAR_ID);
    return;
  }

  var description = notes;
  if (contact) description = 'Contact: ' + contact + '\n' + description;

  var event = cal.createEvent(title, start, end, {
    location: address,
    description: description.trim(),
  });

  var color = TYPE_COLORS[typeStr];
  if (color) event.setColor(color);

  // Store type in event description prefix for the webapp to read
  event.setDescription('[type:' + typeStr + ']\n' + description.trim());

  Logger.log('Created event: ' + event.getId());

  if (NOTIFY_EMAIL) {
    MailApp.sendEmail({
      to: NOTIFY_EMAIL,
      subject: '[Construction Calendar] New event: ' + title,
      body: [
        'A new construction event was submitted:',
        '',
        'Title:    ' + title,
        'Address:  ' + address,
        'Type:     ' + typeStr,
        'Start:    ' + start.toLocaleString(),
        'End:      ' + end.toLocaleString(),
        'Contact:  ' + contact,
        'Notes:    ' + notes,
      ].join('\n'),
    });
  }
}

function getVal(namedValues, key) {
  var arr = namedValues[key];
  return arr && arr[0] ? arr[0].trim() : '';
}
