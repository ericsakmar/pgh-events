import * as React from "react"
import { format, parse } from "date-fns"

import Event from "../components/event"
import * as containerStyles from "./day.module.css"

const getDayOfWeek = date => format(date, "EEE")
const getDate = date => format(date, "MMM d")

const Day = ({ date: rawDate, events }) => {
  const date = parse(rawDate, "yyyy-MM-dd", new Date())
  const state = events && events.length > 0 ? "DEFAULT" : "EMPTY"

  return (
    <div className={containerStyles.day}>
      <h2>
        <time dateTime={rawDate}>
          <span className="visuallyHidden">
            {date.toLocaleDateString(undefined, { dateStyle: "full" })}
          </span>

          <div aria-hidden="true">
            {getDayOfWeek(date)}, {getDate(date)}
          </div>
        </time>
      </h2>

      <div className={containerStyles.events}>
        {state === "EMPTY" ? (
          <h3>no events!</h3>
        ) : (
          events.map(e => (
            <Event key={`${e.title}-${e.location}-${e.date}`} event={e} />
          ))
        )}
      </div>
    </div>
  )
}

export default Day
