import * as React from "react"

import "./global.css"
import Layout from "../components/layout"
import Seo from "../components/seo"
import Day from "../components/day"
import Nav from "../components/nav"
import Search from "../components/search"

const getState = searchDate => {
  if (searchDate === "") {
    return "SEARCHING"
  }

  if (searchDate && searchDate.length > 0) {
    return "SEARCH"
  }

  return "DEFAULT"
}

const IndexPage = ({ pageContext, location }) => {
  const { events, currentPage, numPages, allEvents } = pageContext

  const searchParams = new URLSearchParams(location.search)
  const searchDate = searchParams.get("d")
  const state = getState(searchDate)

  const content =
    state === "SEARCH" ? (
      <Day key={searchDate} date={searchDate} events={allEvents[searchDate]} />
    ) : (
      Object.entries(events).map(([date, events]) => (
        <Day key={date} date={date} events={events} />
      ))
    )

  const search = React.useMemo(() => {
    if (state === "SEARCHING" || state === "SEARCH") {
      return <Search date={searchDate} key="search" />
    }

    return null
  }, [state, searchDate])

  return (
    <Layout>
      <Seo title="pgh.events" />
      {search}
      {content}

      {state === "DEFAULT" ? (
        <Nav currentPage={currentPage} numPages={numPages} />
      ) : null}
    </Layout>
  )
}

export default IndexPage
