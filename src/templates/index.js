import * as React from "react"

import Day from "../components/day"
import Nav from "../components/nav"
import Seo from "../components/seo"

import Search from "../components/search"
import FeedSummary from "../components/feedSummary"
import Layout from "../components/layout"

export function Head() {
  return <Seo title="pgh.events" />
}

const IndexPage = ({ pageContext }) => {
  const {
    events,
    date,
    previous,
    next,
    venues,
    feeds,
    venue,
    minDate,
    maxDate,
  } = pageContext

  return (
    <Layout
      sidebar={
        <>
          <Search
            date={date}
            venue={venue?.slug}
            venues={venues}
            minDate={minDate}
            maxDate={maxDate}
          />
          <FeedSummary feeds={feeds} />
        </>
      }
      footer={<Nav previous={previous} next={next} />}
    >
      <Day date={date} venue={venue} events={events} />
    </Layout>
  )
}

export default IndexPage
