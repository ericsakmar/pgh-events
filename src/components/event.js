import * as React from "react"
import { format } from "date-fns"

const formatTime = date =>
  format(date, "h:mm aaa", { timezone: "America/New_York" })

const Event = ({ event }) => {
  const content = (
    <>
      <h3>{event.title}</h3>
      <p>{event.location}</p>
      <p>{formatTime(event.date)}</p>
    </>
  )

  return <div>{event.link ? <a href={event.link}>{content}</a> : content}</div>
}

export default Event
