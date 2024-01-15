const fetch = require("node-fetch")
const dateFns = require("date-fns")

const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET

const PLAYLIST_IDS = [
  "2v8KFDYiqLvBCIxTfNGmbz", // pittsburgh rock mix
  "3bHROgTxhHazGaKYSdXTV7", // pittsburgh indie
  "1s3veNWm04XXIKjSblDZov", // bottle rocket coming attrtactions
  "7v17EhPkbct20cz98FAa3O", // bottle rocket staff picks
  "5eKoG1OFuYETjAx2Y1Fqjy", // aug 2023 releases
  "7quJArVJjL6yvvJnpZr5Fh", // july 2023 releases
  "7jol0T5btFPApxh8a0eZAs", // june 2023 releases
  "1wvQsJkINFsa865GHeERuP", // may 2023 releases
  "1wvQsJkINFsa865GHeERuP", // may 2023 releases
  "4scGQSuzlV5cOAtaAQrWBJ", // april 2023
  "1K9xAkp4Va6PfG1xoQIUaQ", // march 2023
  "6OWbvpOwHQpy4u9UcZVH1Q", // feb 2023
  "0W1YYPBd5HPjYovgqm8glh", // jan 2023
  "1sBJKNiMU9T64fZd3sq3jZ", // sept 2023
  "4mWg8wKCCyyT1CwOn65ZA6", // oct 2023
  "2eq1x3erjh0YO3eNJ5IWdp", // nov 2023
  "2FdCATcA4vY34267lIRsLY", // up next at gov center
  "2O2RY3sbREWT4cz0HZoAvW", // pghmt top 9
  "7lSqt0N4Ev1I8FMyfK59T0", // pghmt best of 2023
  "27JMK3L5Tq7eqovZRgh8j7", // pgh & beyond
  "08aECbl8KLM4Ln5aWUO5dO", // jan 2024
]

const SHOW_IDS = [
  "4JZQQui0EI2SS1glrSYXuE", // dog with a mullet
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

const getPlaylists = async token => {
  const detailRequests = PLAYLIST_IDS.map(
    id => `https://api.spotify.com/v1/playlists/${id}`
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
    id => `https://api.spotify.com/v1/shows/${id}/episodes`
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

  const show_links = shows
    .flatMap(s => s.items)
    .map(s => ({
      title: s.name,
      subtitle: "Dog With A Mullet", // TODO change names if you ever add more
      url: s.external_urls.spotify,
      timestamp: dateFns.parse(s.release_date, "yyyy-MM-dd", new Date()),
      tags: ["spotify show"],
      image: s.images[0].url,
    }))

  return [...links, ...show_links]
}

exports.name = "spotify"
