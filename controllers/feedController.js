const { validationResult } = require("express-validator");
const Post = require('../models/post');
const User = require('../models/user');

//Ao posts, mandar aos poucos, ou seja, com paginação
exports.getPosts = (req, res, next) => {

    const page = req.query.page || 1;
    const perPage = req.query.perPage || 5;
    let totalItems;

    Post.find()
        .countDocuments()
        .then(total => {
            totalItems = total;

            return Post.find()
                .populate("creator", 'name email')
                .skip((page - 1) * perPage)
                .limit(perPage);
        })
        .then(result => {

            console.log(result)
            res.status(200).json({
                totalItems: totalItems,
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

    console.log("Aqui...")
    console.log(req.file)

    if (!req.file) {
        const error = new Error("Faltou enviar a imagem!!");
        error.statusCode = 422;
        throw error;
    }

    const title = req.body.title;
    const content = req.body.content;
    const imageUrl = req.file.path;

    //modificações para o post ser do usuário!
    let postCreator;

    const postagem = new Post({
        title: title,
        content: content,
        imageUrl: imageUrl,
        creator: req.userId, // posso acessar, pois adicionei essa propriedade no is-auth
    })

    //Add este post ao DB
    postagem.save()
        //Fui da base de dados pegar o user
        .then(result => {
            return User.findById(req.userId)
        })
        //adicionei o post na lista de posts deste user
        .then(user => {
            postCreator = user;
            user.posts.push(postagem);
            return user.save();
        })
        //devolvi a resposta!
        .then(result => {
            res.status(201).json({
                message: "Post criado com sucesso!!",
                creator: {
                    _id: postCreator._id,
                    name: postCreator.name,
                }
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