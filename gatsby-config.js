require("dotenv").config()

module.exports = {
  siteMetadata: {
    title: `pgh.events`,
    description: `pgh.events is a music-focused collection of events, playlists, podcasts, youtube channels and blogs in Pittsburgh, Pennsylvania.`,
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
        description: `pgh.events is a music-focused collection of events, playlists, podcasts, youtube channels and blogs in Pittsburgh, Pennsylvania.`,
        start_url: `/`,
        background_color: `#daa520`,
        theme_color: `#222831`,
        display: `minimal-ui`,
        icon: `src/images/pgh-events.png`, // This path is relative to the root of the site.
        icon_options: {
          purpose: `any maskable`,
        },
      },
    },
    // `gatsby-plugin-offline`,
    "gatsby-plugin-remove-serviceworker",
    "source-plugin",
    "listen-source-plugin",

    {
      resolve: `gatsby-omni-font-loader`,
      options: {
        enableListener: true,
        preconnect: [
          `https://fonts.googleapis.com`,
          `https://fonts.gstatic.com`,
        ],
        web: [
          // {
          //   name: `Rubik`,
          //   file: `https://fonts.googleapis.com/css2?family=Rubik:wght@300;400;500&display=swap`,
          // },
          // {
          //   name: `Caprasimo`,
          //   file: `https://fonts.googleapis.com/css2?family=Caprasimo&display=swap`,
          // },
          // {
          //   name: `Abril Fatface`,
          //   file: `https://fonts.googleapis.com/css2?family=Abril+Fatface&display=swap`,
          // },
          {
            name: `Bevan`,
            file: `https://fonts.googleapis.com/css2?family=Bevan&display=swap`,
          },
        ],
      },
    },
  ],
}
