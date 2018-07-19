import { GraphQLObjectType, GraphQLInt, GraphQLString } from 'gatsby/graphql'
import { commonFields } from './commonFields'
import { uploadOrGetMetadata } from 'cloudinary-promised'
import { getSrcSet } from './getSrcSet'
import { getResponsiveWidths } from './getResponsiveWidths'
import { oneLine } from 'common-tags'
import md5File from 'md5-file/promise'

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
            const id = file.id
            const path = file.absolutePath
            console.log('-----------------------------------------')
            console.log(file)
            console.log('-----------------------------------------')
            return null
            const fileHash = await md5File(path)
            const data = uploadOrGetMetadata(id, path, cloudinaryConfig)
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

                const videoSrcSetImages = widths.map(w => ({
                    width: w,
                    src: `https://res.cloudinary.com/${
                        cloudinaryConfig.cloud_name
                    }/video/upload/w_${w}/${id}.jpg`,
                }))

                const videoPosterSrcSet = getSrcSet(videoSrcSetImages)

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

                const imgSrcSetImages = widths.map(w => ({
                    width: w,
                    src: `https://res.cloudinary.com/${
                        cloudinaryConfig.cloud_name
                    }/image/upload/w_${w}/${id}`,
                }))

                const imgSrcSet = getSrcSet(imgSrcSetImages)

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
