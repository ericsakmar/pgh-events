const Parser = require("rss-parser")
const parser = new Parser({
  customFields: {
    item: [["media:group", "media"]],
  },
})

exports.getLinks = async () => {
  const feed = await parser.parseURL(
    "https://www.youtube.com/feeds/videos.xml?channel_id=UCj05itdKFi1F93TbZrHlpRA"
  )

  const links = feed.items
    .map(i => ({
      title: i.title,
      subtitle: "Modest Director",
      url: i.link,
      timestamp: new Date(i.isoDate),
      tags: ["youtube channel"],
      image: i.media["media:thumbnail"][0]["$"].url,
      isShort: i.media["media:description"][0] === "", // shorts dont have a description
    }))
    .filter(l => !l.isShort)
    .map(({ isShort, ...l }) => l)

  return links
}

exports.name = "modest director"
