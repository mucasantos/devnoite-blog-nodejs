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

    const title = req.body.title;
    const content = req.body.content;

    if (!title || !content) {
        return res.status(400).json({
            error: true,
            msg: "Você precisa enviar os dados corretamente!!"
        })
    }
    //Add este post ao DB

    res.status(201).json({
        error: false,
        msg: "Post criado com sucesso!!"
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