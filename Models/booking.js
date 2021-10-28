const {Model} = require("objection")

class Vehicle extends Model{
    static get tableName(){
        return 'bookings'
    }
    static get idColumn(){
        return 'id'
    }
    static get relationMappings(){
        const User = require("./user")
        const Vehicle = require("./vehicle")
        
        return {
            sender:{
                relation:Model.BelongsToOneRelation,
                modelClass:User,
                join:{
                    join: {
                        from: "booking.sender",
                        to: "users.id",
                      },
                }
            },
            receiver:{
                relation:Model.BelongsToOneRelation,
                modelClass:User,
                join:{
                    join: {
                        from: "booking.receiver",
                        to: "users.id",
                      },
                }
            },
            vehicle:{
                relation:Model.BelongsToOneRelation,
                modelClass:Vehicle,
                join:{
                    join: {
                        from: "booking.vehicle_id",
                        to: "vehicles.id",
                      },
                }
            }
        }
    }
}

module.exports = Vehicle