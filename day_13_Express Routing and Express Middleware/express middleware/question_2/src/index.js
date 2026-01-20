const express = require("express");
const usersRouter = require("./routes/users.routes");

const app = express();
const PORT = 3000;

app.use(express.json()); // JSON body parser

// Optional homepage route
app.get("/", (req, res) => {
  res.send("Welcome to the User Signup API!");
});

// Register users router
app.use("/users", usersRouter);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
