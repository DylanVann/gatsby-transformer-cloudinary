import { GraphQLObjectType, GraphQLInt, GraphQLString } from 'gatsby/graphql'
import { commonFields } from './commonFields'
import { isVideo, upload } from './cloudinary'
import { parseVideo } from './parseVideo'

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
            const data = await upload(cloudinary)(id, path)
            const presentationWidth = Math.min(fieldArgs.maxWidth, data.width)
            const sizes = `(max-width: ${presentationWidth}px) 100vw, ${presentationWidth}px`
            const videoTag =
                isVideo(path) &&
                cloudinary.video(id, { width: presentationWidth })
            let videoData = {}
            if (videoTag) {
                videoData = parseVideo(videoTag)
            }
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
                srcVideoPoster: videoData.jpg,
                srcVideoMp4: videoData.mp4,
                srcVideoWebm: videoData.webm,
                srcVideoOgg: videoData.ogv,
                sizes,
            }
        },
    }
}
