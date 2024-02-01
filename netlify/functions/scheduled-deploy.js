const fetch = require("node-fetch")

const BUILD_HOOK = process.env.BUILD_HOOK

export default async () => {
  await fetch(BUILD_HOOK, {
    method: "POST",
  }).then(response => {
    console.log("Build hook response:", response.json())
  })

  return {
    statusCode: 200,
  }
}

export const config = {
  schedule: "0 2 * * *",
}
