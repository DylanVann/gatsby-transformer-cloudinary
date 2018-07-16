import fs from 'fs-extra'
import onCreateNode from './on-node-create'
import extendNodeType from './extend-node-type'

exports.onCreateNode = onCreateNode
exports.setFieldsOnGraphQLNodeType = extendNodeType

// Check if there are any ImageCloudinary nodes and if gatsby-image is installed. If so
// add fragments for ImageCloudinary and gatsby-image. The fragment will cause an error
// if there's not ImageCloudinary nodes and without gatsby-image, the fragment is useless.
// In the case there are no ImageCloudinary nodes then this function does nothing.
exports.onPreExtractQueries = async ({ store, getNodes }) => {
    const program = store.getState().program

    const nodes = getNodes()

    if (!nodes.some(n => n.internal.type === `ImageCloudinary`)) {
        return
    }

    let gatsbyImageDoesNotExist = true
    try {
        require.resolve(`gatsby-image`)
        gatsbyImageDoesNotExist = false
    } catch (e) {
        // Ignore
    }

    if (gatsbyImageDoesNotExist) {
        return
    }

    // We have both gatsby-image installed as well as ImageCloudinary nodes so let's
    // add our fragments to .cache/fragments.
    await fs.copy(
        require.resolve(
            `@dylanvann/gatsby-transformer-cloudinary/src/fragments.js`,
        ),
        `${program.directory}/.cache/fragments/image-cloudinary-fragments.js`,
    )
}
