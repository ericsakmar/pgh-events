import * as React from "react"
import { format, parse } from "date-fns"

import Event from "../components/event"
import * as containerStyles from "./day.module.css"

const getDayOfWeek = date => format(date, "EEE")
const getDate = date => format(date, "MMM d")

const Day = ({ date: rawDate, events, venue }) => {
  const date =
    rawDate !== undefined ? parse(rawDate, "yyyy-MM-dd", new Date()) : undefined

  const state = events && events.length > 0 ? "DEFAULT" : "EMPTY"

  return (
    <section className={containerStyles.day}>
      <h2>
        {venue === undefined ? (
          <time dateTime={rawDate}>
            <span className="visuallyHidden">
              {date.toLocaleDateString(undefined, { dateStyle: "full" })}
            </span>

            <div aria-hidden="true">
              {getDayOfWeek(date)}, {getDate(date)}
            </div>
          </time>
        ) : (
          venue.name
        )}
      </h2>

      {state === "EMPTY" ? (
        <h3>no events!</h3>
      ) : (
        <ol className={containerStyles.events}>
          {events.map(e => (
            <Event key={`${e.title}-${e.location}-${e.date}`} event={e} />
          ))}
        </ol>
      )}
    </section>
  )
}

export default Day
