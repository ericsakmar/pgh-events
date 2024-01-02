import * as React from "react"
import * as containerStyles from "./event.module.css"

import AddToCalendar from "./addToCalendar"
import WebShare from "./webshare"
import EventTime from "./eventTime"

const Event = ({ event }) => {
  const renderPoster = event.poster !== undefined && event.poster !== null

  return (
    <li className={containerStyles.event}>
      {renderPoster && (
        <img
          role="presentation"
          src={event.poster}
          alt="event poster"
          loading="lazy"
          className={containerStyles.poster}
        />
      )}

      <h3>
        {event.link ? (
          <a
            href={event.link}
            className={containerStyles.mainLink}
            target="_blank"
            rel="noopener noreferrer"
          >
            {event.title}
          </a>
        ) : (
          event.title
        )}
      </h3>

      <p>{event.location}</p>

      <p>
        <EventTime event={event} />
      </p>

      <div className={containerStyles.actions}>
        <AddToCalendar event={event} />
        <WebShare event={event} />
      </div>
    </li>
  )
}

export default Event
