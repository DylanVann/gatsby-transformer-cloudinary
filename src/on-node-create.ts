const extensions = [
    `jpeg`,
    `jpg`,
    `png`,
    `webp`,
    `tif`,
    `tiff`,
    `gif`,
    `mp4`,
    `webm`,
    `ogv`,
].reduce((acc: any, v: string) => {
    acc[v] = v
    return acc
}, {})

export default ({ node, actions, createNodeId }) => {
    const { createNode, createParentChildLink } = actions

    if (!extensions[node.extension]) {
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
