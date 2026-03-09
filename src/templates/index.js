import * as React from "react"
import { format, parse } from "date-fns"

import Day from "../components/day"
import Seo from "../components/seo"
import DateSelect from "../components/dateSelect"
import Layout from "../components/layout"

const getDayOfWeek = date => format(date, "EEE")
const getDate = date => format(date, "MMMM d")

export function Head() {
  return <Seo title="pgh.events" />
}

const IndexPage = ({ pageContext }) => {
  const { events, date, previous, next, minDate, maxDate } = pageContext
  const parsedDate = parse(date, "yyyy-MM-dd", new Date())
  const displayDate = `${getDayOfWeek(parsedDate)}, ${getDate(parsedDate)}`

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

      <Day events={events} />

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
