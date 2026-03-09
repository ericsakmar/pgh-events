import * as React from "react"
import Event from "../components/event"
import * as containerStyles from "./day.module.css"

const Day = ({ events }) => {
  const state = events && events.length > 0 ? "DEFAULT" : "EMPTY"

  return (
    <section className={containerStyles.day}>
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
