const {Model} = require("objection")

class Specification extends Model{
    static get tableName(){
        return 'c_specifications'
    }
    static get idColumn(){
        return 'id'
    }
    static get relationMappings(){
        const Vehicle = require("./vehicle")
        
        return {
            vehicle:{
                relation:Model.BelongsToOneRelation,
                modelClass:Vehicle,
                join:{
                    join: {
                        from: "c_specifications.vehicle_id",
                        to: "vehicles.id",
                      },
                }
            },
        }
    }
}

module.exports = Specification