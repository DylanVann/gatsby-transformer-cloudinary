import { GraphQLString, GraphQLFloat } from 'gatsby/graphql'

export const commonFields = {
    originalImg: { type: GraphQLString },
    originalName: { type: GraphQLString },
    aspectRatio: { type: GraphQLFloat },
    base64: { type: GraphQLString },
    // ------------------------------
    // formats
    // ------------------------------
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
