const express = require("express")

const PORT = 8080

const app = express()

app.get("/", (req, res) =>{
    res.send("ya esta funcionando el servidor y tengo la base lista")
})
app.listen(PORT, ()=>{
    console.log(`server escuchando en el puerto ${PORT}`)
})
