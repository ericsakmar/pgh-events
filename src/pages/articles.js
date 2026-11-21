import * as React from "react"
import { graphql } from "gatsby"
import { format, parseISO } from "date-fns"
import Playlist from "../components/playlist"
import Seo from "../components/seo"
import * as styles from "./articles.module.css"
import Layout from "../components/layout"
import { useLazy } from "../hooks/useLazy"

export function Head() {
  return <Seo title="pgh.events/articles" />
}

const ArticlesPage = ({ data }) => {
  const articles = data.articles.nodes.map(l => ({
    ...l,
    timestamp: format(parseISO(l.timestamp), "E, LLL d"),
  }))

  const podcasts = data.podcasts.nodes.map(l => ({
    ...l,
    timestamp: format(parseISO(l.timestamp), "E, LLL d"),
  }))

  const videos = data.videos.nodes.map(l => ({
    ...l,
    timestamp: format(parseISO(l.timestamp), "E, LLL d"),
  }))

  const imgRefs = useLazy(articles)

  return (
    <Layout>
      {articles.length === 0 ? null : (
        <>
          <h2>Articles</h2>

          <div className={styles.grid}>
            {articles.map(article => (
              <Article article={article} key={article.id} />
            ))}
          </div>
        </>
      )}

      {videos.length === 0 ? null : (
        <>
          <h2 className={styles.subhead}>Videos</h2>

          <div className={styles.gridSub}>
            {videos.map(podcast => (
              <Article article={podcast} key={podcast.id} />
            ))}
          </div>
        </>
      )}

      {podcasts.length === 0 ? null : (
        <>
          <h2 className={styles.subhead}>Podcasts</h2>

          <div className={styles.gridSub}>
            {podcasts.map(podcast => (
              <ArticleTiny article={podcast} key={podcast.id} />
            ))}
          </div>
        </>
      )}
    </Layout>
  )
}

const Article = ({ article }) => {
  return (
    <div className={styles.gridItem}>
      <img src={article.image} />

      <div className={styles.details}>
        <div className={styles.source}>{article.subtitle}</div>
        <h3>{article.title}</h3>
        <p>{article.timestamp}</p>
      </div>
    </div>
  )
}

const ArticleTiny = ({ article }) => {
  return (
    <div className={styles.gridItemTiny}>
      <img src={article.image} />
      <div className={styles.details}>
        <div>
          <div className={styles.source}>{article.subtitle}</div>
        </div>
        <h3>{article.title}</h3>
        <p>{article.timestamp}</p>
      </div>
    </div>
  )
}
export default ArticlesPage

export const query = graphql`
  query MyQuery {
    articles: allListenlink(
      sort: { timestamp: DESC }
      limit: 6
      filter: { tags: { in: "blog" } }
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

    podcasts: allListenlink(
      sort: { timestamp: DESC }
      limit: 12
      filter: { tags: { in: "podcast" } }
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

    videos: allListenlink(
      sort: { timestamp: DESC }
      limit: 12
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
