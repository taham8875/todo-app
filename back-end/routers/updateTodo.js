const express = require("express");
const bcrypt = require("bcrypt");
const { PrismaClient } = require("@prisma/client");
const verifyToken = require("../middlewares/verifyToken");
const prisma = new PrismaClient();
const router = express.Router();

// Define a route for updating a todo
router.put("/:id", verifyToken, async (req, res) => {
  try {
    // Get the user ID from the request (assuming you're using JWT authentication)
    const userId = req.user.id;

    // Get the ID of the todo to be updated from the request parameters
    const todoId = parseInt(req.params.id);

    // Find the todo in the database
    const todo = await prisma.todo.findUnique({
      where: { id: todoId },
    });

    // Check if the todo exists and belongs to the user
    if (!todo || todo.userId !== userId) {
      return res.status(404).json({ message: "Todo not found" });
    }

    // Update the todo in the database
    const updatedTodo = await prisma.todo.update({
      where: { id: todoId },
      data: {
        content: req.body.content || todo.content,
        completed: req.body.completed || todo.completed,
      },
    });

    // Send a success response with the updated todo
    res.status(200).json(updatedTodo);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
