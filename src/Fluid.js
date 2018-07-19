import { GraphQLObjectType, GraphQLInt, GraphQLString } from 'gatsby/graphql'
import { commonFields } from './commonFields'
import { uploadOrGetMetadata, isVideo } from 'cloudinary-promised'
import { getSrcSet } from './getSrcSet'
import { getResponsiveWidths } from './getResponsiveWidths'
import { oneLine } from 'common-tags'
import md5File from 'md5-file/promise'
import { getBase64FromUrl } from './get-base64-from-url'

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
                ...commonFields,
                sizes: { type: GraphQLString },
            },
        }),
        args: {
            maxWidth: {
                type: GraphQLInt,
                description: 'The max width the media will be displayed at.',
                defaultValue: 800,
            },
            maxHeight: {
                type: GraphQLInt,
                description: oneLine`
                    The max height the media will be displayed at.
                    You probably want to use maxWidth instead of this.
                `,
            },
            toImgFormat: {
                type: GraphQLString,
                description: 'Format to convert img to.',
            },
            toVideoFormat: {
                type: GraphQLString,
                description: 'Format to convert video to.',
            },
            toVideoPosterFormat: {
                type: GraphQLString,
                description: 'Format to convert videoPoster to.',
            },
        },
        resolve: async (image, fieldArgs, context) => {
            const file = getNodeAndSavePathDependency(
                image.parent,
                context.path,
            )
            const path = file.absolutePath
            // Use an md5 hash of the file as the ID.
            const id = await md5File(path)
            const data = await uploadOrGetMetadata(id, path, cloudinaryConfig)
            const width = Math.min(fieldArgs.maxWidth, data.width)
            const maxWidth = fieldArgs.maxWidth
            const sizes = `(max-width: ${width}px) 100vw, ${width}px`
            const widths = getResponsiveWidths(maxWidth, width)

            let mediaData
            if (isVideo(path)) {
                const videoPosterSrc = `https://res.cloudinary.com/${
                    cloudinaryConfig.cloud_name
                }/video/upload/w_${width}/${id}.jpg`

                const videoSrc = `https://res.cloudinary.com/${
                    cloudinaryConfig.cloud_name
                }/video/upload/w_${width}/${id}.mp4`

                // Get the srcSet.
                const videoSrcSetImages = widths.map(w => ({
                    width: w,
                    src: `https://res.cloudinary.com/${
                        cloudinaryConfig.cloud_name
                    }/video/upload/w_${w}/${id}.jpg`,
                }))
                const videoPosterSrcSet = getSrcSet(videoSrcSetImages)

                // Get base64.
                const videoPosterBase64Url = `https://res.cloudinary.com/${
                    cloudinaryConfig.cloud_name
                }/video/upload/w_10/${id}.jpg`
                const videoPosterBase64 = await getBase64FromUrl(
                    videoPosterBase64Url,
                )

                const videoPosterData = {
                    videoPosterSrc,
                    videoPosterSrcSet,
                    videoPosterBase64,
                }
                const videoData = {
                    videoSrc,
                }

                mediaData = {
                    ...videoPosterData,
                    ...videoData,
                }
            } else {
                const imgSrc = `https://res.cloudinary.com/${
                    cloudinaryConfig.cloud_name
                }/image/upload/w_${width}/${id}`

                // Get the srcSet.
                const imgSrcSetImages = widths.map(w => ({
                    width: w,
                    src: `https://res.cloudinary.com/${
                        cloudinaryConfig.cloud_name
                    }/image/upload/w_${w}/${id}`,
                }))
                const imgSrcSet = getSrcSet(imgSrcSetImages)

                // Get base64.
                const imgBase64Url = `https://res.cloudinary.com/${
                    cloudinaryConfig.cloud_name
                }/image/upload/w_10/${id}.jpg`
                const imgBase64 = await getBase64FromUrl(imgBase64Url)

                const imgData = {
                    imgSrc,
                    imgSrcSet,
                    imgBase64,
                }

                mediaData = {
                    ...imgData,
                }
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
                // media data for img, video, videoPoster
                ...mediaData,
                sizes,
            }
        },
    }
}
