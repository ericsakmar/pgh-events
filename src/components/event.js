import * as React from "react"
import { format } from "date-fns"

const formatTime = date => format(date, "h:mm aaa")

const Event = ({ event }) => (
  <div>
    <h3>{event.title}</h3>

    <p>{event.location}</p>
    <p>{formatTime(event.date)}</p>
  </div>
)

export default Event
