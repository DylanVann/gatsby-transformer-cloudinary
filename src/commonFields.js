import { GraphQLString, GraphQLFloat } from 'gatsby/graphql'
import { fixed } from 'gatsby-plugin-sharp'
import { oneLine } from 'common-tags'
import cloudinary from './cloudinary'

const getSrcDescription = format => `Image src in ${format} format.`
const getSrcSetDescription = format => `Image srcset in ${format} format.`

const getResolveToFormat = format => ({ id }) =>
    cloudinary.url(id, { format, secure: true })

export const commonFields = ({ reporter }) => ({
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
        resolve: ({ id }) => cloudinary.url(id),
    },
    srcSet: {
        type: GraphQLString,
        description: 'Keep original format but optimize quality.',
        resolve: async ({ file, image, fieldArgs }) => {},
    },
    // png
    srcPng: {
        type: GraphQLString,
        description: getSrcDescription('PNG'),
        resolve: getResolveToFormat('png'),
    },
    srcSetPng: {
        type: GraphQLString,
        description: getSrcSetDescription('PNG'),
        resolve: async ({ file, image, fieldArgs }) => {},
    },
    // webp
    srcWebP: {
        type: GraphQLString,
        description: getSrcDescription('WebP'),
        resolve: getResolveToFormat('webp'),
    },
    srcSetWebP: {
        type: GraphQLString,
        description: getSrcSetDescription('WebP'),
        resolve: async ({ file, image, fieldArgs }) => {},
    },
    // mp4
    srcMp4: {
        type: GraphQLString,
        description: getSrcDescription('MP4'),
        resolve: getResolveToFormat('mp4'),
    },
    srcSetMp4: {
        type: GraphQLString,
        description: getSrcSetDescription('MP4'),
        resolve: async ({ file, image, fieldArgs }) => {},
    },
    // webm
    srcWebm: {
        type: GraphQLString,
        description: getSrcDescription('Webm'),
        resolve: getResolveToFormat('webm'),
    },
    srcSetWebm: {
        type: GraphQLString,
        description: getSrcSetDescription('Webm'),
        resolve: async ({ file, image, fieldArgs }) => {},
    },
    // gif
    srcGif: {
        type: GraphQLString,
        description: getSrcDescription('GIF'),
        resolve: getResolveToFormat('gif'),
    },
    srcSetGif: {
        type: GraphQLString,
        description: getSrcSetDescription('GIF'),
        resolve: async ({ file, image, fieldArgs }) => {},
    },
})
