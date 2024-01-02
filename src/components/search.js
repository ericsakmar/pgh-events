import * as React from "react"
import { navigate } from "gatsby"

import * as containerStyles from "./search.module.css"

const Search = ({ date, venues, venue, extraActions, minDate, maxDate }) => {
  const handleChange = evt => {
    if (evt.target.name === "d") {
      const date = evt.target.value
      navigate(`/${date}`)
    }

    if (evt.target.name === "venue") {
      const venue = evt.target.value
      navigate(`/v/${venue}`)
    }
  }

  return (
    <form>
      <h2 className={containerStyles.header}>Find Events</h2>
      <div className={containerStyles.search}>
        <div className={containerStyles.field}>
          <label htmlFor="date" className={containerStyles.label}>
            Date:
          </label>
          <input
            type="date"
            name="d"
            id="d"
            onChange={handleChange}
            value={date}
            className={containerStyles.input}
            min={minDate}
            max={maxDate}
          />
        </div>

        <div className={containerStyles.field}>
          <label htmlFor="venue" className={containerStyles.label}>
            Venue:
          </label>
          <select
            name="venue"
            id="venue"
            value={venue}
            onChange={handleChange}
            className={containerStyles.input}
          >
            <option value="">All</option>
            {venues.map(v => (
              <option value={v.slug} key={v.slug}>
                {v.name}
              </option>
            ))}
          </select>
        </div>

        {extraActions !== undefined ? (
          <div className={containerStyles.actions}>
            <div className={containerStyles.extraActions}>{extraActions}</div>
          </div>
        ) : null}
      </div>
    </form>
  )
}

export default Search
