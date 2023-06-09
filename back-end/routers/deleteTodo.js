const express = require("express");
const { PrismaClient } = require("@prisma/client");
const verifyToken = require("../middlewares/verifyToken");
const prisma = new PrismaClient();
const router = express.Router();

// Define a route for deleting a todo
router.delete("/:id", verifyToken, async (req, res) => {
  try {
    // Get the user ID from the request (assuming you're using JWT authentication)
    const userId = req.user.id;

    // Get the ID of the todo to be deleted from the request parameters
    const todoId = parseInt(req.params.id);

    // Find the todo in the database
    const todo = await prisma.todo.findUnique({
      where: { id: todoId },
    });

    // Check if the todo exists and belongs to the user
    if (!todo || todo.userId !== userId) {
      return res.status(404).json({ message: "Todo not found" });
    }

    // Delete the todo from the database
    await prisma.todo.delete({
      where: { id: todoId },
    });

    // Send a success response
    res.status(200).json({ message: "Todo deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
