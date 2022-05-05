import * as React from "react"
import { format, addHours } from "date-fns"
import { format as formatFp } from "date-fns/fp"
import * as containerStyles from "./event.module.css"

const formatTime = date =>
  format(date, "h:mm aaa", { timezone: "America/New_York" })

// see https://github.com/gatsbyjs/gatsby/issues/22948
// and https://blog.logrocket.com/fixing-gatsbys-rehydration-issue/
const useLink = link => {
  const [stateLink, setStateLink] = React.useState("")

  React.useEffect(() => {
    setStateLink(link)
  }, [link])

  return stateLink
}

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

const formatCalendarDate = formatFp("yyyyMMdd'T'HHmmss")

const formatAllDayCalendarDate = formatFp("yyyyMMdd")

const getCalendarStartDate = event =>
  event.hasTime
    ? formatCalendarDate(event.date)
    : formatAllDayCalendarDate(event.date)

const getCalendarEndDate = event =>
  event.hasTime
    ? formatCalendarDate(addHours(event.date, 3))
    : formatAllDayCalendarDate(event.date)

const buildCalendarLink = event =>
  buildGoogleCalendarLink(
    encodeURIComponent(event.title),
    encodeURIComponent(event.location),
    encodeURIComponent(event.link),
    getCalendarStartDate(event),
    getCalendarEndDate(event)
  )

const Event = ({ event }) => {
  const link = useLink(event.link)
  const calendarLink = buildCalendarLink(event)

  return (
    <div>
      <h3>{link ? <a href={link}>{event.title}</a> : event.title}</h3>

      <p>{event.location}</p>

      {event.hasTime ? <p>{formatTime(event.date)}</p> : null}

      <div className={containerStyles.actions}>
        <a
          href={calendarLink}
          title="Add to Google Calendar"
          target="_blank"
          rel="noreferrer"
        >
          <Calendar />
          <span className={containerStyles.iconLinkDescription}>
            Add to Google Calendar
          </span>
        </a>
      </div>
    </div>
  )
}

export default Event
