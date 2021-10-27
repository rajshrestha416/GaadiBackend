const {Model} = require("objection")

class Ticket extends Model{
    static get tableName(){
        return 'tickets'
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
                        from: "tickets.user_id",
                        to: "users.user_id",
                      },
                }
            }
        }
    }
}

module.exports = Ticket