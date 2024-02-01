const Parser = require("rss-parser")
const parser = new Parser()

exports.getLinks = async () => {
  const feed = await parser.parseURL(
    "https://pghindependent.com/category/music/feed/"
  )

  const links = feed.items.map(i => ({
    title: i.title,
    subtitle: "Pittsburgh Independent",
    url: i.link,
    timestamp: new Date(i.isoDate),
    tags: ["blog"],
    image:
      "https://pghindependent.com/wp-content/uploads/2022/04/cropped-Pittsburgh-Independent-Logo-512-300x300.jpg",
  }))

  return links
}

exports.name = "pgh independent"
