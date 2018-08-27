import {
    GraphQLObjectType,
    GraphQLInt,
    GraphQLString,
    GraphQLFloat,
} from 'graphql'
import { oneLine } from 'common-tags'
import { getData } from '@dylanvann/gatsby-cloudinary'

interface Args {
    maxWidth: number
    toImgFormat?: 'jpg' | 'png'
    toVideoFormat?: 'mp4'
    toVideoPosterFormat?: 'jpg' | 'png'
}

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
                width: {
                    type: GraphQLFloat,
                    description: 'The original width of the media.',
                },
                height: {
                    type: GraphQLFloat,
                    description: 'The original height of the media.',
                },
                // ----------------------------------------
                // img
                // ----------------------------------------
                imgSrc: {
                    type: GraphQLString,
                    description: oneLine`
                        src for the image.
                    `,
                },
                imgSrcSet: {
                    type: GraphQLString,
                    description: oneLine`
                        srcSet for the image.
                    `,
                },
                imgWebPSrc: {
                    type: GraphQLString,
                    description: oneLine`
                        src for the image (WebP).
                    `,
                },
                imgWebPSrcSet: {
                    type: GraphQLString,
                    description: oneLine`
                        srcSet for the image (WebP).
                    `,
                },
                imgBase64: {
                    type: GraphQLString,
                    description: oneLine`
                        A base64 version of the image.
                    `,
                },
                // ----------------------------------------
                // video
                //
                // no srcSet or base64
                // as those do not make sense for videos
                // ----------------------------------------
                videoSrc: {
                    type: GraphQLString,
                    description: oneLine`
                       src for the video.
                    `,
                },
                // ----------------------------------------
                // videoPoster
                // ----------------------------------------
                videoPosterSrc: {
                    type: GraphQLString,
                    description: oneLine`
                       src for the poster.
                    `,
                },
                videoPosterSrcSet: {
                    type: GraphQLString,
                    description: oneLine`
                       srcSet for the poster.
                    `,
                },
                videoPosterBase64: {
                    type: GraphQLString,
                    description: oneLine`
                       A base64 version of the poster.
                    `,
                },
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
        resolve: async (
            image: { parent: any },
            fieldArgs: Args,
            context: { path: string },
        ) => {
            try {
                const file = getNodeAndSavePathDependency(
                    image.parent,
                    context.path,
                )
                const path = file.absolutePath
                const maxWidth = fieldArgs.maxWidth
                const props = await getData({
                    path,
                    maxWidth,
                    config: cloudinaryConfig,
                    toImgFormat: fieldArgs.toImgFormat,
                    toVideoFormat: fieldArgs.toVideoFormat,
                    toVideoPosterFormat: fieldArgs.toVideoPosterFormat,
                })
                return props
            } catch (e) {
                console.error(e)
                return {}
            }
        },
    }
}
