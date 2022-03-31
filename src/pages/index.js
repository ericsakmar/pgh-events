import * as React from "react"
import { graphql } from "gatsby"
import { format, startOfDay } from "date-fns"

import Layout from "../components/layout"
import Seo from "../components/seo"
import Day from "../components/day"

const IndexPage = ({ data }) => {
  const today = startOfDay(new Date()).getTime()

  const grouped = data.allEvents.edges
    .map(e => e.node)
    .map(e => ({ ...e, date: parseInt(e.date, 10) }))
    .filter(e => e.date >= today)
    .map(e => ({ ...e, date: new Date(e.date) }))
    .reduce((groups, e) => {
      const key = format(e.date, "yyyy-MM-dd")
      const events = groups[key] ?? []

      return {
        ...groups,
        [key]: [...events, e]
      }
    }, {})

  const content = Object.entries(grouped).map(([date, events]) => (
    <Day date={date} events={events} />
  ))

  return (
    <Layout>
      <Seo title="Home" />
      {content}
    </Layout>
  )
}

export const query = graphql`
  query MyQuery {
    allEvents(sort: { fields: date }) {
      edges {
        node {
          title
          date
          location
        }
      }
    }
  }
`

export default IndexPage
