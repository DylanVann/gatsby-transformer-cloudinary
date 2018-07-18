import { GraphQLObjectType, GraphQLInt, GraphQLFloat } from 'gatsby/graphql'
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
            name: 'ImageCloudinaryFixed',
            fields: {
                ...commonFields({ pathPrefix, reporter }),
            },
        }),
        args: {
            width: {
                type: GraphQLInt,
                defaultValue: 400,
            },
            height: {
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
            return {
                id,
                path,
                width: data.width,
                height: data.height,
                aspectRatio: data.width / data.height,
                maxWidth: fieldArgs.maxWidth,
                maxHeight: fieldArgs.maxHeight,
                sizes,
            }
        },
    }
}
