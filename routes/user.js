const { Router } = require("express");

const UserRouter = Router();

const user = require("../controllers/user");

UserRouter.post("/", user.signUp);
UserRouter.get("/", user.getUsers);
UserRouter.get("/:id", user.getUser);
UserRouter.patch("/:id", user.updateUser);
UserRouter.delete("/:id", user.deleteUser);

module.exports = UserRouter;
