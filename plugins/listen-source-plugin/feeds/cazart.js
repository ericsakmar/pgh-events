const Parser = require("rss-parser")
const parser = new Parser({
  customFields: {
    item: [["media:thumbnail", "thumbnail"]],
  },
})

exports.getLinks = async () => {
  const blogFeed = await parser.parseURL(
    "https://thecazartchronicles.blogspot.com/feeds/posts/default?alt=rss"
  )

  const blogLinks = blogFeed.items
    .filter(i => !i.title.toLowerCase().includes("podcast"))
    .map(i => ({
      title: i.title,
      subtitle: "The Cazart Chronicles",
      url: i.link,
      timestamp: new Date(i.isoDate),
      tags: ["blog"],
      image: i.thumbnail["$"].url.replace(/s72\-c/, "s400"),
    }))

  const podcastFeed = await parser.parseURL(
    "http://feeds.libsyn.com/458343/rss"
  )

  const podcastLinks = podcastFeed.items.map(i => ({
    title: i.title,
    subtitle: "The Cazart Chronicles",
    url: i.link,
    timestamp: new Date(i.isoDate),
    tags: ["podcast"],
    image: i.itunes.image,
  }))

  return [...blogLinks, ...podcastLinks]
}

exports.name = "bored in pittsburgh"
