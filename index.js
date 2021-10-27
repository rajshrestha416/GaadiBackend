const express = require("express")
const app = express()
const knex = require("./Configs/dbConfig")
const path = require("path")
const auth = require("./Routes/auth")
const job = require("./Routes/job")
const user = require("./Routes/user")
const decoration = require("./Routes/decoration")
const morgan = require("morgan");
const { Model } = require("objection");


app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')))
app.use(morgan('dev'))

Model.knex(knex)

app.use("/api/auth",auth)
app.use("/api/job",job)
app.use("/api/user",user)
app.use("/api/decoration",decoration)

const port = process.env.PORT
app.listen(port, ()=>{
    console.log(`Server running at ${port}`)
})