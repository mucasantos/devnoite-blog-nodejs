const { validationResult } = require("express-validator");

const User = require("../models/user")

exports.signUpUser = (req, res, next) => {

    const errors = validationResult(req);
    console.log(errors);

    if (!errors.isEmpty()) {
        return res.status(422).send({
            error: true,
            message: errors.array()[0].msg
        });
    }

    const email = req.body.email;
    const name = req.body.name;
    const password = req.body.password;

    //Add este post ao DB
    const user = new User({
        email: email,
        name: name,
        password: password,
    })

    user.save()
    .then(result => {
        res.status(201).json({
            error: false,
            message: "User criado com sucesso!!",
            result: result
        })
    }).catch(error => {
        res.status(500).json({
            error: false,
            message: "Error ao salvar o user...",
            result: error
        })
    })


}
exports.signInUser = (req, res, next) => {

    const errors = validationResult(req);
    console.log(errors);

    if (!errors.isEmpty()) {
        return res.status(422).send({
            error: true,
            message: errors.array()[0].msg
        });
    }

    const email = req.body.email;
    const password = req.body.password;

    //Add este post ao DB



}
