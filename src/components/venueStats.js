import { useParentSize } from "@visx/responsive"
import { scaleLinear } from "@visx/scale"
import { BarRounded } from "@visx/shape"
import * as React from "react"
import * as styles from "./venueStats.module.css"

const height = 16

const VenueStats = ({ venues: allVenues }) => {
  const { parentRef, width } = useParentSize()
  const [showAll, setShowAll] = React.useState(false)
  const venues = showAll ? allVenues : allVenues.slice(0, 12)

  const scale = scaleLinear({
    domain: [0, Math.max(...venues.map(v => v.totalCount))],
    range: [0, width - 8],
  })

  const getContent = venue => {
    return (
      <div className={styles.venue}>
        <div className={styles.label}>
          <div>
            {venue.name} ({venue.totalCount})
          </div>
        </div>

        <svg width={width} height={height}>
          <BarRounded
            width={width}
            height={height}
            x={0}
            y={0}
            radius={8}
            all
            fill="var(--very-dark)"
          />

          <BarRounded
            width={scale(venue.totalCount)}
            height={height - 8}
            x={4}
            y={4}
            radius={5}
            all
            fill="currentcolor"
          />
        </svg>
      </div>
    )
  }

  return (
    <div className={styles.container}>
      <ul className={styles.venues}>
        <li ref={parentRef}></li>
        {venues.map(venue => (
          <li key={venue.name}>
            {venue.url !== "csv" ? (
              <a href={venue.url} target="_blank" rel="noopener noreferrer">
                {getContent(venue)}
              </a>
            ) : (
              getContent(venue)
            )}
          </li>
        ))}
      </ul>

      <div className={styles.actions}>
        <button type="button" onClick={() => setShowAll(!showAll)}>
          {showAll ? "show less" : "show all"}
        </button>
      </div>
    </div>
  )
}

export default VenueStats
