// require('dotenv').config()
// var pgtools = require("pgtools");
// const { Client } = require("pg");
// const connectionString = `${process.env.DB_CONN}`;
// const client = new Client({
//   connectionString: connectionString
// });

// console.log(process.env.DB_CONN)

// ///Database connection and creation
// client.connect().then(() => {
//   console.log("Database connected");
// })
//   .catch(err => {
//     if (err) {
//       pgtools.createdb({
//         user: "postgres",
//         host: "localhost",
//         password: "password",
//         port: 5432
//       }, "GaadiDB", function (err, res) {
//         if (err) {
//           console.error(err);
//           process.exit(-1);
//         }
//         console.log(res);
//       });
//     }
//     else {
//       console.log("Database connected.");
//     }
//   });



const knex = require("knex");
const knexConfig = require("../knexfile");

const environment = process.env.DB_ENV || "development";

module.exports = knex(knexConfig[environment]);
