import * as React from "react"

import Layout from "../components/layout"
import Seo from "../components/seo"
import * as styles from "./about.module.css"

export function Head() {
  return <Seo title="pgh.events/about" />
}

const AboutPage = () => {
  return (
    <Layout>
      <h2>about</h2>

      <div className={styles.about}>
        <p>
          pgh.events is a music-focused collection of events, playlists,
          podcasts, videos and blogs in Pittsburgh, Pennsylvania. It is an{" "}
          <a href="https://github.com/ericsakmar/pgh-events">
            open-source project
          </a>{" "}
          and was created by Eric Sakmar.
        </p>

        <p>
          Questions or comments? Please contact{" "}
          <a href="mailto:eric.sakmar@gmail.com">eric.sakmar@gmail.com</a>.
        </p>
      </div>
    </Layout>
  )
}

export default AboutPage
