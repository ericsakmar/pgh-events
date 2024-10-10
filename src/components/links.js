import * as React from "react"
import * as styles from "./links.module.css"
import LinkList from "../components/linkList"

const Links = () => {
  return (
    <aside className={styles.links}>
      <h2 className={styles.header}>Other Links</h2>
      <p className={styles.description}>
        more music, calendars, and Patreon pages.
      </p>

      <LinkList />
    </aside>
  )
}

export default Links
