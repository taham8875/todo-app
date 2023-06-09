const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const router = express.Router();
const secretKey = process.env.SECRET_KEY;

router.post("/", async (req, res) => {
  // Extract user sign-in data from req.body
  const { username, password } = req.body;

  // Find the user in the database with prisma
  const user = await prisma.user.findUnique({
    where: {
      username: username,
    },
  });

  if (!user || !bcrypt.compareSync(password, user.password)) {
    return res.status(401).json({ message: "Invalid Credentials" });
    // I prefer to combine the two if statements into one with the same
    // message, making it harder for attackers to guess what went wrong
  }

  // Generate an authentication token with JWT
  const token = jwt.sign({ username: user.username, id: user.id }, secretKey);

  // Send response
  res.status(200).json({ token: token });
});

module.exports = router;
