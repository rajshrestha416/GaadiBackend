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
    const Job = require("./job");
    const Part = require("./part");
    const Ticket = require("./ticket");
    const Training = require("../Controllers/training");
    const Decoration = require("./decoration");
    const Event = require("./event");
    const Vehicle = require("./vehicle");
    const Logistic = require("./logistic");

    return {
      job: {
        relation: Model.HasManyRelation,
        modelClass: Job,
        join: {
          from: "users.user_id",
          to: "jobs.user_id",
        },
      },
      part: {
        relation: Model.HasManyRelation,
        modelClass: Part,
        join: {
          from: "users.user_id",
          to: "parts.user_id",
        },
      },
      ticket: {
        relation: Model.HasManyRelation,
        modelClass: Ticket,
        join: {
          from: "users.user_id",
          to: "tickets.user_id",
        },
      },
      training: {
        relation: Model.HasManyRelation,
        modelClass: Training,
        join: {
          from: "users.user_id",
          to: "trainings.user_id",
        },
      },
      decoration: {
        relation: Model.HasManyRelation,
        modelClass: Decoration,
        join: {
          from: "users.user_id",
          to: "decorations.user_id",
        },
      },
      event: {
        relation: Model.HasManyRelation,
        modelClass: Event,
        join: {
          from: "users.user_id",
          to: "events.user_id",
        },
      },
      vehicle: {
        relation: Model.HasManyRelation,
        modelClass: Vehicle,
        join: {
          from: "users.user_id",
          to: "vehicles.user_id",
        },
      },
      logistic: {
        relation: Model.HasManyRelation,
        modelClass: Logistic,
        join: {
          from: "users.user_id",
          to: "logistics.user_id",
        },
      },
    };
  }

  generateAuthToken(userId) {
    return jwt.sign({ ak: userId }, process.env.MY_SECRET_KEY)
  }
  
}

module.exports = User