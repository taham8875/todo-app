/**
 * This is the entry point for the back-end server.
 * It defines the routes and starts the server.
 * this app is a simple todo app with authentication, authorization, and CRUD operations.
 */

const express = require("express");
const cors = require("cors");
const registerRouter = require("./routers/register");
const signinRouter = require("./routers/signin");
const retrieveTodosRouter = require("./routers/retrieveTodos");
const deleteTodoRouter = require("./routers/deleteTodo");
const updateTodoRouter = require("./routers/updateTodo");
const addTodoRouter = require("./routers/addTodo");

const port = 3000 || process.env.PORT;
const app = express();

app.use(express.json());

// Enable CORS for all routes
app.use(cors());

// Define routes
app.use("/api/register", registerRouter);
app.use("/api/signin", signinRouter);
app.use("/api/todos", retrieveTodosRouter);
app.use("/api/todos", addTodoRouter);
app.use("/api/todos", deleteTodoRouter);
app.use("/api/todos", updateTodoRouter);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
