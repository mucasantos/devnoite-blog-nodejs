const { validationResult } = require("express-validator");
const Post = require('../models/post');

exports.getPosts = (req, res, next) => {
    Post.find()
    .then(result => {
        res.status(200).json({
            posts: result
        })
    })
    .catch(error => {
        console.log(error);
    })
    
}

exports.createPost = (req, res, next) => {

    const errors = validationResult(req);
    console.log(errors);

    if (!errors.isEmpty()) {
        return res.status(422).send({
            error: true,
            message: errors.array()[0].msg
        });
    }

    const title = req.body.title;
    const content = req.body.content;
    const imageUrl = req.body.imageUrl;

    const postagem = new Post({
        title: title,
        content:content,
        imageUrl:imageUrl,
    })

    //Add este post ao DB
    postagem.save()
        .then(result => {
            res.status(201).json({
                error: false,
                message: "Post criado com sucesso!!"
            })
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