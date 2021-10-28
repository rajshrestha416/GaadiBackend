const { Model } = require('objection')

class Decoration extends Model {
  static get tableName() {
    return 'decorations'
  }

  static get idColumn() {
    return 'id'
  }

  static get relationMappings() {
    const User = require("./user");

    return {
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: "decorations.user_id",
          to: "users.id",
        },
      },
    };
  }
  
}

module.exports = Decoration