import * as React from "react"
import { graphql } from "gatsby"
import { format, parseISO } from "date-fns"
import Playlist from "../components/playlist"
import Seo from "../components/seo"
import * as styles from "./videos.module.css"
import Layout from "../components/layout"
import { useLazy } from "../hooks/useLazy"

export function Head() {
  return <Seo title="pgh.events/videos" />
}

const VideosPage = ({ data }) => {
  const items = data.allListenlink.nodes.map(l => ({
    ...l,
    timestamp: format(parseISO(l.timestamp), "E, LLL d"),
  }))

  const imgRefs = useLazy(items)

  return (
    <Layout>
      <h2>Videos</h2>

      {items.length === 0 ? (
        <p>there's nothing here!</p>
      ) : (
        <ol className={styles.playlists}>
          {items.map((l, i) => (
            <Playlist
              ref={imgRefs.current.get(l.url)}
              playlist={l}
              key={l.url}
              lazy={i > 15}
              type="video"
            />
          ))}
        </ol>
      )}
    </Layout>
  )
}

export default VideosPage

export const query = graphql`
  query MyQuery {
    allListenlink(
      sort: { timestamp: DESC }
      limit: 100
      filter: { tags: { in: "youtube channel" } }
    ) {
      nodes {
        id
        tags
        timestamp
        title
        url
        image
        subtitle
      }
    }
  }
`
