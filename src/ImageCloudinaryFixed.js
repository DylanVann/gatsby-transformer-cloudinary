import { GraphQLObjectType, GraphQLInt, GraphQLFloat } from 'gatsby/graphql'
import { fixed } from 'gatsby-plugin-sharp'
import { commonFields } from './commonFields'

export default ({ pathPrefix, getNodeAndSavePathDependency, reporter }) => {
    return {
        type: new GraphQLObjectType({
            name: 'ImageCloudinaryFixed',
            fields: {
                width: { type: GraphQLFloat },
                height: { type: GraphQLFloat },
                ...commonFields,
            },
        }),
        args: {
            width: {
                type: GraphQLInt,
                defaultValue: 400,
            },
            height: {
                type: GraphQLInt,
            },
        },
        resolve: async (image, fieldArgs, context) => {
            const file = getNodeAndSavePathDependency(
                image.parent,
                context.path,
            )
            const args = { ...fieldArgs, pathPrefix }
            const id = file.id
            const path = file.absolutePath
            const data = await fixed({
                file,
                args,
                reporter,
            })
            return Object.assign({}, data, {
                fieldArgs: args,
                image,
                file,
            })
        },
    }
}
