const { validationResult } = require("express-validator");


exports.getPosts = (req, res, next) => {
    res.status(200).json({
        posts: [
            {
                title: "Primeiro post",
                content: "Este é o meu primeiro post!"
            }
        ]
    })
}

exports.createPost = (req, res, next) => {

    const errors = validationResult(req);
    console.log(errors);

    if(!errors.isEmpty()) {
        return res.status(422).send({
            error: true,
            message: errors.array()[0].msg
        });
    }

    const title = req.body.title;
    const content = req.body.content;

    //Add este post ao DB

    res.status(201).json({
        error: false,
        message: "Post criado com sucesso!!"
    })
}

//Rotas para atualizar e deletar um post

exports.updatePost = (req, res, next) => {
    const postId = req.params.postID;
    //Buscar no DB
    console.log(postId);
    res.status(200).json({
        msg: "Post atualizado com sucesso!",
        post: postId
    });
}

exports.deletePost = (req, res, next) => {
    const postID = req.params.postID;
    //Buscar no DB
    console.log(postID);
    res.status(200).json({
        msg: "Post excluído com sucesso!",
        post: postID
    });
}