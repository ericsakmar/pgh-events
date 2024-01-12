import * as React from "react"
import { graphql } from "gatsby"
import { format, parseISO } from "date-fns"
import Playlist from "../components/playlist"
import Seo from "../components/seo"
import * as styles from "./feeds.module.css"
import Layout from "../components/layout"

export function Head() {
  return <Seo title="pgh.events/feeds" />
}

const useLazy = items => {
  const imgRefs = React.useRef(
    new Map(items.map(i => [i.url, React.createRef()]))
  )

  React.useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          const id = e.target.id
          imgRefs.current.get(id).current.showImage()
        }
      })
    })

    imgRefs.current.forEach(ref => {
      if (ref.current != null) {
        observer.observe(ref.current.el)
      }
    })

    return () => {
      observer.disconnect()
    }
  }, [imgRefs])

  return imgRefs
}

const ListenPage = ({ data }) => {
  const items = data.allListenlink.nodes.map(l => ({
    ...l,
    timestamp: format(parseISO(l.timestamp), "E, LLL d"),
  }))

  const imgRefs = useLazy(items)

  return (
    <Layout>
      <h2>Feeds</h2>
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
            />
          ))}
        </ol>
      )}
    </Layout>
  )
}

export default ListenPage

export const query = graphql`
  query MyQuery {
    allListenlink(sort: { fields: timestamp, order: DESC }, limit: 60) {
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
