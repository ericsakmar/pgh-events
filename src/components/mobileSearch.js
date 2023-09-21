import * as React from "react"
import Search from "../components/search"
import * as styles from "./mobileSearch.module.css"

const SearchIcon = () => (
  <svg
    height="48"
    viewBox="0 0 21 21"
    width="48"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g
      fill="none"
      fillRule="evenodd"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="8.5" cy="8.5" r="5" />
      <path d="m17.571 17.5-5.571-5.5" />
    </g>
  </svg>
)

const MobileSearch = props => {
  const [showSearch, setShowSearch] = React.useState(false)

  const toggleSearch = () => setShowSearch(!showSearch)

  const fieldsStyles = showSearch
    ? styles.searchFields
    : [styles.searchFields, styles.hidden].join(" ")

  const buttonStyles = showSearch
    ? [styles.searchButton, styles.hidden].join(" ")
    : styles.searchButton

  return (
    <div className={styles.search}>
      <div className={fieldsStyles}>
        <Search
          {...props}
          extraActions={
            <button onClick={toggleSearch} className="buttonLink">
              hide search fields
            </button>
          }
        />
      </div>

      <button onClick={toggleSearch} className={buttonStyles}>
        <SearchIcon />
      </button>
    </div>
  )
}

export default MobileSearch
