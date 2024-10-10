import fetch from "node-fetch"
import { NetlifyAPI } from "netlify"

const BUILD_HOOK = process.env.BUILD_HOOK
const API_TOKEN = process.env.API_TOKEN
const HOUR_IN_MS = 1000 * 60 * 60
const client = new NetlifyAPI(API_TOKEN)

export default async () => {
  const lastDeployDate = await getLastDeployDate()
  const now = new Date()
  const doIt = shouldBuild(now, lastDeployDate)

  if (doIt) {
    fetch(BUILD_HOOK, {
      method: "POST",
    }).then(response => {
      console.log("Build hook response:", response.json())
    })
  }

  return new Response("ok")
}

export const config = {
  schedule: "0 7 * * *",
}

const getLastDeployDate = async () => {
  const deploys = await client.listSiteDeploys({
    site_id: "eaa69b22-e0b2-4623-9532-fc58d5203e17",
  })

  return new Date(deploys[0].created_at)
}

const shouldBuild = (now, lastDeployDate) => {
  const diff = now - lastDeployDate
  return diff > HOUR_IN_MS
}
