const { Router } = require("express");

const commentRouter = Router();

const comment = require("../controllers/comment");

commentRouter.post("/", comment.makeComment);
commentRouter.get("/", comment.getComments);
commentRouter.get("/:id", comment.getComment);
commentRouter.patch("/:id", comment.updateComment);
commentRouter.delete("/:id", comment.deleteComment);

module.exports = commentRouter;
