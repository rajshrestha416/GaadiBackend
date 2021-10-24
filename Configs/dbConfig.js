require('dotenv').config()
var pgtools = require("pgtools");
const { Client } = require("pg");

const connectionString = `${process.env.DB_CONN}`;
const client = new Client({
  connectionString: connectionString
});

client.connect().then(() => {
  console.log("Database connected");
})
  .catch(err => {
    if (err) {
      pgtools.createdb({
        user: "postgres",
        host: "localhost",
        password: "password",
        port: 5432
      }, "GaadiDB", function (err, res) {
        if (err) {
          console.error(err);
          process.exit(-1);
        }
        console.log(res);
      });
    }
    else {
      console.log("Database connected.");
    }
  });

