import * as React from "react"
import { navigate } from "gatsby"

import * as containerStyles from "./search.module.css"

const Search = ({ date }) => {
  const [hasMounted, setHasMounted] = React.useState(false)

  React.useEffect(() => {
    setHasMounted(true)
  }, [])

  if (!hasMounted) {
    return null
  }

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
