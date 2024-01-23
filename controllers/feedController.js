exports.getPosts = (req, res, next)=> {
    res.status(200).json({
        posts:[
            {
                title: "Primeiro post",
                content: "Este é o meu primeiro post!"
            }
        ]
    })
}