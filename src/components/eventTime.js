import * as React from "react"
import { format } from "date-fns"

const formatTime = date => format(date, "h:mm aaa")

const formatDateTime = date => format(date, "yyyy-MM-dd'T'HH:mm:ssXX")

const formatScreenReaderDateTime = date =>
  format(date, "MMMM d, yyyy 'at' h:mm:ss aa")

const formatScreenReaderDate = date => format(date, "MMMM d, yyyy")

const EventTime = ({ event }) => {
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
