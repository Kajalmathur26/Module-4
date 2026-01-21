const express = require("express");
const fs = require("fs");
const path = require("path");

const productsRouter = require("./routes/products.routes");
const ordersRouter = require("./routes/orders.routes");
const analyticsRouter = require("./routes/analytics.routes");

const app = express();
app.use(express.json());

app.use("/products", productsRouter);
app.use("/orders", ordersRouter);
app.use("/analytics", analyticsRouter);

app.listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
});
