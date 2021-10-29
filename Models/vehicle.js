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
        const Specification = require("./booking")
        
        return {
            user:{
                relation : Model.BelongsToOneRelation,
                modelClass:User,
                join:{
                    from:"vehicles.user_id",
                    to:"users.id"
                }
            },
            booking:{
                relation:Model.HasManyRelation,
                modelClass:Booking,
                join:{
                    join: {
                        from: "vehicles.user_id",
                        to: "bookings.id",
                      },
                }
            },
            specification:{
                relation:Model.HasManyRelation,
                modelClass:Specification,
                join:{
                    join: {
                        from: "vehicles.id",
                        to: "c_specification.vehicle_id",
                      },
                }
            }
        }
    }
}

module.exports = Vehicle