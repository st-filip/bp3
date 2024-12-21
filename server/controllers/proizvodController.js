const ProizvodService = require("../services/proizvodService");

const ProizvodController = {
  create: async (req, res) => {
    try {
      const { naziv, sifrajm, sifratp } = req.body;

      if (!naziv || !sifrajm || !sifratp) {
        return res.status(400).json({ message: "Sva polja su obavezna." });
      }

      const newProizvod = await ProizvodService.create(naziv, sifrajm, sifratp);

      res.json(newProizvod);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error");
    }
  },

  getAll: async (req, res) => {
    try {
      const proizvodi = await ProizvodService.getAll();
      res.json(proizvodi);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error");
    }
  },

  getAllValid: async (req, res) => {
    try {
      const proizvodi = await ProizvodService.getAllValid();
      res.json(proizvodi);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error");
    }
  },

  getById: async (req, res) => {
    try {
      const { sifraproizvoda } = req.params;
      const proizvod = await ProizvodService.getById(sifraproizvoda);

      if (!proizvod) {
        return res.status(404).json({ message: "Proizvod nije pronađen." });
      }

      res.json(proizvod);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error");
    }
  },

  update: async (req, res) => {
    try {
      const { sifraproizvoda } = req.params;
      const { naziv, sifrajm, sifratp } = req.body;

      if (!naziv || !sifrajm || !sifratp) {
        return res.status(400).json({ message: "Sva polja su obavezna." });
      }

      await ProizvodService.update(sifraproizvoda, naziv, sifrajm, sifratp);

      res.json({ message: "Proizvod je uspešno ažuriran." });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error");
    }
  },

  delete: async (req, res) => {
    try {
      const { sifraproizvoda } = req.params;
      await ProizvodService.delete(sifraproizvoda);

      res.json({ message: "Proizvod je uspešno obrisan." });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error");
    }
  },
};

module.exports = ProizvodController;