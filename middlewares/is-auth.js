/**
 * Pegar o token
 * Verificar se o user enviou token
 * Verificar se o token é válido!
 */
const jwt = require("jsonwebtoken");

module.exports = (req, res, next)=> {
    //Pegar o token sem a palavra Bearer
    const token =req.get("Authorization").split(' ')[1];
    
    //Verificar se o token é válido!
    let decodedToken;

    try {
        decodedToken =  jwt.verify(token, "MinhaChaveJWT@2024Senai")
    } catch (error) {
        error.statusCode = 500;
        throw error;
    }

    if(!decodedToken) {
        const error = new Error("Usuário não autenticado!")
        error.statusCode = 401;
        throw error;
    }

    //adicionei ao objeto req, a propriedade userId
    req.userId = decodedToken.userId;
    next();
}