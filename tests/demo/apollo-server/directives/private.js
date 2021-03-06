const { SchemaDirectiveVisitor } = require('graphql-tools')
const { defaultFieldResolver } = require('graphql')

module.exports = class PrivateDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition (field) {
    const { resolve = defaultFieldResolver } = field
    field.resolve = (root, args, context, info) => {
      if (!context.userId) throw new Error('Unauthorized')
      return resolve(root, args, context, info)
    }
  }
}
