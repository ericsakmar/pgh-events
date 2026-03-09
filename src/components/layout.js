import * as React from "react"
import PropTypes from "prop-types"

import * as styles from "./layout.module.css"
import "./layout.css"
import "../templates/global.css"
import Header from "./header"
import { Link } from "gatsby"

const Layout = ({ children }) => {
  return (
    <div>
      <Header />

      <div className={styles.page}>
        <main className={styles.main}>{children}</main>
      </div>

      <footer className={styles.footer}>
        <Link to="/about" className={styles.footer}>
          About
        </Link>
      </footer>
    </div>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
