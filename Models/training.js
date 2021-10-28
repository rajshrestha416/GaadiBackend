// const {Model} = require("objection")

// class Training extends Model{
//     static get tableName(){
//         return 'trainings'
//     }
//     static get idColumn(){
//         return 'id'
//     }
//     static get relationMappings(){
//         const User = require("../Models/user")
        
//         return {
//             user:{
//                 relation:Model.BelongsToOneRelation,
//                 modelClass:User,
//                 join:{
//                     join: {
//                         from: "trainings.user_id",
//                         to: "users.user_id",
//                       },
//                 }
//             }
//         }
//     }
// }

// module.exports = Training