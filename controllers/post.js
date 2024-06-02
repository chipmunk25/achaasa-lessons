const prisma = require("../services/prisma");

// const checkPostExists = async (id) => {
//   const postId = parseInt(id);

//   const post = await prisma.post.findUnique({ where: { id: postId } });

// };

exports.makePost = async (req, res) => {
  const data = req.body;
  try {
    const newPost = await prisma.post.create({ data });
    res.status(201).json({ newPost });
  } catch (error) {
    console.error(error);
  }
};

exports.getPost = async (req, res) => {
  const id = req.params.id;
  try {
    const findPost = await prisma.post.findUnique({
      where: { id: parseInt(id) },
    });

    if (!findPost) return res.status(404).send("post not found");

    res.json(findPost);
  } catch (error) {
    console.error(error);
  }
};

exports.getPosts = async (req, res) => {
  const allPost = await prisma.post.findMany();
  return res.status(200).json(allPost);
};

exports.deletePost = async (req, res) => {
  const id = req.params.id;

  try {
    const postDelete = await prisma.post.delete({
      where: { id: parseInt(id) },
    });
    return res.json(postDelete);
  } catch (error) {
    console.error(error);
  }
};

exports.updatePost = async (req, res) => {
  const id = req.params.id;
  const data = req.body;
  const post = await prisma.post.findUnique({ where: { id: parseInt(id) } });
  try {
    if (!post) {
      return res.status(404).send("The post is not in the database");
    }

    const postUpdate = await prisma.post.update({
      where: { id: parseInt(id) },
      data: { name: data.name, description: data.description },
    });
    return res.json(postUpdate);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: "An error occurred while updating the post" });
  }
};
