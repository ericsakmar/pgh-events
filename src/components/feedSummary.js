import * as React from "react"
import * as styles from "./feedSummary.module.css"

const getEmoji = tag => {
  switch (tag) {
    case "spotify playlist":
      return "📻"
    case "youtube channel":
      return "📺"
    case "blog":
      return "📰"
    case "podcast":
    case "spotify show":
      return "🎧"
    default:
      return undefined
  }
}

const getLabel = ({ subtitle, title }) =>
  subtitle === null ? title : `${subtitle} - ${title}`

const FeedSummary = ({ feeds }) => {
  return (
    <aside className={styles.feedSummary}>
      <h2 className={styles.header}>Latest Feeds</h2>
      <ol className={styles.list}>
        {feeds.slice(0, 3).map(e => (
          <li key={e.url} className={styles.feed}>
            <span>{getEmoji(e.tags[0])}</span>
            <a
              href={e.url}
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

export default FeedSummary
