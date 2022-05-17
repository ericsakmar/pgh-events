import * as React from "react"
import { Link } from "gatsby"

import * as containerStyles from "./nav.module.css"

const iconSize = 36

// icons from https://systemuicons.com/
const Previous = () => (
  <svg
    height={iconSize}
    viewBox="0 0 21 21"
    width={iconSize}
    xmlns="http://www.w3.org/2000/svg"
  >
    <g
      fill="none"
      fillRule="evenodd"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      transform="translate(2 2)"
    >
      <circle cx="8.5" cy="8.5" r="8" />
      <path d="m9.55 11.4-3-2.9 3-3" />
    </g>
  </svg>
)

const Next = () => (
  <svg
    height={iconSize}
    viewBox="0 0 21 21"
    width={iconSize}
    xmlns="http://www.w3.org/2000/svg"
  >
    <g
      fill="none"
      fillRule="evenodd"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      transform="translate(2 2)"
    >
      <circle cx="8.5" cy="8.5" r="8" />
      <path d="m7.5 11.5 3-3-3.068-3" />
    </g>
  </svg>
)

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
          <Previous />
          <span className="visuallyHidden">Previous Page</span>
        </Link>
      ) : null}

      {showNext ? (
        <Link className={containerStyles.navLink} to={`/${nextPage}`}>
          <Next />
          <span className="visuallyHidden">Next Page</span>
        </Link>
      ) : null}
    </div>
  )
}

export default Nav
