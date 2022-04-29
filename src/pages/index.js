import * as React from "react"
import { graphql } from "gatsby"
import { compareAsc, format, isAfter, startOfDay } from "date-fns"
import { utcToZonedTime } from "date-fns-tz"

import Layout from "../components/layout"
import Seo from "../components/seo"
import Day from "../components/day"

const IndexPage = ({ data }) => {
  const today = startOfDay(new Date())

  const grouped = data.allEvent.edges
    .map(e => e.node)
    .map(e => {
      const d1 = new Date(e.date)
      const d2 = utcToZonedTime(d1, "America/New_York")
      return { ...e, date: d2 }
    })
    .filter(e => isAfter(e.date, today))
    .concat()
    .sort((a, b) => compareAsc(a.date, b.date))
    .reduce((groups, e) => {
      const key = format(e.date, "yyyy-MM-dd")
      const events = groups[key] ?? []

      return {
        ...groups,
        [key]: [...events, e]
      }
    }, {})

  const content = Object.entries(grouped).map(([date, events]) => (
    <Day key={date} date={date} events={events} />
  ))

  return (
    <Layout>
      <Seo title="all" />
      {content}
    </Layout>
  )
}

export const query = graphql`
  query MyQuery {
    allEvent(sort: { fields: date }) {
      edges {
        node {
          title
          date
          location
          link
          hasTime
          source
        }
      }
    }
  }
`

export default IndexPage
