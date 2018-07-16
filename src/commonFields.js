import { GraphQLString, GraphQLFloat } from 'gatsby/graphql'
import { fixed } from 'gatsby-plugin-sharp'
import { oneLine } from 'common-tags'

const getSrcDescription = format => `Image src in ${format} format.`
const getSrcSetDescription = format => `Image srcset in ${format} format.`

export const commonFields = ({ reporter }) => ({
    originalImg: { type: GraphQLString },
    originalName: { type: GraphQLString },
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
     * So if the user does not include srcWebM in their query then a webM version
     * of the asset is not generated.
     *
     * This node will also only upload the image once, then perform the transformations.
     */
    // src
    src: {
        type: GraphQLString,
        description: 'Keep original format but optimize quality.',
        resolve: async ({ file, image, fieldArgs }) => {},
    },
    srcSet: {
        type: GraphQLString,
        description: 'Keep original format but optimize quality.',
        resolve: async ({ file, image, fieldArgs }) => {},
    },
    // webp
    srcWebP: {
        type: GraphQLString,
        description: getSrcDescription('WebP'),
        resolve: async ({ file, image, fieldArgs }) => {},
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
        resolve: async ({ file, image, fieldArgs }) => {},
    },
    srcSetMp4: {
        type: GraphQLString,
        description: getSrcSetDescription('MP4'),
        resolve: async ({ file, image, fieldArgs }) => {},
    },
    // webm
    srcWebM: {
        type: GraphQLString,
        description: getSrcDescription('WebM'),
        resolve: async ({ file, image, fieldArgs }) => {},
    },
    srcSetWebM: {
        type: GraphQLString,
        description: getSrcSetDescription('WebM'),
        resolve: async ({ file, image, fieldArgs }) => {},
    },
    // gif
    srcGif: {
        type: GraphQLString,
        description: getSrcDescription('GIF'),
        resolve: async ({ file, image, fieldArgs }) => {},
    },
    srcSetGif: {
        type: GraphQLString,
        description: getSrcSetDescription('GIF'),
        resolve: async ({ file, image, fieldArgs }) => {},
    },
})
