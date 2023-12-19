const { fetchPage } = require("./fetchPage")

exports.getLinks = async () => {
  const raw = await fetchPage("https://api.mixcloud.com/agaveparty/cloudcasts/")

  const feed = JSON.parse(raw)

  const links = feed.data.map(i => ({
    title: i.name,
    subtitle: "Agave Party",
    url: i.url,
    timestamp: new Date(i.created_time),
    tags: ["podcast"],
    image: i.pictures.medium,
  }))

  return links
}

exports.name = "cruel noise"
