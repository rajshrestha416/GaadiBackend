const {Model} = require("objection")

class PartsBooking extends Model{
    static get tableName(){
        return 'partsBookings'
    }
    static get idColumn(){
        return 'id'
    }
    static get relationMappings(){
        const User = require("./user")
        const Parts = require("./parts")
        
        return {
            parts:{
                relation:Model.BelongsToOneRelation,
                modelClass:Parts,
                join:{
                    join: {
                        from: "partsBookings.parts_id",
                        to: "parts.id",
                      },
                }
            },
            sender:{
                relation:Model.BelongsToOneRelation,
                modelClass:User,
                join:{
                    join: {
                        from: "partsBookings.sender_id",
                        to: "users.id",
                      },
                }
            },
            receiver:{
                relation:Model.BelongsToOneRelation,
                modelClass:User,
                join:{
                    join: {
                        from: "partsBookings.receiver_id",
                        to: "users.id",
                      },
                }
            },
        }
    }
}

module.exports = PartsBooking