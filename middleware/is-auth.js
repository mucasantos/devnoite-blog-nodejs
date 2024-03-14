const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    // pegar o token
    const token = req.get("Authorization").split(' ')[1];
    console.log(token);
    let decodeToken;

    try {
        decodeToken = jwt.verify(token, "MinhaChaveSecreta!@2024%NodeJS",
        )
    } catch (error) {
        error.statusCode = 500;
        throw error
    }

    if (!decodeToken) {
        const error = new Error("Usuário não autenticado..")
        error.statusCode = 401;
        throw error;
    }

    req.userId = decodeToken.userId;  
    next();
}