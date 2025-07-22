import * as React from "react"
import { Link } from "gatsby"

import * as styles from "./header.module.css"
import LinkList from "./linkList"

const Header = () => {
  const [showingLinks, setShowingLinks] = React.useState(false)

  return (
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
            <a
              href="https://admin.pgh.events/events/create"
              className={styles.link}
            >
              Add an Event
            </a>
          </li>

          {!showingLinks ? (
            <li className={`${styles.showMore} ${styles.emojiLink}`}>
              <span>🔗</span>
              <button
                className={`buttonLink ${styles.link}`}
                onClick={() => setShowingLinks(true)}
              >
                Links to more music, calendars, and Patreon pages
              </button>
            </li>
          ) : null}
        </ul>

        {showingLinks ? (
          <div className={styles.linkList}>
            <LinkList />
          </div>
        ) : null}
      </nav>
    </header>
  )
}

export default Header
