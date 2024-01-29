const express = require("express");
const router = express.Router();

const feedController = require("../controllers/feedController")

//Criar as rotas relacionadas ao feed

router.get('/posts', feedController.getPosts);
router.post('/post', feedController.createPost);

module.exports = router;