import * as React from "react"
import { navigate } from "gatsby"

import * as containerStyles from "./search.module.css"

const Search = () => {
  const [date, setDate] = React.useState("")

  const handleDateChange = evt => {
    const newDate = evt.target.value
    console.log(newDate)
    setDate(newDate)

    if (newDate !== "") {
      navigate(`/?d=${newDate}`)
    }
  }

  return (
    <div className={containerStyles.search}>
      <div className={containerStyles.field}>
        <label htmlFor="date">Date:</label>
        <input
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
