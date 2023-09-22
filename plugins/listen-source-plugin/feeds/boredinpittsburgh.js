const Parser = require("rss-parser")
const parser = new Parser({
  customFields: {
    item: [["media:thumbnail", "thumbnail"]],
  },
})

exports.getLinks = async () => {
  const feed = await parser.parseURL(
    "https://boredinpittsburgh.home.blog/category/daily-discovery/daily-yinz/feed/"
  )

  const links = feed.items.map(i => ({
    title: i.title,
    subtitle: "Bored In Pittsburgh",
    url: i.link,
    timestamp: new Date(i.isoDate),
    tags: ["blog"],
    image: i.thumbnail["$"].url,
  }))

  return links
}

exports.name = "bored in pittsburgh"
