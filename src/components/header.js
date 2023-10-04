import * as React from "react"
import { Link } from "gatsby"

import * as styles from "./header.module.css"

const Header = () => (
  <header>
    <Link
      to="/"
      style={{
        textDecoration: "none",
        display: "inline-block",
      }}
    >
      <h1 className={styles.header}>pgh.events</h1>
    </Link>

    {/*
    <p className={styles.description}>
      a music-focused collection of events, playlists, podcasts, youtube
      channels and blogs in Pittsburgh, Pennsylvania.
    </p>
    */}

    <nav className={styles.menu}>
      <Link to="/" className={styles.link}>
        <span>events</span>
      </Link>

      <Link to="/feeds" className={styles.link}>
        feeds <span className={styles.newChip}>(new!)</span>
      </Link>

      <a href="https://forms.gle/3rAUbTXAW5ei4Jp68" className={styles.link}>
        add an event
      </a>

      <Link to="/about" className={styles.link}>
        about
      </Link>
    </nav>
  </header>
)

export default Header
