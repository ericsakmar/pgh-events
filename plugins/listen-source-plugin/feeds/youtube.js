const Parser = require("rss-parser")
const parser = new Parser({
  customFields: {
    item: [["media:group", "media"]],
  },
})

const CHANNEL_IDS = [
  "UC1WvWt8qjthHWTj9sYX65Xw", // michi tapes
  "UCQwUJhguRTEAZrhj2GjKlRQ", // bottle rocket
  "UCXGve1fVe8kOan1prjkyafg", // i quit my band
  "UCj05itdKFi1F93TbZrHlpRA", // modest director
  "UCy7GWS2r7d-dPhWNSC5ri9A", // vibe vote
  "UC1j_mioKL69rn_8P821iehA", // little giant
]

const getChannel = async id => {
  const feed = await parser.parseURL(
    `https://www.youtube.com/feeds/videos.xml?channel_id=${id}`
  )

  const links = feed.items.map(i => ({
    title: i.title,
    subtitle: feed.title,
    url: i.link,
    timestamp: new Date(i.isoDate),
    tags: ["youtube channel"],
    image: i.media["media:thumbnail"][0]["$"].url,
    // isShort: i.media["media:description"][0] === "", // shorts dont have a description
  }))
  // .filter(l => !l.isShort)
  // .map(({ isShort, ...l }) => l)

  return links
}

exports.getLinks = async () => {
  const links = await Promise.all(CHANNEL_IDS.map(getChannel))
  return links.flatMap(l => l)
}

exports.name = "youtube"
