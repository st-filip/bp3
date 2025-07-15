const pool = require("../db");

const DsAngazovanjeService = {
  getAll: async () => {
    const result = await pool.query(
      `SELECT 
      ds.brojds, 
      ds.jmbg,
      ds.napomena,
      ds.imeprezime,
      JSON_BUILD_OBJECT(
        'sifrauloge', u.sifrauloge,
        'nazivuloge', u.naziv
      ) AS uloga,
      JSON_BUILD_OBJECT(
        'jmbg', z.jmbg
      ) AS zaposleni
    FROM dsangazovanje ds
    LEFT JOIN uloga u ON u.sifrauloge = ds.sifrauloge
    LEFT JOIN zaposleni z ON z.jmbg = ds.jmbg`
    );
    return result.rows;
  },

  getAllForDS: async (brojds) => {
    const result = await pool.query(
      `SELECT 
      ds.brojds, 
      ds.jmbg,
      ds.napomena,
      ds.imeprezime,
      JSON_BUILD_OBJECT(
        'sifrauloge', u.sifrauloge,
        'nazivuloge', u.naziv
      ) AS uloga,
      JSON_BUILD_OBJECT(
        'jmbg', z.jmbg
      ) AS zaposleni
    FROM dsangazovanje ds
    LEFT JOIN uloga u ON u.sifrauloge = ds.sifrauloge
    LEFT JOIN zaposleni z ON z.jmbg = ds.jmbg
    WHERE ds.brojds = $1`,
      [brojds]
    );
    return result.rows;
  },

  getById: async (brojds, jmbg, sifrauloge) => {
    const result = await pool.query(
      `SELECT 
      ds.brojds, 
      ds.jmbg,
      ds.napomena,
      ds.imeprezime,
      JSON_BUILD_OBJECT(
        'sifrauloge', u.sifrauloge,
        'nazivuloge', u.naziv
      ) AS uloga,
      JSON_BUILD_OBJECT(
        'jmbg', z.jmbg
      ) AS zaposleni
    FROM dsangazovanje ds
    LEFT JOIN uloga u ON u.sifrauloge = ds.sifrauloge
    LEFT JOIN zaposleni z ON z.jmbg = ds.jmbg
    WHERE ds.brojds = $1 AND ds.jmbg = $2 AND ds.sifrauloge = $3`,
      [brojds, jmbg, sifrauloge]
    );
    return result.rows[0];
  },

  create: async (brojds, jmbg, sifrauloge, napomena) => {
    const result = await pool.query(
      "INSERT INTO dsangazovanje (brojds, jmbg, sifrauloge, napomena) VALUES($1, $2, $3, $4) RETURNING *",
      [brojds, jmbg, sifrauloge, napomena]
    );
    return result.rows[0];
  },

  update: async (brojds, jmbg, sifrauloge, napomena, imeprezime) => {
    await pool.query(
      "UPDATE dsangazovanje SET napomena = $1, imeprezime = $2 WHERE brojds = $3 AND jmbg = $4 AND sifrauloge = $5",
      [napomena, imeprezime, brojds, jmbg, sifrauloge]
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
