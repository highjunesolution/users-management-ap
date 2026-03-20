const prisma = require("../config/prisma");
const bcrypt = require("bcrypt");
const { sendEmail } = require("../services/email.service");
const { addUserNotifyEmail } = require("../templates/email/add.templates.email");

const serverErr = (err, res) => {
  return res.status(500).json({
    ok: false,
    msg: `Server error : ${err.message}`,
  });
};

const select = {
  email: true,
  firstName: true,
  lastName: true,
  createdAt: true,
  updatedAt: true,
};

const findUserByEmail = async (email) => {
  return await prisma.user.findUnique({
    where: {
      email: email,
    },
  });
};

const findUserById = async (id) => {
  return await prisma.user.findUnique({
    where: {
      id: Number(id),
    },
    select: {
      ...select,
    },
  });
};
exports.create = async (req, res) => {
  try {
    const { email, password, firstName, lastName } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        ok: false,
        msg: "Email or Password is required!",
      });
    }

    if (!firstName || !lastName) {
      return res.status(400).json({
        ok: false,
        msg: "First or Last name is required!",
      });
    }

    const findEmailAlreadyExists = await findUserByEmail(email);
    if (findEmailAlreadyExists) {
      return res.status(400).json({
        ok: false,
        msg: "Email is already exists!",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const newUser = await prisma.user.create({
      data: {
        email: email,
        password: hashPassword,
        firstName: firstName,
        lastName: lastName,
      },
      select: {
        email: true,
        firstName: true,
        lastName: true,
      },
    });

    sendEmail(email, "Welcome to IT System", addUserNotifyEmail(newUser)); // Send welcome email

    return res.status(201).json({
      ok: true,
      msg: "New user is added successfully!",
      newUser: newUser,
    });
  } catch (err) {
    serverErr(err, res);
  }
};

exports.list = async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        ...select,
      },
    });

    return res.status(200).json({
      ok: true,
      users: users,
    });
  } catch (err) {
    serverErr(err, res);
  }
};

exports.get = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await findUserById(userId);
    if (!user) {
      return res.status(400).json({
        ok: false,
        msg: "User not found, invalid User ID!",
      });
    }

    return res.status(200).json({
      ok: true,
      user: user,
    });
  } catch (err) {
    serverErr(err, res);
  }
};

exports.update = async (req, res) => {
  try {
    const { firstName, lastName } = req.body;
    const { userId } = req.params;
    if (!firstName && !lastName) {
      return res.status(400).json({
        ok: false,
        msg: "Firstname or Lastname is required, please insert atleast one choice",
      });
    }

    const user = await findUserById(userId);
    if (!user) {
      return res.status(400).json({
        ok: false,
        msg: "User not found, Invalid User ID!",
      });
    }

    const updateUser = await prisma.user.update({
      where: {
        id: Number(userId),
      },
      data: {
        firstName,
        lastName,
      },
      select: {
        ...select,
      },
    });

    return res.status(200).json({
      ok: true,
      updateUser,
    });
  } catch (err) {
    serverErr(err, res);
  }
};

exports.disable = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await findUserById(userId);

    if (!user) {
      return res.status(400).json({
        ok: false,
        msg: "User not found, invalid User ID!",
      });
    }

    const disabled = await prisma.user.update({
      where: {
        id: Number(userId),
      },
      data: {
        active: false,
      },
    });

    return res.status(200).json({
      ok: true,
      msg: "User is disabled successfully!",
    });
  } catch (err) {
    serverErr(err, res);
  }
};

exports.remove = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await findUserById(userId);

    if (!user) {
      return res.status(400).json({
        ok: false,
        msg: "User not found, invalid User ID!",
      });
    }

    const del = await prisma.user.delete({
      where: {
        id: Number(userId),
      },
    });

    return res.status(200).json({
      ok: true,
      msg: "User is removed successfully!",
    });
  } catch (err) {
    serverErr(err, res);
  }
};
