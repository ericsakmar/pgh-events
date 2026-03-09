const fetch = require("node-fetch")

const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY

const PLAYLIST_IDS = [
  "PLb6SQXhVAmc_5SkSe3KMt4GgZpNiUryA3", // pghlmt feb 2026
  "PLb6SQXhVAmc-0smSO_HEsiNXt6zYyCGwQ", // pghlmt jan 2026
  "PLb6SQXhVAmc9dqgP5Hz2KGDoBGXIiKvkp", // pghlmt best of 2025
]

const getDetails = async id => {
  const playlistUrl = `https://music.youtube.com/playlist?list=${id}`

  const metaUrl = new URL("https://www.googleapis.com/youtube/v3/playlists")
  metaUrl.searchParams.set("part", "snippet")
  metaUrl.searchParams.set("id", id)
  metaUrl.searchParams.set("key", YOUTUBE_API_KEY)

  try {
    const metaRes = await fetch(metaUrl.toString())
    const metaJson = await metaRes.json()

    if (!metaJson.items || metaJson.items.length === 0) {
      console.error(`Playlist not found: ${id}`)
      return []
    }

    const playlist = metaJson.items[0]

    const itemsUrl = new URL(
      "https://www.googleapis.com/youtube/v3/playlistItems"
    )
    itemsUrl.searchParams.set("part", "snippet")
    itemsUrl.searchParams.set("maxResults", "50")
    itemsUrl.searchParams.set("playlistId", id)
    itemsUrl.searchParams.set("key", YOUTUBE_API_KEY)

    return [
      {
        title: playlist.snippet.title,
        subtitle: "YouTube Music",
        url: playlistUrl,
        timestamp: new Date(playlist.snippet.publishedAt),
        tags: ["playlist"],
        image: playlist.snippet.thumbnails.standard?.url,
      },
    ]
  } catch (error) {
    console.error(`Error fetching YouTube details for ${id}:`, error)
    return []
  }
}

exports.getLinks = async () => {
  const links = await Promise.all(PLAYLIST_IDS.map(getDetails))
  return links.flatMap(l => l)
}

exports.name = "youtube music"
