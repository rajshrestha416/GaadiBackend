const { Model } = require('objection')

class Event extends Model {
  static get tableName() {
    return 'events'
  }

  static get idColumn() {
    return 'job_id'
  }

  static get relationMappings() {
    const User = require("./user");

    return {
      products: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: "events.user_id",
          to: "users.user_id",
        },
      },
    };
  }
  
}   

module.exports = Event