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
  const items = data.articles.nodes.map(l => ({
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

  const imgRefs = useLazy(items)

  return (
    <Layout>
      <h2>Articles</h2>

      {items.length === 0 ? (
        <p>there's nothing here!</p>
      ) : (
        <>
          <div className={styles.grid}>
            <div className={styles.gridItemLarge}>
              <img src={items[0].image} />

              <div className={styles.details}>
                <div className={styles.source}>{items[0].subtitle}</div>
                <h3>{items[0].title}</h3>
                <p>{items[0].timestamp}</p>
              </div>
            </div>

            <ArticleSmall article={items[1]} />
            <ArticleSmall article={items[2]} />

            <ArticleSmall article={items[3]} />
            <ArticleSmall article={items[4]} />
            <ArticleSmall article={items[5]} />
          </div>
        </>
      )}

      {videos.length === 0 ? null : (
        <>
          <h2 className={styles.subhead}>Videos</h2>

          <div className={styles.gridSub}>
            {videos.map(podcast => (
              <ArticleSmall article={podcast} key={podcast.id} />
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

const ArticleSmall = ({ article }) => {
  return (
    <div className={styles.gridItemSmall}>
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
      limit: 12
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
