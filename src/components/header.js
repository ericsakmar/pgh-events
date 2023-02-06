import * as React from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"

import * as styles from "./header.module.css"

const Header = () => (
  <div>
    <header className={styles.header}>
      <h1>
        <Link to="/" className={styles.link} aria-label="pgh.events">
          <span className={styles.name}>pgh</span>
          <span>events</span>
        </Link>
      </h1>

      <div className={styles.menu}>
        <a href="https://forms.gle/3rAUbTXAW5ei4Jp68">add an event</a>
        <Link to="/about">about</Link>
      </div>
    </header>
  </div>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
