const express= require("express");
const app = express();

const port = 8080;
const feedRoutes = require("./routes/feedRoutes")
const authRoutes = require("./routes/authRoutes")

//Json parser do express - middleware para 'captar' os json do client!
app.use(express.json());

//middleware para configurar o CORS

app.use((req, res, next)=> {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, PUT, POST, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

//Rotas do app - Esse middleware vai captar todas as rotas criadas no feedRoutes
app.use('/feed', feedRoutes)
app.use('/auth', authRoutes)

app.listen(port, ()=> {
    console.log("Server online na porta: " + port)
})