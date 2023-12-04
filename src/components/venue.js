import * as React from "react"

import Event from "../components/event"
import * as containerStyles from "./venue.module.css"

const Venue = ({ name, events }) => {
  const state = events && events.length > 0 ? "DEFAULT" : "EMPTY"

  return (
    <section>
      <h2>{name}</h2>

      {state === "EMPTY" ? (
        <h3>no events!</h3>
      ) : (
        <ol className={containerStyles.events}>
          {events.map(e => (
            <Event
              key={`${e.title}-${e.location}-${e.date}`}
              event={e}
              isOnScreen
            />
          ))}
        </ol>
      )}
    </section>
  )
}

export default Venue
