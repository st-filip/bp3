const pool = require("../db");

const DnevnikSmeneService = {
  create: async (datum, brojrn) => {
    const result = await pool.query(
      "INSERT INTO dnevnikSmene (datum, brojrn) VALUES($1, $2) RETURNING *",
      [datum, brojrn]
    );
    return result.rows[0];
  },

  getAll: async () => {
    const result = await pool.query(
      `SELECT 
        ds.brojds,
        ds.datum,
        ds.brojrn,
        (SELECT ROW_TO_JSON(pg_object) 
         FROM (
           SELECT sifrapogona, naziv AS naziv_pogona 
           FROM proizvodnipogon 
           WHERE sifrapogona = ds.sifrapogona
         ) pg_object) AS proizvodnipogon
      FROM dnevnikSmene ds`
    );
    return result.rows;
  },

  getById: async (brojds) => {
    const result = await pool.query(
      `SELECT 
        ds.brojds,
        ds.datum,
        ds.brojrn,
        (SELECT ROW_TO_JSON(pg_object) 
         FROM (
           SELECT sifrapogona, naziv AS naziv_pogona 
           FROM proizvodnipogon 
           WHERE sifrapogona = ds.sifrapogona
         ) pg_object) AS proizvodnipogon
      FROM dnevnikSmene ds
      WHERE ds.brojds = $1`,
      [brojds]
    );
    return result.rows[0];
  },

  update: async (brojds, datum, brojrn, sifrapogona) => {
    await pool.query(
      "UPDATE dnevnikSmene SET datum = $1, brojrn = $2, sifrapogona = $3 WHERE brojds = $4",
      [datum, brojrn, sifrapogona, brojds]
    );
  },

  delete: async (brojds) => {
    await pool.query("DELETE FROM dnevnikSmene WHERE brojds = $1", [brojds]);
  },
};

module.exports = DnevnikSmeneService;
