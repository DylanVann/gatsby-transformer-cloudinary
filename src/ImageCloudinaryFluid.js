import { GraphQLObjectType, GraphQLInt, GraphQLString } from 'gatsby/graphql'
import { commonFields } from './commonFields'
import { upload, getData } from './cloudinary'
import { urlExists } from './urlExists'

export default ({
    pathPrefix,
    getNodeAndSavePathDependency,
    reporter,
    cloudinary,
    cloudName,
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
            const urlImg = `http://res.cloudinary.com/${cloudName}/image/upload/${id}`
            const urlVideo = `http://res.cloudinary.com/${cloudName}/video/upload/${id}`
            const imgExists = await urlExists(urlImg)
            const videoExists = await urlExists(urlVideo)

            let data
            if (!imgExists && !videoExists) {
                // Have to upload the image or video
                data = await upload(cloudinary)(id, path)
            } else {
                // Already uploaded, we just get the metadata
                data = await getData(cloudinary)(id, path)
            }

            const presentationWidth = Math.min(fieldArgs.maxWidth, data.width)
            const sizes = `(max-width: ${presentationWidth}px) 100vw, ${presentationWidth}px`
            const srcVideoPoster = `http://res.cloudinary.com/${cloudName}/video/upload/w_${presentationWidth}/${id}.jpg`
            const srcVideo = `http://res.cloudinary.com/${cloudName}/video/upload/w_${presentationWidth}/${id}.mp4`
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
