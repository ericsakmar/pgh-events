import * as React from "react"
import { parseISO } from "date-fns"
import { formatInTimeZone } from "date-fns-tz"

const format = (date, dateFormat) =>
  formatInTimeZone(date, "America/New_York", dateFormat)

const formatDisplayDate = date => format(date, "EEE, MMM d")

const formatDisplayDateTime = date => format(date, "EEE, MMM d 'at' h:mm aaa")

const formatDateTime = date => format(date, "yyyy-MM-dd'T'HH:mm:ssXX")

const formatScreenReaderDateTime = date =>
  format(date, "MMMM d, yyyy 'at' h:mm:ss aa")

const formatScreenReaderDate = date => format(date, "MMMM d, yyyy")

const EventTime = ({ event }) => {
  const date = parseISO(event.date)

  return (
    <time dateTime={formatDateTime(date)}>
      <span className="visuallyHidden">
        {event.hasTime
          ? formatScreenReaderDateTime(date)
          : formatScreenReaderDate(date)}
      </span>

      {event.hasTime ? (
        <span aria-hidden="true">{formatDisplayDateTime(date)}</span>
      ) : (
        <span aria-hidden="true">{formatDisplayDate(date)}</span>
      )}
    </time>
  )
}

export default EventTime
