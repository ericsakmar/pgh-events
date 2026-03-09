require("dotenv").config()

module.exports = {
  siteMetadata: {
    title: `pgh.events`,
    description: `pgh.events is a music-focused collection of events, videos, podcasts, playlists, articles and more in Pittsburgh, Pennsylvania.`,
    author: `https://github.com/ericsakmar`,
    siteUrl: `https://pgh.events`,
  },

  plugins: [
    "gatsby-plugin-netlify",
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
        description: `pgh.events is a music-focused collection of events, videos, podcasts, playlists, articles and more in Pittsburgh, Pennsylvania.`,
        start_url: `/`,
        background_color: `#ffb300`,
        theme_color: `#1a1a1b`,
        display: `minimal-ui`,
        icon: `src/images/icon-2026.png`, // This path is relative to the root of the site.
        icon_options: {
          purpose: `any maskable`,
        },
      },
    },
    // `gatsby-plugin-offline`,
    "gatsby-plugin-remove-serviceworker",
    "source-plugin",
    "listen-source-plugin",
  ],
}
