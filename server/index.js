const express = require("express");
const cors = require("cors");
const zaposleniRoutes = require("./routes/zaposleniRoutes");
const proizvodRoutes = require("./routes/proizvodRoutes");
const radniNalogRoutes = require("./routes/radniNalogRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/zaposleni", zaposleniRoutes);
app.use("/proizvod", proizvodRoutes);
app.use("/radninalog", radniNalogRoutes);

// Default route
app.get("/", (req, res) => {
  res.send("Server is running and connected!");
});

// Start server
app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
