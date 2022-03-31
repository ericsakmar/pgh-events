import * as React from "react"
import PropTypes from "prop-types"

const Header = ({ siteTitle }) => (
  <header style={{ textAlign: "center" }}>
    <div
      style={{
        padding: `1.45rem 1.0875rem`
      }}
    >
      <h1>pgh.events</h1>
    </div>
  </header>
)

Header.propTypes = {
  siteTitle: PropTypes.string
}

Header.defaultProps = {
  siteTitle: ``
}

export default Header
