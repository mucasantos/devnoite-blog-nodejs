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

    //Validação simples => verificar se os dados foram enviados corretamente!

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