import * as React from "react"
import { Link } from "gatsby"

import * as styles from "./header.module.css"

const Header = () => (
  <>
    <Link to="/" style={{ textDecoration: "none", display: "inline-block" }}>
      <h1 className={styles.header}>pgh.events</h1>
    </Link>

    <div className={styles.menu}>
      <Link to="/">events</Link>

      <div>/</div>

      <div>
        <Link to="/listen">
          feeds <span className={styles.newChip}>(new!)</span>
        </Link>
      </div>

      <div>/</div>
      <a href="https://forms.gle/3rAUbTXAW5ei4Jp68">add an event</a>

      <div>/</div>
      <Link to="/about">about</Link>
    </div>
  </>
)

export default Header
