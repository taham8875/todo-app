const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const router = express.Router();
const secretKey = process.env.SECRET_KEY;


router.post("/", async (req, res) => {
  // Extract user registration data from req.body
  const { username, password } = req.body;

  // Hash the password, never store plain text passwords in the database
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(password, salt);

  // Check if the username already exists in the database
  const existingUser = await prisma.user.findUnique({
    where: {
      username: username,
    },
  });

  if (existingUser) {
    return res.status(400).json({ message: "Username already exists" });
  }

  // Create the user in the database
  const user = await prisma.user.create({
    data: {
      username: username,
      password: hashedPassword,
    },
  });

  console.log(user);

  // Generate an authentication token with JWT
  const token = jwt.sign({ username: username, id: user.id }, secretKey);

  res.status(200).json({ token: token });

});

module.exports = router;
