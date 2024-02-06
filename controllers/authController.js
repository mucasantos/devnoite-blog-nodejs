const { validationResult } = require("express-validator");

exports.signUpUser = (req, res, next) => {

    const errors = validationResult(req);
    console.log(errors);

    if(!errors.isEmpty()) {
        return res.status(422).send({
            error: true,
            message: errors.array()[0].msg
        });
    }

    const email = req.body.email;
    const name = req.body.name;
    const password = req.body.password;
    
    //Add este post ao DB

    res.status(201).json({
        error: false,
        message: "User criado com sucesso!!"
    })
}
exports.signInUser = (req, res, next) => {

    const errors = validationResult(req);
    console.log(errors);

    if(!errors.isEmpty()) {
        return res.status(422).send({
            error: true,
            message: errors.array()[0].msg
        });
    }

    const email = req.body.email;
    const password = req.body.password;
    
    //Add este post ao DB

    res.status(201).json({
        error: false,
        message: "Login com sucesso!!"
    })
}
