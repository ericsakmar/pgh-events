import * as React from "react"
import Header from "../components/header"

import Layout from "../components/layout"
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
          pgh.events is an independent mashup of event calendars in Pittsburgh.
          It is an{" "}
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
