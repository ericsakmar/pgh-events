import * as React from "react"
import { Link } from "gatsby"

import * as styles from "./header.module.css"

const Header = () => {
  return (
    <header>
      <div className={styles.topBar}>
        <div className={styles.topBarContent}>
          <Link
            to="/"
            style={{
              textDecoration: "none",
              display: "block",
            }}
          >
            <h1 className={styles.header}>pgh.events</h1>
          </Link>
        </div>

        <nav className={styles.menu}>
          <Link
            to="/"
            className={styles.link}
            activeClassName={styles.activeLink}
          >
            Events
          </Link>
          <Link
            to="/videos"
            className={styles.link}
            activeClassName={styles.activeLink}
          >
            Videos
          </Link>
          <Link
            to="/podcasts"
            className={styles.link}
            activeClassName={styles.activeLink}
          >
            Podcasts
          </Link>
          <Link
            to="/playlists"
            className={styles.link}
            activeClassName={styles.activeLink}
          >
            Playlists
          </Link>
          <Link
            to="/articles"
            className={styles.link}
            activeClassName={styles.activeLink}
          >
            Articles
          </Link>

          <a
            href="https://admin.pgh.events/events/create"
            className={styles.link}
          >
            Add an Event
          </a>
        </nav>
      </div>
    </header>
  )
}

export default Header
