import * as React from "react"
import { format, parseISO } from "date-fns"

const formatTime = date => format(parseISO(date), "h:mm aaa")

const formatDateTime = date => format(parseISO(date), "yyyy-MM-dd'T'HH:mm:ssXX")

const formatScreenReaderDateTime = date =>
  format(parseISO(date), "MMMM d, yyyy 'at' h:mm:ss aa")

const formatScreenReaderDate = date => format(parseISO(date), "MMMM d, yyyy")

const EventTime = ({ event }) => {
  console.log(event.date)

  // need to do that little useEffect hack so that these refresh on client-side
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
