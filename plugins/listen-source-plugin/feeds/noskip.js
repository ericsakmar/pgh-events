const Parser = require("rss-parser")
const parser = new Parser({
  customFields: {
    item: [["media:thumbnail", "thumbnail"]],
  },
})

exports.getLinks = async () => {
  const feed = await parser.parseURL(
    "https://www.thenoskipshow.com/blog-feed.xml"
  )

  const links = feed.items.map(i => ({
    title: i.title,
    subtitle: "The No Skip Show",
    url: i.link,
    timestamp: new Date(i.pubDate),
    tags: ["blog"],
    image: i.enclosure.url,
  }))

  return links
}

exports.name = "bored in pittsburgh"
