import { GraphQLObjectType, GraphQLString, GraphQLFloat } from 'gatsby/graphql'
import fs from 'fs'
import fsExtra from 'fs-extra'
import imageSize from 'probe-image-size'
import path from 'path'

function toArray(buf) {
    let arr = new Array(buf.length)
    for (let i = 0; i < buf.length; i++) {
        arr[i] = buf[i]
    }
    return arr
}

export default ({ pathPrefix, getNodeAndSavePathDependency }) => ({
    args: {},
    type: new GraphQLObjectType({
        name: 'ImageCloudinaryOriginal',
        fields: {
            width: { type: GraphQLFloat },
            height: { type: GraphQLFloat },
            aspectRatio: { type: GraphQLFloat },
            src: { type: GraphQLString },
        },
    }),
    resolve: async (image, fieldArgs, context) => {
        const details = getNodeAndSavePathDependency(image.parent, context.path)
        const dimensions = imageSize.sync(
            toArray(fs.readFileSync(details.absolutePath)),
        )
        const imageName = `${details.name}-${image.internal.contentDigest}${
            details.ext
        }`
        const publicPath = path.join(
            process.cwd(),
            `public`,
            `static`,
            imageName,
        )
        if (!fsExtra.existsSync(publicPath)) {
            fsExtra.copy(details.absolutePath, publicPath, err => {
                if (err) {
                    console.error(
                        `error copying file from ${
                            details.absolutePath
                        } to ${publicPath}`,
                        err,
                    )
                }
            })
        }
        return {
            width: dimensions.width,
            height: dimensions.height,
            aspectRatio: dimensions.width / dimensions.height,
            src: `${pathPrefix}/static/${imageName}`,
        }
    },
})
