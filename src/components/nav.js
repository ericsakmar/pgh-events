import * as React from "react"
import { Link } from "gatsby"

import * as containerStyles from "./nav.module.css"

const Nav = ({ currentPage, numPages }) => {
  const showNext = currentPage < numPages
  const showPrevious = currentPage > 1
  const nextPage = currentPage + 1
  const previousPage = currentPage - 1

  return (
    <div className={containerStyles.nav}>
      {showPrevious ? (
        <Link
          className={containerStyles.navLink}
          to={previousPage === 1 ? "/" : `/${previousPage}`}
        >
          Previous
        </Link>
      ) : null}

      {showNext ? (
        <Link className={containerStyles.navLink} to={`/${nextPage}`}>
          Next
        </Link>
      ) : null}
    </div>
  )
}

export default Nav
