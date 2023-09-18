import * as React from "react"

import Event from "../components/event"
import * as containerStyles from "./venue.module.css"

const Venue = ({ name, events }) => {
  const state = events && events.length > 0 ? "DEFAULT" : "EMPTY"

  return (
    <div>
      <h2>{name}</h2>

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

export default Venue
