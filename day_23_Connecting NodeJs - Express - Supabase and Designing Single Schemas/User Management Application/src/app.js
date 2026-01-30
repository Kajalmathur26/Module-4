import express from "express";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes.js";
import { errorHandler } from "./middleware/errorHandler.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use("/api/users", userRoutes);

// Global error handler (must be last)
app.use(errorHandler);

export default app;
