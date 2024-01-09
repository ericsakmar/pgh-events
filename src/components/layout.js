import * as React from "react"
import PropTypes from "prop-types"

import * as styles from "./layout.module.css"
import "./layout.css"
import "../templates/global.css"
import Header from "./header"

const Layout = ({ sidebar, children, footer }) => {
  return (
    <div
      style={{
        margin: `0 auto`,
        padding: `0 1rem 1rem`,
        maxWidth: "1200px",
      }}
    >
      <div className={styles.page}>
        <div className={styles.side}>
          <Header />
          {sidebar}
        </div>

        <main className={styles.main}>{children}</main>
      </div>

      {footer}
    </div>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
