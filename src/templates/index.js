import * as React from "react"

import "./global.css"
import Layout from "../components/layout"
import Seo from "../components/seo"
import Day from "../components/day"
import Nav from "../components/nav"
import MobileSearch from "../components/mobileSearch"
import useSearch from "../hooks/useSearch"

import * as styles from "./index.module.css"

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

  const content = Object.entries(eventsForDisplay).map(([date, events]) => (
    <Day key={date} date={date} events={events} />
  ))

  return (
    <Layout>
      <Seo title="pgh.events" />

      <div className={styles.content}>
        <h1 className={styles.header}>pgh.events</h1>

        <div className={styles.events}>
          {content.length === 0 ? "no events" : content}
        </div>

        {/*
        <div className={styles.desktopSearch}>
          <Search
            date={params.date}
            keyword={params.keyword}
            venue={params.venue}
            venues={venues}
          />

          <div className={styles.menu}>
            <a href="https://forms.gle/3rAUbTXAW5ei4Jp68">add an event</a>
            <Link to="/about">about</Link>
          </div>
        </div>
      */}
      </div>

      <div className={styles.mobileSearch}>
        <MobileSearch
          date={params.date}
          keyword={params.keyword}
          venue={params.venue}
          venues={venues}
        />
      </div>

      {!isSearching ? (
        <Nav currentPage={currentPage} numPages={numPages} />
      ) : null}
    </Layout>
  )
}

export default IndexPage
