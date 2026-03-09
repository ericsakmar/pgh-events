import * as React from "react"

import Layout from "../components/layout"
import Seo from "../components/seo"
import * as styles from "./about.module.css"
import { formatInTimeZone } from "date-fns-tz"
import VenueStats from "../components/venueStats"
import EventCountsByMonth from "../components/eventCountsByMonth"

export function Head() {
  return <Seo title="pgh.events/about" />
}

const AboutPage = ({ pageContext }) => {
  const {
    minDate,
    maxDate,
    eventCountsByVenue,
    eventCountsByDate,
    allEventsCount,
    allVenuesCount,
  } = pageContext
  const start = formatInTimeZone(minDate, "America/New_York", "LLLL do")
  const end = formatInTimeZone(maxDate, "America/New_York", "LLLL do")

  return (
    <Layout>
      <h2>About</h2>

      <div className={styles.about}>
        pgh.events is a music-focused collection of events, videos, podcasts,
        playlists, articles and more in Pittsburgh, Pennsylvania.{" "}
        <p>
          It is an{" "}
          <a href="https://github.com/ericsakmar/pgh-events">
            open-source project
          </a>{" "}
          and was created by Eric Sakmar. pgh.events launched on May 1, 2022.
        </p>
        <p>
          Questions or comments? Please contact{" "}
          <a href="mailto:eric.sakmar@gmail.com">eric.sakmar@gmail.com</a>.
        </p>
      </div>

      <h2>Stats</h2>

      <section className={styles.section}>
        <p className={styles.summary}>
          <span className={styles.highlight}>
            <span className={`${styles.big} ${styles.highlight}`}>
              {allEventsCount.toLocaleString()}
            </span>{" "}
            events
          </span>{" "}
          in{" "}
          <span className={styles.mid}>{allVenuesCount.toLocaleString()}</span>{" "}
          venues between <span className={styles.mid}>{start}</span> and{" "}
          <span className={styles.mid}>{end}</span>.
        </p>

        <EventCountsByMonth counts={eventCountsByDate} />

        <h3 className={styles.chartHeader}>Event Counts by Venue</h3>
        <VenueStats venues={eventCountsByVenue} />
      </section>
    </Layout>
  )
}

export default AboutPage
