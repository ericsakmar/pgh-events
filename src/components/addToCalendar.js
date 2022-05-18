import * as React from "react"
import { addHours, parseISO } from "date-fns"
import { format } from "date-fns/fp"

const formatCalendarDate = format("yyyyMMdd'T'HHmmss")
const formatAllDayCalendarDate = format("yyyyMMdd")

// from https://systemuicons.com/
// and https://kittygiraudel.com/2020/12/10/accessible-icon-links/
const Calendar = () => (
  <svg
    height="21"
    viewBox="0 0 21 21"
    width="21"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    focusable="false"
  >
    <g
      fill="none"
      fillRule="evenodd"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      transform="translate(2 2)"
    >
      <path d="m2.5.5h12c1.1045695 0 2 .8954305 2 2v12c0 1.1045695-.8954305 2-2 2h-12c-1.1045695 0-2-.8954305-2-2v-12c0-1.1045695.8954305-2 2-2z" />
      <path d="m.5 4.5h16" />
      <path d="m8.5 7.5v6.056" />
      <path d="m8.5 7.5v6" transform="matrix(0 1 -1 0 19 2)" />
    </g>
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

  return (
    <a
      href={calendarLink}
      title="Add to Google Calendar"
      target="_blank"
      rel="noreferrer"
    >
      <Calendar />
      <span className="visuallyHidden">Add to Google Calendar</span>
    </a>
  )
}

export default AddToCalendar
