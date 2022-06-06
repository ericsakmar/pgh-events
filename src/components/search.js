import * as React from "react"
import { navigate } from "gatsby"

import * as containerStyles from "./search.module.css"

const Search = ({ date }) => {
  const handleDateChange = evt => {
    const newDate = evt.target.value

    if (newDate !== "") {
      navigate(`/?d=${newDate}`)
    }
  }

  return (
    <div className={containerStyles.search}>
      <div className={containerStyles.field}>
        <label htmlFor="date">Date:</label>
        <input
          autoFocus
          type="date"
          name="date"
          onChange={handleDateChange}
          value={date}
        />
      </div>
    </div>
  )
}

export default Search
