import * as React from "react"

import Layout from "../components/layout"
import Seo from "../components/seo"
import Day from "../components/day"
import Nav from "../components/nav"
import MobileSearch from "../components/mobileSearch"
import Header from "../components/header"
import useSearch from "../hooks/useSearch"

import "./global.css"
import Venue from "../components/venue"

const IndexPage = ({ pageContext, location }) => {
  const { events, currentPage, numPages, allEvents } = pageContext

  // TODO is this the best place to get venues?
  const venues = Array.from(
    Object.values(allEvents)
      .flatMap(events => events)
      .reduce((acc, e) => acc.add(e.location), new Set())
  ).sort()

  const {
    events: eventsForDisplay,
    params,
    isSearching,
  } = useSearch(location.search, events, allEvents)

  const isVenue = params.venue !== ""

  const content = isVenue ? (
    <Venue
      name={params.venue}
      events={Object.values(eventsForDisplay).flatMap(events => events)}
    />
  ) : (
    Object.entries(eventsForDisplay).map(([date, events]) => (
      <Day key={date} date={date} events={events} />
    ))
  )

  return (
    <Layout>
      <Seo title="pgh.events" />

      <Header />

      <div>{content.length === 0 ? "no events" : content}</div>

      {!isSearching ? (
        <Nav currentPage={currentPage} numPages={numPages} />
      ) : null}

      <MobileSearch
        date={params.date}
        keyword={params.keyword}
        venue={params.venue}
        venues={venues}
      />
    </Layout>
  )
}

export default IndexPage
