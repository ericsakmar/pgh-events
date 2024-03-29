const Parser = require("rss-parser")
const parser = new Parser({
  customFields: {
    item: [["media:group", "media"]],
  },
})

exports.getLinks = async () => {
  const feed = await parser.parseURL(
    "https://www.youtube.com/feeds/videos.xml?channel_id=UC-8Wg-glwdQ0Z4bVrYJegZQ"
  )

  const links = feed.items.map(i => ({
    title: i.title,
    subtitle: "WPTS Radio",
    url: i.link,
    timestamp: new Date(i.isoDate),
    tags: ["youtube channel"],
    image: i.media["media:thumbnail"][0]["$"].url,
  }))

  return links
}

exports.name = "modest director"
