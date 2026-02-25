import express, { Express } from "express";
import productRoutes from "./api/v1/routes/productRoutes";

const app: Express = express();
app.use(express.json());

app.use("/api/v1/products", productRoutes);

// Health Route
app.get("/api/v1/health", (req, res) => {
  res.json({
    status: "OK",
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    version: "1.0.0"
  });
});

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

export default app;