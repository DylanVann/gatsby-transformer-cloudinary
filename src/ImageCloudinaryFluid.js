import { GraphQLObjectType, GraphQLInt, GraphQLString } from 'gatsby/graphql'
import { fluid } from 'gatsby-plugin-sharp'
import { commonFields } from './commonFields'

export default ({ pathPrefix, getNodeAndSavePathDependency, reporter }) => {
    return {
        type: new GraphQLObjectType({
            name: 'ImageCloudinaryFluid',
            fields: {
                ...commonFields({ pathPrefix, reporter }),
                sizes: { type: GraphQLString },
            },
        }),
        args: {
            maxWidth: {
                type: GraphQLInt,
                defaultValue: 800,
            },
            maxHeight: {
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
            const data = await fluid({
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
