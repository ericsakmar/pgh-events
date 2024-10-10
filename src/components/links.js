import * as React from "react"
import * as styles from "./links.module.css"
import { Link } from "gatsby"

// maybe links to radio stations as well?
const Links = () => {
  return (
    <aside className={styles.links}>
      <h2 className={styles.header}>Other Links</h2>
      <p className={styles.description}>
        more music, calendars, and Patreon pages.
      </p>

      <ul className={styles.list}>
        <li className={styles.listItem}>
          <span>💿</span>
          <a href="https://stacks.carnegielibrary.org/">STACKS</a>
        </li>

        <li className={styles.listItem}>
          <span>🗓️</span>
          <a href="https://arcane.city/">Arcane City</a>
        </li>

        <li className={styles.listItem}>
          <span>🗓️</span>
          <a href="https://www.instagram.com/pghmusictracker/">
            PGH Local Music Tracker
          </a>
        </li>

        <li className={styles.listItem}>
          <span>🗓️</span>
          <a href="https://www.pittsburghsoundpreserve.org/calendar">
            Pittsburgh Sound Preserve
          </a>
        </li>

        <li className={styles.listItem}>
          <span>💵</span>
          <a href="https://www.patreon.com/cruelnoise">Cruel Noise Patreon</a>
        </li>

        <li className={styles.listItem}>
          <span>💵</span>
          <a href="https://www.patreon.com/dltsgdom">
            DLTSGDOM Collective Patreon
          </a>
        </li>

        <li className={styles.listItem}>
          <span>💵</span>
          <a href="https://www.patreon.com/mrrobotoproject">Roboto Patreon</a>
        </li>

        <li className={styles.listItem}>
          <span>ℹ️</span>
          <Link to="/about" className={styles.link}>
            About pgh.events
          </Link>
        </li>
      </ul>
    </aside>
  )
}

export default Links
