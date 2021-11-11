const { Model } = require("objection");

class Booking extends Model {
    static get tableName() {
        return 'bookings';
    }
    static get idColumn() {
        return 'id';
    }
    static get relationMappings() {
        const User = require("./user");
        const Vehicle = require("./vehicle");

        return {
            vehicle: {
                relation: Model.BelongsToOneRelation,
                modelClass: Vehicle,
                join: {
                    from: "bookings.vehicle_id",
                    to: "vehicles.id",
                },
            },
            sender: {
                relation: Model.BelongsToOneRelation,
                modelClass: User,
                join: {
                    from: "bookings.sender_id",
                    to: "users.id",
                },
            },
            receiver: {
                relation: Model.BelongsToOneRelation,
                modelClass: User,
                join: {
                    from: "bookings.receiver_id",
                    to: "users.id",
                }
            },
        };
    }
}

module.exports = Booking;