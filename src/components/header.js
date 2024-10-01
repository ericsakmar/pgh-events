import * as React from "react"
import { Link } from "gatsby"

import * as styles from "./header.module.css"

const Header = () => (
  <header>
    <Link
      to="/"
      style={{
        textDecoration: "none",
        display: "block",
      }}
    >
      <h1 className={styles.header}>pgh.events</h1>
    </Link>

    <p className={styles.description}>
      a music-focused collection of events, playlists, podcasts, videos and
      blogs in Pittsburgh, Pennsylvania.
    </p>

    <nav className={styles.menu}>
      <ul className={styles.links}>
        <li className={styles.emojiLink}>
          <span>🎟️</span>
          <Link to="/" className={styles.link}>
            Events
          </Link>
        </li>

        <li className={styles.emojiLink}>
          <span>▶️</span>
          <Link to="/feeds" className={styles.link}>
            Playlists, Podcasts, Videos and Blogs
          </Link>
        </li>

        <li className={styles.emojiLink}>
          <span>✉️</span>
          <a href="https://forms.gle/3rAUbTXAW5ei4Jp68" className={styles.link}>
            Add an Event
          </a>
        </li>

        <li className={styles.emojiLink}>
          <span>ℹ️</span>
          <Link to="/about" className={styles.link}>
            About
          </Link>
        </li>

        <li className={styles.emojiLink}>
          <span>📊</span>
          <Link to="/stats" className={styles.link}>
            Stats
          </Link>
        </li>
      </ul>
    </nav>
  </header>
)

export default Header
