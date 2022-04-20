import * as React from "react"
import { format } from "date-fns"

const formatTime = date =>
  format(date, "h:mm aaa", { timezone: "America/New_York" })

// see https://github.com/gatsbyjs/gatsby/issues/22948
// and https://blog.logrocket.com/fixing-gatsbys-rehydration-issue/
const useLink = link => {
  const [stateLink, setStateLink] = React.useState("")

  React.useEffect(() => {
    setStateLink(link)
  }, [link])

  return stateLink
}

const Event = ({ event }) => {
  const link = useLink(event.link)

  const content = (
    <>
      <h3>{event.title}</h3>
      <p>{event.location}</p>
      {event.hasTime ? <p>{formatTime(event.date)}</p> : null}
    </>
  )

  return <div>{link ? <a href={link}>{content}</a> : content}</div>
}

export default Event
