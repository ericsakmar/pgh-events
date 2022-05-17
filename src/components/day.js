import * as React from "react"
import { format, parse } from "date-fns"

import Event from "../components/event"
import * as containerStyles from "./day.module.css"

const getDayOfWeek = date => format(date, "EEEE")
const getDate = date => format(date, "MMM d")

const Day = ({ date: rawDate, events }) => {
  const date = parse(rawDate, "yyyy-MM-dd", new Date())

  return (
    <div className={containerStyles.day}>
      <h2 className={containerStyles.date}>
        <time dateTime={rawDate}>
          <span className="visuallyHidden">
            {date.toLocaleDateString(undefined, { dateStyle: "full" })}
          </span>

          <div aria-hidden="true">
            <div>{getDayOfWeek(date)}</div>
            <div className={containerStyles.actualDate}>{getDate(date)}</div>
          </div>
        </time>
      </h2>

      <div className={containerStyles.events}>
        {events.map(e => (
          <Event key={e.title} event={e} />
        ))}
      </div>
    </div>
  )
}

export default Day
