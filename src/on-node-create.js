const _ = require(`lodash`)

module.exports = async function onCreateNode({ node, actions, createNodeId }) {
  const { createNode, createParentChildLink } = actions

  const extensions = [`jpeg`, `jpg`, `png`, `webp`, `tif`, `tiff`]
  if (!_.includes(extensions, node.extension)) {
    return
  }

  const imageNode = {
    id: createNodeId(`${node.id} >> ImageCloudinary`),
    children: [],
    parent: node.id,
    internal: {
      contentDigest: `${node.internal.contentDigest}`,
      type: `ImageCloudinary`,
    },
  }

  createNode(imageNode)
  createParentChildLink({ parent: node, child: imageNode })

  return
}
