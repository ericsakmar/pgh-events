import * as React from "react"
import { Link } from "gatsby"

import * as styles from "./header.module.css"

const Header = () => (
  <>
    <Link to="/" style={{ textDecoration: "none", display: "inline-block" }}>
      <h1 className={styles.header}>pgh.events</h1>
    </Link>

    <div className={styles.menu}>
      <Link to="/">
        <span>events</span>
      </Link>

      <div>
        <Link to="/listen">
          feeds <span className={styles.newChip}>(new!)</span>
        </Link>
      </div>

      <a href="https://forms.gle/3rAUbTXAW5ei4Jp68">add an event</a>

      <Link to="/about">about</Link>
    </div>
  </>
)

export default Header
