import { GraphQLObjectType, GraphQLInt, GraphQLString } from 'gatsby/graphql'
import { commonFields } from './commonFields'
import { uploadOrGetMetadata } from 'cloudinary-promised'

export default ({
    pathPrefix,
    getNodeAndSavePathDependency,
    reporter,
    cloudinaryConfig,
}) => {
    return {
        type: new GraphQLObjectType({
            name: 'ImageCloudinaryFluid',
            fields: {
                ...commonFields({ pathPrefix, reporter }),
                sizes: { type: GraphQLString },
            },
        }),
        args: {
            maxWidth: {
                type: GraphQLInt,
                defaultValue: 800,
            },
            maxHeight: {
                type: GraphQLInt,
            },
        },
        resolve: async (image, fieldArgs, context) => {
            const file = getNodeAndSavePathDependency(
                image.parent,
                context.path,
            )
            const id = file.id
            const path = file.absolutePath
            const data = uploadOrGetMetadata(id, path, cloudinaryConfig)
            const presentationWidth = Math.min(fieldArgs.maxWidth, data.width)
            const sizes = `(max-width: ${presentationWidth}px) 100vw, ${presentationWidth}px`
            const srcVideoPoster = `https://res.cloudinary.com/${
                cloudinaryConfig.cloud_name
            }/video/upload/w_${presentationWidth}/${id}.jpg`
            const srcVideo = `https://res.cloudinary.com/${
                cloudinaryConfig.cloud_name
            }/video/upload/w_${presentationWidth}/${id}.mp4`
            return {
                // internal
                id,
                path,
                maxWidth: fieldArgs.maxWidth,
                maxHeight: fieldArgs.maxHeight,
                // dimensions
                width: data.width,
                height: data.height,
                aspectRatio: data.width / data.height,
                // video
                srcVideoPoster,
                srcVideo,
                sizes,
            }
        },
    }
}
