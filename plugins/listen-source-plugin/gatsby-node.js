const NODE_TYPE = "listenlink"

exports.sourceNodes = async ({
  actions,
  createContentDigest,
  createNodeId,
}) => {
  const { createNode } = actions

  const res = await fetch(
    "https://raw.githubusercontent.com/ericsakmar/pgh-events-data/refs/heads/main/feeds.json",
  )

  const links = await res.json()

  links.forEach(link =>
    createNode({
      ...link,
      id: createNodeId(`${NODE_TYPE}-${link.url}`),
      parent: null,
      children: [],
      internal: {
        type: NODE_TYPE,
        content: JSON.stringify(link),
        contentDigest: createContentDigest(link),
      },
    }),
  )
}
