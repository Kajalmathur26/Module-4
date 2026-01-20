const express = require("express");
const todosRouter = require("./routes/todos.routes");
const loggerMiddleware = require("./middleware/logger.middleware");

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());          // JSON parsing
app.use(loggerMiddleware);        // App-level logger

// Routes
app.use("/todos", todosRouter);

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
