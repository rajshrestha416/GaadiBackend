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
        
        return {
            user:{
                relation:Model.BelongsToOneRelation,
                modelClass:User,
                join:{
                    join: {
                        from: "vehicles.user_id",
                        to: "users.user_id",
                      },
                }
            }
        }
    }
}

module.exports = Vehicle