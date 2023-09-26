import * as React from "react"
import { format, parse } from "date-fns"

import Event from "../components/event"
import * as containerStyles from "./day.module.css"

const getDayOfWeek = date => format(date, "EEE")
const getDate = date => format(date, "MMM d")

function useOnScreen(ref) {
  const [isIntersecting, setIntersecting] = React.useState(false)

  const observer = React.useMemo(
    () =>
      new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
          setIntersecting(true)
        }
      }),
    []
  )

  React.useEffect(() => {
    observer.observe(ref.current)
    return () => observer.disconnect()
  }, [observer, ref])

  return isIntersecting
}

const Day = ({ date: rawDate, events, index }) => {
  const ref = React.useRef()
  const isOnScreen = useOnScreen(ref)
  const date = parse(rawDate, "yyyy-MM-dd", new Date())
  const state = events && events.length > 0 ? "DEFAULT" : "EMPTY"

  const renderEvents = index < 2 ? true : isOnScreen

  return (
    <div className={containerStyles.day} ref={ref}>
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

      {renderEvents && (
        <div className={containerStyles.events}>
          {state === "EMPTY" ? (
            <h3>no events!</h3>
          ) : (
            events.map(e => (
              <Event key={`${e.title}-${e.location}-${e.date}`} event={e} />
            ))
          )}
        </div>
      )}
    </div>
  )
}

export default Day
