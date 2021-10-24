const express = require("express")
const app = express()
require("./Configs/dbConfig")


const port = process.env.PORT
app.listen(port, ()=>{
    console.log(`Server running at ${port}`)
})