const fetch = require("node-fetch")

const BUILD_HOOK = process.env.BUILD_HOOK
const API_TOKEN = process.env.API_TOKEN
const SITE_ID = process.env.SITE_ID
const HOUR_IN_MS = 1000 * 60 * 60

export default async () => {
  const lastDeployDate = await getLastDeployDate()
  const now = new Date()
  const doIt = shouldBuild(now, lastDeployDate)

  if (doIt) {
    console.log("sending request to build hook")
    const response = await fetch(BUILD_HOOK, {
      method: "POST",
    })

    const json = await response.text()
    console.log("Build hook response:", json)
  } else {
    console.log("skipping build")
  }

  return new Response("ok")
}

export const config = {
  schedule: "0 7 * * *",
}

const getLastDeployDate = async () => {
  const res = await fetch(
    `https://api.netlify.com//api/v1/sites/${SITE_ID}/deploys`,
    {
      headers: {
        Authorization: `Bearer ${API_TOKEN}`,
      },
    }
  )

  const json = await res.json()
  const rawDate = json[0].created_at

  return new Date(rawDate)
}

const shouldBuild = (now, lastDeployDate) => {
  const diff = now - lastDeployDate
  return diff > HOUR_IN_MS
}
