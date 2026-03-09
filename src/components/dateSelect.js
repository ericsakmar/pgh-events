import * as React from "react"
import { navigate } from "gatsby"
import { Link } from "gatsby"

import * as containerStyles from "./dateSelect.module.css"

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
      <path d="m7.5 11.5 3-3-3.068-3" />
    </g>
  </svg>
)

const CalendarIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="feather feather-calendar"
    aria-hidden="true"
    focusable="false"
    width="16"
  >
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
    <line x1="16" y1="2" x2="16" y2="6"></line>
    <line x1="8" y1="2" x2="8" y2="6"></line>
    <line x1="3" y1="10" x2="21" y2="10"></line>
  </svg>
)

const DateSelect = ({ date, minDate, maxDate, next, previous }) => {
  const fieldRef = React.useRef()

  const showNext = next !== undefined
  const showPrevious = previous !== undefined

  const handleClick = evt => {
    evt.preventDefault()
    fieldRef.current.showPicker()
  }

  const handleChange = evt => {
    const date = evt.target.value
    navigate(`/${date}`)
  }

  return (
    <form>
      <div className={containerStyles.search}>
        {showPrevious ? (
          <Link className={containerStyles.dateButton} to={`/${previous}`}>
            <Previous />
            <span className="visuallyHidden">Previous Page</span>
          </Link>
        ) : (
          <div
            className={`${containerStyles.dateButton} ${containerStyles.dateButtonDisabled}`}
          >
            <Previous />
          </div>
        )}

        <button onClick={handleClick} className={containerStyles.dateButton}>
          <div>
            <CalendarIcon />
          </div>
          <input
            ref={fieldRef}
            type="date"
            onChange={handleChange}
            value={date}
            className={containerStyles.input}
            min={minDate}
            max={maxDate}
          />
        </button>

        {showNext ? (
          <Link className={containerStyles.dateButton} to={`/${next}`}>
            <Next />
            <span className="visuallyHidden">Next Page</span>
          </Link>
        ) : (
          <div
            className={`${containerStyles.dateButton} ${containerStyles.dateButtonDisabled}`}
          >
            <Next />
          </div>
        )}
      </div>
    </form>
  )
}

export default DateSelect
