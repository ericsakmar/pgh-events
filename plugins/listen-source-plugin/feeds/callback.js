const Parser = require("rss-parser")
const parser = new Parser()

exports.getLinks = async () => {
  const feed = await parser.parseURL("http://feeds.libsyn.com/112724/rss")

  const links = feed.items.map(i => ({
    title: i.title,
    subtitle: "I'll Call You Right Back",
    url: i.link,
    timestamp: new Date(i.isoDate),
    tags: ["podcast"],
    image:
      "https://images.libsyn.com/p/assets/3/2/1/b/321b86b3a3f669ce16c3140a3186d450/Untitled_Artwork_2_copy-20250605-x0j16ngg2t.png?h=300&w=300&auto=compress",
  }))

  return links
}

exports.name = "i'll cal you right back"
