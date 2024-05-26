const prisma = require("../services/prisma");

const checkUser = async (email) => {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  return user;
};
exports.signUp = async (req, res) => {
  const data = req.body;

  try {
    const validate = await checkUser(data.email);
    if (validate) {
      return res.status(400).json({ message: "User Already Exists" });
    }
    const user = await prisma.user.create({
      data,
    });

    res.status(201).json({
      user,
    });
  } catch (error) {
    console.log(error.message);
  }
};

exports.getUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.json({
      users,
    });
  } catch (error) {
    console.log(error.message);
  }
};

exports.getUser = async (req, res) => {
  const id = req.params.id;
  try {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
      include: {
        comments: true,
        posts: {
          include: {
            comments: true,
          },
        },
      },
    });
    res.json({
      user,
    });
  } catch (error) {
    console.log(error.message);
  }
};

exports.updateUser = async (req, res) => {
  const id = req.params.id;
  const data = req.body;
  try {
    const user = await prisma.user.update({
      where: {
        id,
      },
      data: {
        name: data.name,
        password: data.password,
      },
    });
    res.json({
      user,
    });
  } catch (error) {
    console.log(error.message);
  }
};

exports.deleteUser = async (req, res) => {
  const id = req.params.id;
  try {
    const user = await prisma.user.delete({
      where: {
        id,
      },
    });
    res.json({
      user,
    });
  } catch (error) {
    console.log(error.message);
  }
};
