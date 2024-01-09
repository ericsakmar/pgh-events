import * as React from "react"
import { useStaticQuery, graphql } from "gatsby"

function Seo({ title }) {
  const { site, ogImageDefault } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            author
          }
        }

        ogImageDefault: file(relativePath: { eq: "card-2023.png" }) {
          childImageSharp {
            gatsbyImageData(layout: FIXED, height: 1200, width: 1200)
          }
        }
      }
    `
  )

  const cardImageSrc = `https://pgh.events${ogImageDefault.childImageSharp.gatsbyImageData.images.fallback.src}`
  const metaDescription = site.siteMetadata.description

  return (
    <>
      <title>{title}</title>
      <meta name="description" content={metaDescription} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:type" content="website" />
      <meta property="og:image" content={cardImageSrc} />
      <meta property="twitter:card" content="summary" />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={metaDescription} />
      <meta property="twitter:image" content={cardImageSrc} />
    </>
  )
}

export default Seo
