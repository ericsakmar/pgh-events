import * as React from "react"

import Layout from "../components/layout"
import Seo from "../components/seo"
import Day from "../components/day"
import Nav from "../components/nav"
import MobileSearch from "../components/mobileSearch"
import Venue from "../components/venue"
import useSearch from "../hooks/useSearch"

import "./global.css"

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
    Object.entries(eventsForDisplay).map(([date, events], i) => (
      <Day key={date} date={date} events={events} index={i} />
    ))
  )

  return (
    <Layout>
      <Seo title="pgh.events" />

      <div>{content.length === 0 ? "no events!" : content}</div>

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
