const Parser = require("rss-parser")
const parser = new Parser()

exports.getLinks = async () => {
  const feed = await parser.parseURL(
    "https://wyep.org/category/music-features/pittsburgh-artist-of-the-week/feed/"
  )

  const links = feed.items.map(i => ({
    title: i.title,
    subtitle: "WYEP",
    url: i.link,
    timestamp: new Date(i.isoDate),
    tags: ["blog"],
    image: "https://cdn-profiles.tunein.com/s24147/images/logog.png?t=160743",
  }))

  return links
}

exports.name = "wyep"
