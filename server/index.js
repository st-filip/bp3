const express = require("express");
const cors = require("cors");
const zaposleniRoutes = require("./routes/zaposleniRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/zaposleni", zaposleniRoutes);

// Default route
app.get("/", (req, res) => {
  res.send("Server is running and connected!");
});

// Start server
app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
