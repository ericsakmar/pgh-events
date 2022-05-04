require("dotenv").config()

module.exports = {
  siteMetadata: {
    title: `pgh.events`,
    description: `pittsburgh events`,
    author: `https://github.com/ericsakmar`,
    siteUrl: `https://pgh.events`,
  },

  plugins: [
    "gatsby-plugin-netlify",
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-image`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `pgh.events`,
        short_name: `pgh.events`,
        start_url: `/`,
        background_color: `#daa520`,
        theme_color: `#daa520`,
        display: `minimal-ui`,
        icon: `src/images/pgh-events.png`, // This path is relative to the root of the site.
        icon_options: {
          purpose: `maskable`,
        },
      },
    },
    `gatsby-plugin-offline`,
    "source-plugin",
  ],
}
