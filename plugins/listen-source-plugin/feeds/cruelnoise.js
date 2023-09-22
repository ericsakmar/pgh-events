const Parser = require("rss-parser")
const parser = new Parser()

// http://feeds.libsyn.com/82511/rss

exports.getLinks = async () => {
  const feed = await parser.parseURL("http://feeds.libsyn.com/82511/rss")

  const links = feed.items.map(i => ({
    title: i.title,
    subtitle: "Cruel Noise",
    url: i.link,
    timestamp: new Date(i.isoDate),
    tags: ["podcast"],
    image: i.itunes.image,
  }))

  return links
}

exports.name = "cruel noise"
