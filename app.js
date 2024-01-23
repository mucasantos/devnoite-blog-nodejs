const express= require("express");
const app = express();

const port = 8080;
const feedRoutes = require("./routes/feedRoutes")

//Rotas do app
app.use('/feed', feedRoutes)

app.listen(port, ()=> {
    console.log("Server online na porta: " + port)
})