import * as React from "react"
import { format, parse } from "date-fns"

import Day from "../components/day"
import Seo from "../components/seo"
import DateSelect from "../components/dateSelect"
import Layout from "../components/layout"
import * as styles from "./index.module.css"

const getDayOfWeek = date => format(date, "EEE")
const getDate = date => format(date, "MMMM d")

export function Head() {
  return <Seo title="pgh.events" />
}

const IndexPage = ({ pageContext }) => {
  const { events, date, previous, next, minDate, maxDate } = pageContext
  const parsedDate = parse(date, "yyyy-MM-dd", new Date())
  const displayDate = `${getDayOfWeek(parsedDate)}, ${getDate(parsedDate)}`
  const [includeNearbyCities, setIncludeNearbyCities] = React.useState(true)
  const [hasMounted, setHasMounted] = React.useState(false)

  const filtered = includeNearbyCities
    ? events
    : events.filter(e => e.city === "pgh")

  React.useEffect(() => {
    const raw = localStorage.getItem("includeNearbyCities")
    if (raw !== null) {
      setIncludeNearbyCities(raw === "true")
    }
    setHasMounted(true)
  }, [])

  const handleIncludeNearbyCitiesChange = () => {
    const newValue = !includeNearbyCities
    setIncludeNearbyCities(newValue)
    localStorage.setItem("includeNearbyCities", newValue.toString())
  }

  return (
    <Layout>
      <h2>{displayDate}</h2>

      <DateSelect
        date={date}
        minDate={minDate}
        maxDate={maxDate}
        next={next}
        previous={previous}
      />

      <div className={styles.filters}>
        <input
          type="checkbox"
          id="nearbyCities"
          name="nearbyCities"
          checked={includeNearbyCities}
          onChange={handleIncludeNearbyCitiesChange}
          className={styles.checkbox}
        />
        <label htmlFor="nearbyCities">Include nearby cities</label>
      </div>

      {hasMounted ? (
        <Day events={filtered} />
      ) : (
        <div style={{ minHeight: "200px" }} />
      )}

      <DateSelect
        date={date}
        minDate={minDate}
        maxDate={maxDate}
        next={next}
        previous={previous}
      />
    </Layout>
  )
}

export default IndexPage
