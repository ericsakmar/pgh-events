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
    image:
      "https://ssl-static.libsyn.com/p/assets/c/5/b/0/c5b017eeb31e690e/cruel_podcast_new.jpg",
  }))

  return links
}

exports.name = "cruel noise"
