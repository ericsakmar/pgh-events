const fetch = require("node-fetch")
const dateFns = require("date-fns")
const csv = require("@fast-csv/parse")
const { fetchPage } = require("./fetchPage")

const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET
const url = process.env.PLAYLIST_CSV_URL

const SHOW_IDS = [
  // these haven't updated for quite some time
  // { id: "4JZQQui0EI2SS1glrSYXuE", name: "Dog With A Mullet" },
  // { id: "4Z37CsR7DEIv1fPQjocgzd", name: "Yinz World" },
  // { id: "0r8E0rY07DP3USUsHsOxcs", name: "Qool Hand Podcast" },
]

const getToken = async () => {
  const tokenRes = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    body: `grant_type=client_credentials&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  })

  const tokenData = await tokenRes.json()
  const { access_token } = tokenData
  return access_token
}

const parseCsv = data =>
  new Promise(resolve => {
    const parsed = []

    csv
      .parseString(data, { headers: true })
      .transform(row => ({
        id: row.id,
        include: row.include === "YES",
      }))
      .on("data", row => parsed.push(row))
      .on("end", () => resolve(parsed))
  })

const getPlaylistIds = async () => {
  const rawData = await fetchPage(url)
  const data = await parseCsv(rawData)
  const ids = data.filter(d => d.include).map(d => d.id)
  return ids
}

const getPlaylists = async token => {
  const playlistIds = await getPlaylistIds()
  const detailRequests = playlistIds
    .map(id => `https://api.spotify.com/v1/playlists/${id}`)
    .map(p =>
      fetch(p, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
    )

  const detailRes = await Promise.all(detailRequests)
  const details = await Promise.all(detailRes.map(d => d.json()))

  return details
}

const getLastUpdated = tracks => {
  const lastAdded = tracks
    .map(track => ({ ...track, added_at: dateFns.parseISO(track.added_at) }))
    .reduce((last, track) =>
      dateFns.isAfter(track.added_at, last.added_at) ? track : last
    )

  return lastAdded.added_at
}

const getShows = async token => {
  const detailRequests = SHOW_IDS.map(
    show => `https://api.spotify.com/v1/shows/${show.id}/episodes`
  ).map(p =>
    fetch(p, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  )

  const detailRes = await Promise.all(detailRequests)
  const details = await Promise.all(detailRes.map(d => d.json()))

  return details
}
exports.getLinks = async () => {
  const token = await getToken()
  const playlists = await getPlaylists(token)
  const shows = await getShows(token)

  const links = playlists.map(p => ({
    title: p.name,
    subtitle: undefined,
    url: p.external_urls.spotify,
    timestamp: getLastUpdated(p.tracks.items),
    tags: ["spotify playlist"],
    image: p.images[0].url,
  }))

  const show_links = shows.flatMap((show, i) =>
    show.items.map(episode => ({
      title: episode.name,
      subtitle: SHOW_IDS[i].name,
      url: episode.external_urls.spotify,
      timestamp: dateFns.parse(episode.release_date, "yyyy-MM-dd", new Date()),
      tags: ["podcast"],
      image: episode.images[0].url,
    }))
  )

  return [...links, ...show_links]
}

exports.name = "spotify"
