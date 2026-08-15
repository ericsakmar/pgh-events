const { fetchPage } = require("./fetchPage")

exports.getLinks = async () => {
  const raw = await fetchPage(
    "https://telegraphtree.com/wp-json/wp/v2/posts?_embed",
  )

  const feed = JSON.parse(raw)

  const links = feed.map(i => ({
    title: i.title.rendered,
    subtitle: "Telegraph Tree",
    url: i.link,
    timestamp: new Date(i.date),
    tags: ["blog"],
    image: i._embedded["wp:featuredmedia"]?.[0]?.source_url || null,
  }))

  return links
}

exports.name = "telegraph tree"
