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
  const items = data.allListenlink.nodes.map(l => ({
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
      )}
    </Layout>
  )
}

const ArticleSmall = ({ article }) => {
  console.log("article", article)

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

export default ArticlesPage

export const query = graphql`
  query MyQuery {
    allListenlink(
      sort: { timestamp: DESC }
      limit: 100
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
  }
`
