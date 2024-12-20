const pool = require("../db");

const ZaposleniService = {
  create: async (jmbg, imeprezime, nazivtipazaposlenog) => {
    const result = await pool.query(
      "INSERT INTO zaposleni (jmbg, imeprezime, nazivtipazaposlenog) VALUES($1, $2, $3) RETURNING *",
      [jmbg, imeprezime, nazivtipazaposlenog]
    );
    return result.rows[0];
  },

  getAll: async () => {
    const result = await pool.query("SELECT * FROM zaposleni");
    return result.rows;
  },

  getAllValid: async () => {
    const result = await pool.query(
      "SELECT * FROM zaposleni WHERE imeprezime NOT ILIKE 'Ime%'"
    );
    return result.rows;
  },

  getById: async (jmbg) => {
    const result = await pool.query("SELECT * FROM zaposleni WHERE jmbg = $1", [
      jmbg,
    ]);
    return result.rows[0];
  },

  update: async (jmbg, imeprezime, nazivtipazaposlenog) => {
    await pool.query(
      "UPDATE zaposleni SET imeprezime = $1, nazivtipazaposlenog = $2 WHERE jmbg = $3",
      [imeprezime, nazivtipazaposlenog, jmbg]
    );
  },

  delete: async (jmbg) => {
    await pool.query("DELETE FROM zaposleni WHERE jmbg = $1", [jmbg]);
  },
};

module.exports = ZaposleniService;
