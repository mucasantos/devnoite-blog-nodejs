const User = require("../models/user");
const bcrypt = require("bcrypt");


exports.profile = (req, res, next) => {
    console.log(req.userId)

    User.findById(req.userId)
        .then(user => {
            user.password = undefined;
            res.status(200).json({ profile: user })
        }).catch(err => {
            res.status(500).json({ msg: err })
        })
}

exports.changePassword = (req, res, next) => {
    if (!req.userId || !req.body.password || !req.body.newPassword) {
        return res.status(500).json({ msg: "Nada alterado..." })
    }

    let password = req.body.password;
    var newPassword = req.body.newPassword;
    var userToChange;

    User.findById(req.userId)
        .then(user => {
            userToChange = user;
            if (!user) {
                const error = new Error("Falha de validação");
                error.statusCode = 422;
                throw error;
            }
            return bcrypt.compare(password, user.password);
        }).then(passIsEqual => {
            if (!passIsEqual) {
                const error = new Error("Email ou senha inválida...");
                error.statusCode = 401;
                throw error;
            }

            bcrypt.hash(newPassword, 12).then(passHashed => {
                userToChange.password = passHashed;

                userToChange.save().then(user => {
                    user.password = undefined; // para nao devolver a senha
                    res.status(201).json({
                        message: "Senha atualizada com sucesso!!",
                        result: user
                    })
                }).catch(error => {
                    res.status(500).json({
                        message: "Error ao atualizar o user...",
                        result: error
                    })
                })
            })
        }).catch(err => {
            res.status(err.statusCode).json({
                message: "Error ao atualizar o user...",
                result: err
            })
        })
}

exports.update = (req, res, next) => {

    if (!req.userId || !req.body.name) {
        return res.status(500).json({ msg: "Nada alterado..." })
    }

    User.findById(req.userId)
        .then(user => {
            user.name = req.body.name;
            return user.save()
        })
        .then(userChanged => {
            userChanged.password = undefined;
            userChanged.posts = undefined;
            res.status(200).json({ profile: userChanged })
        })
        .catch(err => {
            res.status(500).json({ msg: err })
        })
}

/*
Primeiro verificar se tem o user, em seguida checa se a senha enviada está correta e
somente depois dessa validação, vai excluir o user da base! 
*/
exports.delete = (req, res, next) => {
    let password = req.body.password;

    
    User.findById(req.userId)
        .then(result => {

            if (!result) {
                const error = new Error("Usuário não encontrado..");
                error.statusCode = 401;
                throw error;
            }
            return bcrypt.compare(password, result.password);
        })

        .then(passIsEqual => {
            if (!passIsEqual) {
                const error = new Error("Email ou senha inválida...");
                error.statusCode = 401;
                throw error;
            }
            User.findByIdAndDelete({ _id: req.userId }).then(result => {
                return res.status(200).json({
                    message: "Usuário excluído com sucesso!",
                })
            })
        })
        .catch(err => {

            /*    As duas formas estão corretas.
            A primeira, retorna agora e o next, envia para o middleware error (app.user no app.js)
            */
            // res.status(500).json({
            //     message: "Erro ao excluir usuário!",
            //     error: err
            //   })

            next(err)
        })
}