const express = require("express");
const cors = require("cors");
const config = require("./src/config/config");
const generatorRoutes = require("./src/routes/generatorRoutes");
const { handleError } = require("./src/utils/errorHandler");

const app = express();
const PORT = config.port;

// Middlewares
app.use(cors());
app.use(express.json({ limit: "1mb" }));

// Routes
app.use("/api", generatorRoutes);

// Health check endpoint
app.get("/health", (req, res) => {
  res.status(200).json({ status: "OK", message: "Server is running" });
});

// Error handling middleware
app.use((err, req, res, next) => {
  handleError(err, res);
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
