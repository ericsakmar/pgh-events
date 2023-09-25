import * as React from "react"
import { graphql } from "gatsby"
import { format, parseISO } from "date-fns"
import Layout from "../components/layout"
import Header from "../components/header"
import Playlist from "../components/playlist"
import * as styles from "./feeds.module.css"

const ListenPage = ({ data }) => {
  const links = data.allListenlink.nodes

  const filtered = links.map(l => ({
    ...l,
    timestamp: format(parseISO(l.timestamp), "E, LLL d"),
  }))

  return (
    <Layout>
      <Header />
      <h2>Feeds</h2>

      {filtered.length === 0 ? (
        <p>there's nothing here!</p>
      ) : (
        <div className={styles.playlists}>
          {filtered.map((l, i) => (
            <Playlist playlist={l} key={l.title} />
          ))}
        </div>
      )}
    </Layout>
  )
}

export default ListenPage

export const query = graphql`
  query MyQuery {
    allListenlink(sort: { fields: timestamp, order: DESC }, limit: 110) {
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
