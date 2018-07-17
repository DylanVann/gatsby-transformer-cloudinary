import { GraphQLObjectType, GraphQLInt, GraphQLString } from 'gatsby/graphql'
import { fluid } from 'gatsby-plugin-sharp'
import { commonFields } from './commonFields'
import uploadToCloudinary from './uploadToCloudinary'

export default ({
    pathPrefix,
    getNodeAndSavePathDependency,
    reporter,
    cloudinary,
}) => {
    return {
        type: new GraphQLObjectType({
            name: 'ImageCloudinaryFluid',
            fields: {
                ...commonFields({ pathPrefix, reporter, cloudinary }),
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
            /**
             * This function has to provide the public_id
             * of the uploaded image. Then other resolve functions
             * will perform transformations on that public_id.
             *
             * This must also provide:
             * - width
             * - height
             * - aspectRatio
             * - base64
             * - sizes
             *
             * All the transformations will return remote urls on cloudinary.
             */
            const file = getNodeAndSavePathDependency(
                image.parent,
                context.path,
            )
            const id = file.id
            const path = file.absolutePath
            const data = await uploadToCloudinary(id, path)
            return {
                id: data.public_id,
                width: data.width,
                height: data.height,
                aspectRatio: data.width / data.height,
                maxWidth: fieldArgs.maxWidth,
                maxHeight: fieldArgs.maxHeight,
            }
        },
    }
}
