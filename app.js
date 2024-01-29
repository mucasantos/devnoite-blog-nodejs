const express= require("express");
const app = express();

const port = 8080;
const feedRoutes = require("./routes/feedRoutes")

//Json parser do express - middleware para 'captar' os json do client!
app.use(express.json());

//Rotas do app - Esse middleware vai captar todas as rotas criadas no feedRoutes
app.use('/feed', feedRoutes)

app.listen(port, ()=> {
    console.log("Server online na porta: " + port)
})