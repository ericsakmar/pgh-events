import * as React from "react"
import * as styles from "./eventsSummary.module.css"

const getLabel = ({ title }) => title

const EventsSummary = ({ events }) => {
  return (
    <aside className={styles.eventsSummary}>
      <h2 className={styles.header}>Upcoming Events</h2>
      <ol className={styles.list}>
        {events.map(e => (
          <li key={e.link} className={styles.event}>
            <span>🗓️</span>
            <a
              href={e.link}
              className={styles.link}
              target="_blank"
              rel="noopener noreferrer"
            >
              {getLabel(e)}
            </a>
          </li>
        ))}
      </ol>

      <ol className={styles.shortList}>
        {events.slice(0, 3).map(e => (
          <li key={e.link} className={styles.event}>
            <span>🗓️</span>
            <a
              href={e.link}
              className={styles.link}
              target="_blank"
              rel="noopener noreferrer"
            >
              {getLabel(e)}
            </a>
          </li>
        ))}
      </ol>
    </aside>
  )
}

export default EventsSummary
