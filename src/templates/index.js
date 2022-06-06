import * as React from "react"

import "./global.css"
import Layout from "../components/layout"
import Seo from "../components/seo"
import Day from "../components/day"
import Nav from "../components/nav"

const IndexPage = ({ pageContext, location }) => {
  const { events, currentPage, numPages, allEvents } = pageContext

  const searchParams = new URLSearchParams(location.search)
  const searchDate = searchParams.get("d")
  const state = searchDate ? "SEARCHING" : "DEFAULT"

  // TODO empty state
  const content =
    state === "SEARCHING" ? (
      <Day key={searchDate} date={searchDate} events={allEvents[searchDate]} />
    ) : (
      Object.entries(events).map(([date, events]) => (
        <Day key={date} date={date} events={events} />
      ))
    )

  return (
    <Layout>
      <Seo title="pgh.events" />

      {content}

      {state === "DEFAULT" ? (
        <Nav currentPage={currentPage} numPages={numPages} />
      ) : null}
    </Layout>
  )
}

export default IndexPage
