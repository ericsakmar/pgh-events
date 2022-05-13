import * as React from "react"

import Layout from "../components/layout"
import Seo from "../components/seo"
import Day from "../components/day"
import Nav from "../components/nav"

const IndexPage = ({ pageContext }) => {
  const { events, currentPage, numPages } = pageContext

  // TODO do we need to sort the date keys?
  const content = Object.entries(events).map(([date, events]) => (
    <Day key={date} date={date} events={events} />
  ))

  return (
    <Layout>
      <Seo title="pgh.events" />
      {content}
      <Nav currentPage={currentPage} numPages={numPages} />
    </Layout>
  )
}

export default IndexPage
