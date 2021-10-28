const { Model } = require('objection')

class Event extends Model {
  static get tableName() {
    return 'events'
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
          from: "events.user_id",
          to: "users.id",
        },
      },
    };
  }
  
}   

module.exports = Event