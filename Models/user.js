const { Model } = require('objection')
const jwt = require('jsonwebtoken')

class User extends Model {
  static get tableName() {
    return 'users'
  }

  static get idColumn() {
    return 'id'
  }

  static get relationMappings() {
    const Job = require("./job");
    const Parts = require("./parts");
    const Decoration = require("./decoration");
    const Event = require("./event");
    const Vehicle = require("./vehicle");
    const WorkShop = require("./workshop");

    return {
      job: {
        relation: Model.HasManyRelation,
        modelClass: Job,
        join: {
          from: "users.id",
          to: "jobs.user_id",
        },
      },
      parts: {
        relation: Model.HasManyRelation,
        modelClass: Parts,
        join: {
          from: "users.id",
          to: "parts.user_id",
        },
      },
      decoration: {
        relation: Model.HasManyRelation,
        modelClass: Decoration,
        join: {
          from: "users.id",
          to: "decorations.user_id",
        },
      },
      event: {
        relation: Model.HasManyRelation,
        modelClass: Event,
        join: {
          from: "users.id",
          to: "events.user_id",
        },
      },
      vehicle: {
        relation: Model.HasManyRelation,
        modelClass: Vehicle,
        join: {
          from: "users.id",
          to: "vehicles.user_id",
        },
      },
      workshop: {
        relation: Model.HasManyRelation,
        modelClass: WorkShop,
        join: {
          from: "users.id",
          to: "workshops.user_id",
        },
      }
    };
  }

  generateAuthToken(userId) {
    return jwt.sign({ ak: userId }, process.env.MY_SECRET_KEY)
  }
  
}

module.exports = User