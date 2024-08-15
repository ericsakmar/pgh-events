import * as React from "react"
import Seo from "../components/seo"
import * as styles from "./stats.module.css"
import Layout from "../components/layout"
import { formatInTimeZone } from "date-fns-tz"
import VenueStats from "../components/venueStats"
import EventCountsByDay from "../components/eventCountsByDay"

export function Head() {
  return <Seo title="pgh.events/stats" />
}

const StatsPage = ({ pageContext }) => {
  const {
    minDate,
    maxDate,
    eventCountsByVenue,
    eventCountsByDate,
    allEventsCount,
    allVenuesCount,
    feedCounts,
    feedsMinDate,
    feedsMaxDate,
    allFeedsCount,
  } = pageContext
  const start = formatInTimeZone(minDate, "America/New_York", "LLLL do")
  const end = formatInTimeZone(maxDate, "America/New_York", "LLLL do")

  const feedStart = formatInTimeZone(
    feedsMinDate,
    "America/New_York",
    "LLLL do"
  )

  const feedEnd = formatInTimeZone(feedsMaxDate, "America/New_York", "LLLL do")

  return (
    <Layout>
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

        <h3 className={styles.chartHeader}>Event Counts by Day</h3>
        <EventCountsByDay counts={eventCountsByDate} />

        <h3 className={styles.chartHeader}>Event Counts by Venue</h3>
        <VenueStats venues={eventCountsByVenue} />
      </section>

      <section className={styles.section}>
        <p className={styles.summary}>
          <span className={styles.highlight}>
            <span className={`${styles.big} ${styles.highlight}`}>
              {allFeedsCount.toLocaleString()}
            </span>{" "}
            feeds
          </span>{" "}
          including <span className={styles.mid}>{feedCounts.podcasts}</span>{" "}
          podcast episodes,{" "}
          <span className={styles.mid}>{feedCounts.playlists}</span> playlists,{" "}
          <span className={styles.mid}>{feedCounts.blogs}</span> blog posts, and{" "}
          <span className={styles.mid}>{feedCounts.videos}</span> videos posted
          between <span className={styles.mid}>{feedEnd}</span> and{" "}
          <span className={styles.mid}>{feedStart}</span>.
        </p>
      </section>
    </Layout>
  )
}

export default StatsPage
