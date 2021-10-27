const {Model} = require('objection')

class Logistic extends Model{
    static get tableName(){
        return 'logistics'
    }
    static get idColumn(){
        return 'id'
    }

    static get relationMappings(){
        const User = require('./user')
        return{
            users:{
                relation : Model.BelongsToOneRelation,
                modelClass:User,
                join:{
                    from:"logistics.user_id",
                    to:"users.user_id"
                }
            }
        }
    }
}

module.exports = Logistic
