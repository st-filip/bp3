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
      res.status(500).send(error.message);
    }
  },

  getAll: async (req, res) => {
    try {
      const proizvodi = await ProizvodService.getAll();
      res.json(proizvodi);
    } catch (error) {
      console.error(error.message);
      res.status(500).send(error.message);
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
      res.status(500).send(error.message);
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
      res.status(500).send(error.message);
    }
  },

  delete: async (req, res) => {
    try {
      const { sifraproizvoda } = req.params;
      await ProizvodService.delete(sifraproizvoda);

      res.json({ message: "Proizvod je uspešno obrisan." });
    } catch (error) {
      console.error(error.message);
      res.status(500).send(error.message);
    }
  },

  getByType: async (req, res) => {
    try {
      const { sifratp } = req.params;

      if (!sifratp) {
        return res
          .status(400)
          .json({ message: "Morate navesti tip proizvoda." });
      }

      const proizvodi = await ProizvodService.getByType(sifratp);

      if (proizvodi.length === 0) {
        return res.status(404).json({ message: "Nema proizvoda za dati tip." });
      }

      res.json(proizvodi);
    } catch (error) {
      console.error(error.message);
      res.status(500).send(error.message);
    }
  },

  searchByConditions: async (req, res) => {
    try {
      const { naziv, nazivjm } = req.query;

      if (!naziv && !nazivjm) {
        const proizvodi = await ProizvodService.getAll();
        return res.json(proizvodi);
      }

      const proizvodi = await ProizvodService.searchByConditions(
        naziv,
        nazivjm
      );
      res.json(proizvodi);
    } catch (error) {
      console.error(error.message);
      res.status(500).send(error.message);
    }
  },
};

module.exports = ProizvodController;
