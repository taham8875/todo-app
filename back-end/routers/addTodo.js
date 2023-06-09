const express = require("express");
const { PrismaClient } = require("@prisma/client");
const verifyToken = require("../middlewares/verifyToken");
const prisma = new PrismaClient();
const router = express.Router();

// Define a route for adding a new todo
router.post("/", verifyToken, async (req, res) => {
  try {
    // Get the user ID from the request (assuming you're using JWT authentication)
    const userId = req.user.id;

    // Create a new todo with the user ID and the todo data from the request body
    const todo = await prisma.todo.create({
      data: {
        userId: userId,
        content: req.body.content,
      },
    });

    // Send a response indicating success
    res.status(201).json(todo);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
