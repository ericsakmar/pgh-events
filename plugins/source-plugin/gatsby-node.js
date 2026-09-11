const POST_NODE_TYPE = `Event`

exports.onPreInit = () => console.log("Loaded gatsby-starter-plugin")

exports.sourceNodes = async ({
  actions,
  createContentDigest,
  createNodeId,
}) => {
  const { createNode } = actions

  const now = new Date()

  const res = await fetch(
    "https://raw.githubusercontent.com/ericsakmar/pgh-events-data/refs/heads/main/events.json",
  )

  const events = await res.json()

  console.log(
    `fetched data in ${(new Date().getTime() - now.getTime()) / 1000} seconds`,
  )

  events.forEach(event =>
    createNode({
      ...event,
      id: createNodeId(
        `${POST_NODE_TYPE}-${event.title}-${event.date}-${event.location}`,
      ),
      parent: null,
      children: [],
      internal: {
        type: POST_NODE_TYPE,
        content: JSON.stringify(event),
        contentDigest: createContentDigest(event),
      },
    }),
  )
}
