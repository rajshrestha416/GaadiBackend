const { Model } = require('objection')

class Job extends Model {
  static get tableName() {
    return 'jobs'
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
          from: "jobs.user_id",
          to: "users.id",
        },
      },
    };
  }
  
}

module.exports = Job