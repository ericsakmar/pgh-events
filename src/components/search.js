import * as React from "react"
import { navigate } from "gatsby"

import * as containerStyles from "./search.module.css"

const Search = ({
  date: initialDate,
  keyword: initialKeyword,
  venue: initialVenue,
  venues,
  extraActions,
  onSearch,
}) => {
  const [date, setDate] = React.useState(initialDate)
  const [keyword, setKeyword] = React.useState(initialKeyword)
  const [venue, setVenue] = React.useState(initialVenue)

  React.useEffect(() => {
    setDate(initialDate)
  }, [initialDate])

  React.useEffect(() => {
    setKeyword(initialKeyword)
  }, [initialKeyword])

  React.useEffect(() => {
    setVenue(initialVenue)
  }, [initialVenue])

  const handleChange = setter => evt => setter(evt.target.value)

  const handleSubmit = evt => {
    evt.preventDefault()
    navigate(
      `/?d=${encodeURIComponent(date)}&q=${encodeURIComponent(
        keyword
      )}&v=${encodeURIComponent(venue)}`
    )
    onSearch()
  }

  const handleClear = evt => {
    evt.preventDefault()
    navigate("/")
    onSearch()
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className={containerStyles.search}>
        <div className={containerStyles.field}>
          <label htmlFor="date">Date:</label>
          <input
            type="date"
            name="d"
            id="d"
            value={date}
            onChange={handleChange(setDate)}
          />
        </div>

        <div className={containerStyles.field}>
          <label htmlFor="keyword">Keyword:</label>
          <input
            type="text"
            name="q"
            id="q"
            value={keyword}
            onChange={handleChange(setKeyword)}
          />
        </div>

        <div className={containerStyles.field}>
          <label htmlFor="venue">Venue:</label>
          <select
            name="venue"
            id="venue"
            value={venue}
            onChange={handleChange(setVenue)}
          >
            <option value="">All</option>
            {venues.map(v => (
              <option value={v} key={v}>
                {v}
              </option>
            ))}
          </select>
        </div>

        <div className={containerStyles.actions}>
          <button type="submit">search</button>
          <button onClick={handleClear} className="buttonLink">
            clear
          </button>
          <div className={containerStyles.extraActions}>{extraActions}</div>
        </div>
      </div>
    </form>
  )
}

export default Search
