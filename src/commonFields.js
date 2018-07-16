import { GraphQLString, GraphQLFloat } from 'gatsby/graphql'

export const commonFields = {
    originalImg: { type: GraphQLString },
    originalName: { type: GraphQLString },
    /**
     * The aspect ratio. Can be used to ensure space is reserved for the image.
     * This way there will not be page jank when the image loads.
     */
    aspectRatio: { type: GraphQLFloat },
    /**
     * A base64 version of the image or video. Can be used as a placeholder.
     */
    base64: { type: GraphQLString },
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
    src: { type: GraphQLString },
    srcSet: { type: GraphQLString },
    // webp
    srcWebP: { type: GraphQLString },
    srcSetWebP: { type: GraphQLString },
    // mp4
    srcMp4: { type: GraphQLString },
    srcSetMp4: { type: GraphQLString },
    // webm
    srcWebM: { type: GraphQLString },
    srcSetWebM: { type: GraphQLString },
    // gif
    srcGif: { type: GraphQLString },
    srcSetGif: { type: GraphQLString },
}
