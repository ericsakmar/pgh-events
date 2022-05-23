import * as React from "react"

import Layout from "../components/layout"
import Seo from "../components/seo"
import * as styles from "./about.module.css"

const AboutPage = () => {
  return (
    <Layout>
      <Seo title="pgh.events" />

      <p className={styles.about}>
        pgh.events is a mashup of venue calendars in Pittsburgh.
      </p>

      <p className={styles.about}>
        It is an open-source project and was created by Eric Sakmar.
      </p>

      <p className={styles.about}>
        Questions or comments? Please contact{" "}
        <a href="mailto:eric.sakmar@gmail.com">eric.sakmar@gmail.com</a>.
      </p>
    </Layout>
  )
}

export default AboutPage
