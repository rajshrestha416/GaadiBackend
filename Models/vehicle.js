const {Model} = require("objection")

class Vehicle extends Model{
    static get tableName(){
        return 'vehicles'
    }
    static get idColumn(){
        return 'id'
    }
    static get relationMappings(){
        const User = require("./user")
        const Booking = require("./booking")
        
        return {
            user:{
                relation:Model.BelongsToOneRelation,
                modelClass:User,
                join:{
                    join: {
                        from: "vehicles.user_id",
                        to: "users.id",
                      },
                }
            },
            booking:{
                relation:Model.BelongsToOneRelation,
                modelClass:Booking,
                join:{
                    join: {
                        from: "vehicles.user_id",
                        to: "bookings.id",
                      },
                }
            }
        }
    }
}

module.exports = Vehicle