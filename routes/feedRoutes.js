const express = require("express");
const router = express.Router();

const feedController = require("../controllers/feedController");
const { check, body } = require("express-validator");
const { validateEmail, validateTitle } = require("../services/validators");
const isAuth = require("../middlewares/is-auth");

//Criar as rotas relacionadas ao feed

router.get('/posts', feedController.getPosts);

//Validar as informações
router.post('/post',
    [
        validateTitle
    ]
    ,
    isAuth,
    feedController.createPost);


router.patch("/post/:postID", feedController.updatePost);
router.delete("/post/:postID", feedController.deletePost);

module.exports = router;
