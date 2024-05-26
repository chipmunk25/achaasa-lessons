const { Router } = require("express");
const user = require("./user");
// const post = require("./post");
// const comment = require("./comment");
const mainRouter = Router();
mainRouter.use("/users", user);
// mainRouter.use("/posts", post);
// mainRouter.use("/comments", comment);
module.exports = mainRouter;
