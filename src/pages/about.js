import * as React from "react"

import Layout from "../components/layout"
import Header from "../components/header"
import Seo from "../components/seo"
import * as styles from "./about.module.css"

const AboutPage = () => {
  return (
    <Layout>
      <Seo title="pgh.events" />

      <Header />
      <h2>about</h2>

      <div className={styles.about}>
        <p>
          pgh.events is a music-focused collection of events, playlists,
          podcasts, youtube channels and blogs in Pittsburgh, Pennsylvania. It
          is an{" "}
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
