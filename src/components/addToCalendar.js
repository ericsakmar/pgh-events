import * as React from "react"
import { addHours, parseISO } from "date-fns"
import { formatInTimeZone } from "date-fns-tz"

const format = (date, dateFormat) =>
  formatInTimeZone(date, "America/New_York", dateFormat)

const formatCalendarDate = date => format(date, "yyyyMMdd'T'HHmmss")
const formatAllDayCalendarDate = date => format(date, "yyyyMMdd")

// from https://feathericons.com/
// and https://kittygiraudel.com/2020/12/10/accessible-icon-links/
export const CalendarIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="feather feather-calendar"
    aria-hidden="true"
    focusable="false"
  >
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
    <line x1="16" y1="2" x2="16" y2="6"></line>
    <line x1="8" y1="2" x2="8" y2="6"></line>
    <line x1="3" y1="10" x2="21" y2="10"></line>
  </svg>
)

const buildGoogleCalendarLink = (title, location, details, start, end) =>
  `https://www.google.com/calendar/render?action=TEMPLATE&sf=true&output=xml&text=${title}&location=${location}&details=${details}&dates=${start}/${end}&ctz=America/New_York`

const getCalendarStartDate = event =>
  event.hasTime
    ? formatCalendarDate(parseISO(event.date))
    : formatAllDayCalendarDate(parseISO(event.date))

const getCalendarEndDate = event =>
  event.hasTime
    ? formatCalendarDate(addHours(parseISO(event.date), 3))
    : formatAllDayCalendarDate(parseISO(event.date))

const buildCalendarLink = event =>
  buildGoogleCalendarLink(
    encodeURIComponent(event.title),
    encodeURIComponent(event.location),
    encodeURIComponent(event.link),
    getCalendarStartDate(event),
    getCalendarEndDate(event)
  )

const AddToCalendar = ({ event }) => {
  const calendarLink = buildCalendarLink(event)

  const handleClick = () => {
    window.open(calendarLink, "_blank")
  }

  return (
    <button onClick={handleClick} className="buttonLink">
      <div className="buttonIcon">
        <CalendarIcon />
      </div>
      <p>Add to Calendar</p>
    </button>
  )
}

export default AddToCalendar
