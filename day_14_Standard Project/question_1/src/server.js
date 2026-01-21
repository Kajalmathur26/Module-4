import express from "express";
import todoRoutes from "./routes/todo.routes.js";

const app = express();
const PORT = 3000;

app.use(express.json());

app.use("/todos", todoRoutes);

app.get("/", (req, res) => {
  res.send("Todo API is running");
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
