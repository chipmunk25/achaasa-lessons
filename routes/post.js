const { Router } = require("express");

const postRouter = Router();

const post = require("../controllers/post");

postRouter.post("/", post.makePost);
postRouter.get("/", post.getPosts);
postRouter.get("/:id", post.getPost);
postRouter.patch("/:id", post.updatePost);
postRouter.delete("/:id".post.deletePost);

module.exports = postRouter;
