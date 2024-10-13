const fetch = require("node-fetch")
const dateFns = require("date-fns")

const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET

const PLAYLIST_IDS = [
  "2v8KFDYiqLvBCIxTfNGmbz", // pittsburgh rock mix
  "3bHROgTxhHazGaKYSdXTV7", // pittsburgh indie
  "1s3veNWm04XXIKjSblDZov", // bottle rocket coming attrtactions
  "7v17EhPkbct20cz98FAa3O", // bottle rocket staff picks
  "6Iw5wOtMbK8yNS0OspzbI6", // another bottle rocket coming attractions
  "2FdCATcA4vY34267lIRsLY", // up next at gov center
  "27JMK3L5Tq7eqovZRgh8j7", // pgh & beyond
  "53EE3XgQr2Fl96SNXNx5rY", // guy in the hat
  "1PzjrC63GyglMJ6EpHCTj8", // ruggers radio
  "0FFYMRnIs3bveFloqw6G2R", // dltsgdom upcoming
  "5jSmjHBRxmBU4F6kS3nn2R", // dltsgdom now playing
  "39wtmUHDbA9XbZePrSJg1t", // steel city violence
  "0cCxsYg3qd7W3FHDrJlspC", // crafted sounds

  // these are probably too old to ever show up
  // "0W1YYPBd5HPjYovgqm8glh", // jan 2023
  // "6OWbvpOwHQpy4u9UcZVH1Q", // feb 2023
  // "1K9xAkp4Va6PfG1xoQIUaQ", // march 2023
  // "4scGQSuzlV5cOAtaAQrWBJ", // april 2023
  // "1wvQsJkINFsa865GHeERuP", // may 2023 releases
  // "7jol0T5btFPApxh8a0eZAs", // june 2023 releases
  // "7quJArVJjL6yvvJnpZr5Fh", // july 2023 releases
  // "5eKoG1OFuYETjAx2Y1Fqjy", // aug 2023 releases
  // "1sBJKNiMU9T64fZd3sq3jZ", // sept 2023
  // "4mWg8wKCCyyT1CwOn65ZA6", // oct 2023
  // "2eq1x3erjh0YO3eNJ5IWdp", // nov 2023
  // "2O2RY3sbREWT4cz0HZoAvW", // pghmt top 9
  "7lSqt0N4Ev1I8FMyfK59T0", // pghmt best of 2023
  "08aECbl8KLM4Ln5aWUO5dO", // jan 2024
  "5APiXrsu6velNLKUNYT0zZ", // feb 2024
  "1Rk6bDxe1VuAXWxpMX55O0", // march 2024
  "6OmBgf8Jna7Emh4RaEb0FE", // april 2024
  "3XUR9QOI4hhpspGvaanCrj", // may 2024
  "6hYU5NQxxsrc8e3sduFH3E", // june 2024
  "4JzUbsUgJEv6r35kiPJvTB", // july 2024
  "1t7n414TAhMBCetDROOyPn", // aug 2024
  "0xK3imK2fC1ZR3n7VaXlGZ", // sept 2024
]

const SHOW_IDS = [
  { id: "4JZQQui0EI2SS1glrSYXuE", name: "Dog With A Mullet" },
  { id: "4Z37CsR7DEIv1fPQjocgzd", name: "Yinz World" },
  { id: "0r8E0rY07DP3USUsHsOxcs", name: "Qool Hand Podcast" },
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
