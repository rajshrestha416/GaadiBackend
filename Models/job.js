const { Model } = require('objection')

class Job extends Model {
  static get tableName() {
    return 'jobs'
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
          from: "jobs.user_id",
          to: "users.user_id",
        },
      },
    };
  }
  
}

module.exports = Job