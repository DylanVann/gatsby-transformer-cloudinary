import { fixed } from 'gatsby-plugin-sharp'
import { oneLine } from 'common-tags'
const { GraphQLString, GraphQLFloat } = require('gatsby/graphql')

export const commonFields = {
    width: {
        type: GraphQLFloat,
        description: 'The original width of the media.',
    },
    height: {
        type: GraphQLFloat,
        description: 'The original height of the media.',
    },
    aspectRatio: {
        type: GraphQLFloat,
        description: oneLine`
            The aspect ratio of the media (width/height).
            Can be used to ensure there is space reserved for the media.
            This can prevent page jank when the media loads.
        `,
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
}
