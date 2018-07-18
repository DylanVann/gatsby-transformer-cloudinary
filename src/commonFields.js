import { fixed } from 'gatsby-plugin-sharp'
import { oneLine } from 'common-tags'
import { base64 } from 'sharp-base64'
const { GraphQLString, GraphQLFloat } = require('gatsby/graphql')
import cloudinary from 'cloudinary'

const getSrcDescription = format => `Image src in ${format} format.`
const getSrcSetDescription = format => `Image srcset in ${format} format.`

export const commonFields = () => {
    const getResolveSrc = format => ({ id }) =>
        cloudinary.url(id, { format, secure: true })

    const getResolveSrcSet = format => async ({ id, width, maxWidth }) => {
        const factors = [0.25, 0.5, 1, 1.5, 2, 3]
        // This is enough sizes to provide close to the optimal image size for every
        // device size / screen resolution.
        // We don't upscale the images.
        const widths = factors
            .map(x => x * maxWidth)
            .map(x => Math.round(x))
            .filter(x => x < width)
            .concat(width)
            .sort()

        const images = widths.map(width => ({
            url: cloudinary.url(id, {
                format,
                width,
                crop: 'fit',
                secure: true,
            }),
            width,
        }))

        const srcSet = images
            .map(image => `${image.url} ${Math.round(image.width)}w`)
            .join(`,\n`)

        return srcSet
    }

    return {
        width: {
            type: GraphQLFloat,
            description: 'The original width of the image.',
        },
        height: {
            type: GraphQLFloat,
            description: 'The original height of the image.',
        },
        aspectRatio: {
            type: GraphQLFloat,
            description: oneLine`
                The aspect ratio of the image (width/height).
                Can be used to ensure there is space reserved for the image.
                This can prevent page jank when the image loads.
            `,
        },
        base64: {
            type: GraphQLString,
            description: oneLine`
                A base64 version of the image or video. Can be used as a placeholder.
            `,
            resolve: async ({ id, path }) => {
                const data = await base64({
                    file: {
                        id,
                        absolutePath: path,
                    },
                })
                return data.src
            },
        },
        /**
         * Formats.
         *
         * The way this module works these different formats are generated based
         * on the user's query.
         *
         * So if the user does not include srcWebm in their query then a webM version
         * of the asset is not generated.
         *
         * This node will also only upload the image once, then perform the transformations.
         */
        // src
        src: {
            type: GraphQLString,
            description: 'Keep original format but optimize quality.',
            resolve: getResolveSrc(),
        },
        srcSet: {
            type: GraphQLString,
            description: 'Keep original format but optimize quality.',
            resolve: getResolveSrcSet(),
        },
        // jpg
        srcJpg: {
            type: GraphQLString,
            description: getSrcDescription('JPG'),
            resolve: getResolveSrc('jpg'),
        },
        srcSetJpg: {
            type: GraphQLString,
            description: getSrcSetDescription('JPG'),
            resolve: getResolveSrcSet('jpg'),
        },
        // png
        srcPng: {
            type: GraphQLString,
            description: getSrcDescription('PNG'),
            resolve: getResolveSrc('png'),
        },
        srcSetPng: {
            type: GraphQLString,
            description: getSrcSetDescription('PNG'),
            resolve: getResolveSrcSet('png'),
        },
        // webp
        srcWebp: {
            type: GraphQLString,
            description: getSrcDescription('Webp'),
            resolve: getResolveSrc('webp'),
        },
        srcSetWebp: {
            type: GraphQLString,
            description: getSrcSetDescription('Webp'),
            resolve: getResolveSrcSet('webp'),
        },
        //----------------------------------------
        // video
        //----------------------------------------
        srcVideoPoster: {
            type: GraphQLString,
            description: 'A poster for the video (jpg).',
        },
        srcVideo: {
            type: GraphQLString,
            description: 'The video source (mp4).',
        },
    }
}
