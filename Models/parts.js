const {Model} = require('objection')

class Parts extends Model{
    static get tableName(){
        return 'parts'
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
                    from:"parts.user_id",
                    to:"users.user_id"
                }
            }
        }
    }
}

module.exports = Parts
