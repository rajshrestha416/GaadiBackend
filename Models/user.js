const { Model } = require('objection')
const jwt = require('jsonwebtoken')

class User extends Model {
  static get tableName() {
    return 'users'
  }

  static get idColumn() {
    return 'user_id'
  }

  static get relationMappings() {
    const job = require("./job");

    return {
      products: {
        relation: Model.HasManyRelation,
        modelClass: job,
        join: {
          from: "users.user_id",
          to: "job.user_id",
        },
      },
    };
  }

  generateAuthToken(userId) {
    return jwt.sign({ ak: userId }, process.env.MY_SECRET_KEY)
  }
  
}

module.exports = User