const express = require("express");
const { PrismaClient } = require("@prisma/client");
const verifyToken = require("../middlewares/verifyToken");
const prisma = new PrismaClient();
const router = express.Router();

// Route that requires authentication, note adding verifyToken as a middleware
router.get("/", verifyToken, async (req, res) => {
  try {
    // Get the user ID from the request
    const userId = req.user.id;

    // Get the todos for the user from the database
    const todos = await prisma.todo.findMany({
      where: {
        userId: userId,
      },
    });

    // Send the todos as a response
    res.status(200).json({ todos });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;

