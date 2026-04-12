const User = require("../models/Users");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

// 🔐 REGISTER
const register = async (req, res, next) => {
  try {
    const { name, username, phone, email, password } = req.body;

    const userExists = await User.findOne({
      $or: [{ email }, { username }],
    });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        message:
          "Password must be at least 8 characters long and include uppercase, lowercase, number and special character",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      username: username.trim(),
      phone,
      email: email.toLowerCase(),
      password: hashedPassword,
    });

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(201).json({
      token,
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
      },
    });

  } catch (error) {
    next(error);
  }
};

// 🔐 LOGIN
const login = async (req, res, next) => {
  try {
    const { identifier, password } = req.body;

    const user = await User.findOne({
      $or: [{ email: identifier.toLowerCase() }, { username: identifier.trim() }],
    });

    if (!user) {
      return res.status(400).json({ message: "User does not exist!" });
    }

    const pMatch = await bcrypt.compare(password, user.password);

    if (!pMatch) {
      return res.status(400).json({ message: "Incorrect password!" });
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(200).json({
      token,
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
      },
    });

  } catch (error) {
    next(error);
  }
};

module.exports = { register, login };