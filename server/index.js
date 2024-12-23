const express = require("express");
const cors = require("cors");
const zaposleniRoutes = require("./routes/zaposleniRoutes");
const proizvodRoutes = require("./routes/proizvodRoutes");
const radniNalogRoutes = require("./routes/radniNalogRoutes");
const dnevnikSmeneRoutes = require("./routes/dnevnikSmeneRoutes");
const jedinicaMereRoutes = require("./routes/jedinicaMereRoutes");
const magacinRoutes = require("./routes/magacinRoutes");
const proizvodniPogonRoutes = require("./routes/proizvodniPogonRoutes");
const popisnaListaRoutes = require("./routes/popisnaListaRoutes");
const tehnickaSpecifikacijaRoutes = require("./routes/tehnickaSpecifikacijaRoutes");
const tehnoloskiPostupakRoutes = require("./routes/tehnoloskiPostupakRoutes");
const dsAngazovanjeRoutes = require("./routes/dsAngazovanjeRoutes");
const tipRadnihSatiRoutes = require("./routes/tipRadnihSatiRoutes");
const ulogaRoutes = require("./routes/ulogaRoutes");
const stavkaPlRoutes = require("./routes/stavkaPlRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/zaposleni", zaposleniRoutes);
app.use("/proizvod", proizvodRoutes);
app.use("/radni-nalog", radniNalogRoutes);
app.use("/dnevnik-smene", dnevnikSmeneRoutes);
app.use("/jedinica-mere", jedinicaMereRoutes);
app.use("/magacin", magacinRoutes);
app.use("/proizvodni-pogon", proizvodniPogonRoutes);
app.use("/popisna-lista", popisnaListaRoutes);
app.use("/tehnicka-specifikacija", tehnickaSpecifikacijaRoutes);
app.use("/tehnoloski-postupak", tehnoloskiPostupakRoutes);
app.use("/ds-angazovanje", dsAngazovanjeRoutes);
app.use("/tip-radnih-sati", tipRadnihSatiRoutes);
app.use("/uloga", ulogaRoutes);
app.use("/stavka-pl", stavkaPlRoutes);

// Default route
app.get("/", (req, res) => {
  res.send("Server is running and connected!");
});

// Start server
app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
