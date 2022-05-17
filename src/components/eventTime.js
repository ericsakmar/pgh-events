import * as React from "react"
import { format } from "date-fns-tz"

// can't pass options to this when using the fp version
const formatTime = date =>
  format(date, "h:mm aaa", { timezone: "America/New_York" })

const formatDateTime = date =>
  format(date, "yyyy-MM-dd'T'HH:mm:ssXX", { timezone: "America/New_York" })

const formatScreenReaderDateTime = rawDate =>
  new Date(rawDate).toLocaleString(undefined, {
    dateStyle: "long",
    timeStyle: "medium"
  })

const formatScreenReaderDate = rawDate =>
  new Date(rawDate).toLocaleString(undefined, { dateStyle: "long" })

const EventTime = ({ event }) => {
  console.log(
    new Date(event.date).toLocaleString(undefined, {
      dateStyle: "full",
      timeStyle: "full"
    })
  )

  return (
    <time dateTime={formatDateTime(event.date)}>
      <span className="visuallyHidden">
        {event.hasTime
          ? formatScreenReaderDateTime(event.date)
          : formatScreenReaderDate(event.date)}
      </span>

      {event.hasTime ? (
        <span aria-hidden="true">{formatTime(event.date)}</span>
      ) : null}
    </time>
  )
}

export default EventTime
