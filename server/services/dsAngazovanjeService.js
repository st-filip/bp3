const pool = require("../db");

const DsAngazovanjeService = {
  getAll: async () => {
    const result = await pool.query(
      `SELECT 
        ds.brojds, 
        ds.jmbg,
        ds.napomena,
        ds.imeprezime,
        (SELECT ROW_TO_JSON(uloga) 
         FROM (SELECT sifrauloge, naziv AS nazivuloge FROM uloga WHERE sifrauloge = ds.sifrauloge) uloga) AS uloga
       FROM dsangazovanje ds`
    );
    return result.rows;
  },

  create: async (brojds, jmbg, sifrauloge, napomena) => {
    const result = await pool.query(
      "INSERT INTO dsangazovanje (brojds, jmbg, sifrauloge, napomena) VALUES($1, $2, $3, $4) RETURNING *",
      [brojds, jmbg, sifrauloge, napomena]
    );
    return result.rows[0];
  },

  update: async (brojds, jmbg, sifrauloge, napomena) => {
    await pool.query(
      "UPDATE dsangazovanje SET napomena = $1 WHERE brojds = $2 AND jmbg = $3 AND sifrauloge = $4",
      [napomena, brojds, jmbg, sifrauloge]
    );
  },

  delete: async (brojds, jmbg, sifrauloge) => {
    await pool.query(
      "DELETE FROM dsangazovanje WHERE brojds = $1 AND jmbg = $2 AND sifrauloge = $3",
      [brojds, jmbg, sifrauloge]
    );
  },
};

module.exports = DsAngazovanjeService;
