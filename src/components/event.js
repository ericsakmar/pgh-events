import * as React from "react"
import * as containerStyles from "./event.module.css"

import AddToCalendar from "./addToCalendar"
import WebShare from "./webshare"
import EventTime from "./eventTime"

// see https://github.com/gatsbyjs/gatsby/issues/22948
// and https://blog.logrocket.com/fixing-gatsbys-rehydration-issue/
const useLink = link => {
  const [stateLink, setStateLink] = React.useState("")

  React.useEffect(() => {
    setStateLink(link)
  }, [link])

  return stateLink
}

const withLink = (link, content) =>
  link ? <a href={link}>{content}</a> : content

const Event = ({ event }) => {
  const link = useLink(event.link)

  return (
    <div className={containerStyles.event}>
      {event.poster &&
        withLink(
          link,
          <img
            src={event.poster}
            alt="event poster"
            loading="lazy"
            className={containerStyles.poster}
          />
        )}

      <div className={containerStyles.details}>
        <h3>{withLink(link, event.title)}</h3>

        <p>{event.location}</p>

        <p>
          <EventTime event={event} />
        </p>

        <div className={containerStyles.actions}>
          <AddToCalendar event={event} />
          <WebShare event={event} />
        </div>
      </div>
    </div>
  )
}

export default Event
