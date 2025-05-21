const fetch = require("node-fetch")

const BUILD_HOOK = process.env.BUILD_HOOK
const API_TOKEN = process.env.API_TOKEN
const SITE_ID = process.env.SITE_ID
const HOUR_IN_MS = 1000 * 60 * 60

export default async () => {
  try {
    console.log("running scheduled deploy")
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
  } catch (error) {
    console.log("Caught general error")
    console.log(error)
  }

  return new Response("ok")
}

export const config = {
  schedule: "0 7 * * *",
}

const getLastDeployDate = async () => {
  console.log("getting last deploy date")
  const res = await fetch(
    `https://api.netlify.com/api/v1/sites/${SITE_ID}/deploys`,
    {
      headers: {
        Authorization: `Bearer ${API_TOKEN}`,
      },
    }
  )

  const json = await res.json()
  console.log("last deploy response:")
  console.log(JSON.stringify(json, null, 2))

  const rawDate = json[0].created_at
  return new Date(rawDate)
}

const shouldBuild = (now, lastDeployDate) => {
  const diff = now - lastDeployDate
  return diff > HOUR_IN_MS
}
