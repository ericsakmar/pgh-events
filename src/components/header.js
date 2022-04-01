import * as React from "react"
import PropTypes from "prop-types"

import * as styles from "./header.module.css"

const Header = () => (
  <header>
    <h1 className={styles.header}>
      <div className={styles.name}>pgh</div>
      <div>events</div>
    </h1>
  </header>
)

Header.propTypes = {
  siteTitle: PropTypes.string
}

Header.defaultProps = {
  siteTitle: ``
}

export default Header
