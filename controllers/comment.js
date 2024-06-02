const prisma = require("../services/prisma");

// const checkCommentExists = async (id) => {
//   const CommentId = parseInt(id);

//   const Comment = await prisma.Comment.findUnique({ where: { id: CommentId } });

// };

exports.makeComment = async (req, res) => {
  const data = req.body;
  try {
    const newComment = await prisma.comment.create({ data });
    res.status(201).json({ newComment });
  } catch (error) {
    console.error(error);
  }
};

exports.getComment = async (req, res) => {
  const id = req.params.id;
  try {
    const findComment = await prisma.comment.findUnique({
      where: { id: parseInt(id) },
    });

    if (!findComment) return res.status(404).send("Comment not found");

    res.json(findComment);
  } catch (error) {
    console.error(error);
  }
};

exports.getComments = async (req, res) => {
  const allComment = await prisma.comment.findMany();
  return res.status(200).json(allComment);
};

exports.deleteComment = async (req, res) => {
  const id = req.params.id;

  try {
    const CommentDelete = await prisma.comment.delete({
      where: { id: parseInt(id) },
    });
    return res.json(CommentDelete);
  } catch (error) {
    console.error(error);
  }
};

exports.updateComment = async (req, res) => {
  const id = req.params.id;
  const data = req.body;
  const Comment = await prisma.comment.findUnique({
    where: { id: parseInt(id) },
  });
  try {
    if (!Comment) {
      return res.status(404).send("The Comment is not in the database");
    }

    const CommentUpdate = await prisma.comment.update({
      where: { id: parseInt(id) },
      data: { description: data.description },
    });
    return res.json(CommentUpdate);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: "An error occurred while updating the Comment" });
  }
};
