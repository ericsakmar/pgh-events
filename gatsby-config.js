module.exports = {
  siteMetadata: {
    title: `pgh.events`,
    description: `pittsburgh events`,
    author: `https://github.com/ericsakmar`,
    siteUrl: `https://pgh.events`
  },

  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-image`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`
      }
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        // This will impact how browsers show your PWA/website
        // https://css-tricks.com/meta-theme-color-and-trickery/
        // theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png` // This path is relative to the root of the site.
      }
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,

    {
      resolve: "gatsby-source-custom-api",
      options: {
        rootKey: "events",
        // url: "http://0.0.0.0:8888/.netlify/functions/events",
        url: {
          development: "http://0.0.0.0:8888/.netlify/functions/events",
          production:
            "https://pgh-live-api.netlify.app/.netlify/functions/events"
        },
        schemas: {
          events: `
            title: String
            description: String
            date: String
            location: String
            source: String
          `
        }
      }
    }
  ]
}
