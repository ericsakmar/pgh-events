import * as React from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"

import * as styles from "./header.module.css"

const Header = () => (
  <>
    <h1 className={styles.header}>pgh.events / live</h1>
    <div className={styles.menu}>
      <a href="https://forms.gle/3rAUbTXAW5ei4Jp68">add an event</a>
      <Link to="/about">about</Link>
    </div>
  </>
)

export default Header
