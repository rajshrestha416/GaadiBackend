const {Model} = require("objection")

class WorkShop extends Model{
    static get tableName(){
        return 'workshops'
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
                        from: "workshops.user_id",
                        to: "users.id",
                      },
                }
            }
        }
    }
}

module.exports = WorkShop