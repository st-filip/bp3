const db = require("../db");

const PosaoProizvodnjeService = {
  getAll: async () => {
    const result = await db.query(
      "SELECT sifraposla, naziv FROM posaoproizvodnje"
    );
    return result.rows;
  },
};

module.exports = PosaoProizvodnjeService;
