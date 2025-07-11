const pool = require("../db");

const PopisnaListaService = {
  create: async (siframagacina, datum) => {
    const result = await pool.query(
      "INSERT INTO popisnalista (siframagacina, datum) VALUES ($1, $2) RETURNING *",
      [siframagacina, datum]
    );
    return result.rows[0];
  },

  getAll: async () => {
    const result = await pool.query(
      `SELECT
        (SELECT ROW_TO_JSON(tp_object) 
         FROM (
           SELECT 
             m.siframagacina, 
             m.naziv AS nazivmagacina,
             (SELECT ROW_TO_JSON(tp) 
              FROM (
                SELECT tp.sifratp, tp.naziv AS nazivtp
                FROM tipproizvoda tp
                WHERE tp.sifratp = m.sifratp
              ) tp
             ) AS tipproizvoda
           FROM magacin m
           WHERE m.siframagacina = pl.siframagacina
         ) tp_object
        ) AS magacin,
        pl.datum
      FROM popisnalista pl`
    );
    return result.rows;
  },

  getById: async (siframagacina, datum) => {
    const result = await pool.query(
      `SELECT
        (SELECT ROW_TO_JSON(tp_object) 
         FROM (
           SELECT 
             m.siframagacina, 
             m.naziv AS nazivmagacina,
             (SELECT ROW_TO_JSON(tp) 
              FROM (
                SELECT tp.sifratp, tp.naziv AS nazivtp
                FROM tipproizvoda tp
                WHERE tp.sifratp = m.sifratp
              ) tp
             ) AS tipproizvoda
           FROM magacin m
           WHERE m.siframagacina = pl.siframagacina
         ) tp_object
        ) AS magacin,
        pl.datum
      FROM popisnalista pl
      WHERE pl.siframagacina = $1 AND pl.datum = $2`,
      [siframagacina, datum]
    );
    return result.rows[0];
  },

  delete: async (siframagacina, datum) => {
    await pool.query(
      "DELETE FROM popisnalista WHERE siframagacina = $1 AND datum = $2",
      [siframagacina, datum]
    );

    const client = await pool.connect();
    try {
      await client.query("BEGIN");

      await client.query(
        "DELETE FROM stavkapl WHERE siframagacina = $1 AND datum = $2",
        [siframagacina, datum]
      );

      await client.query(
        "DELETE FROM popisnalista WHERE siframagacina = $1 AND datum = $2",
        [siframagacina, datum]
      );

      await client.query("COMMIT");
    } catch (error) {
      await client.query("ROLLBACK");
      throw error;
    } finally {
      client.release();
    }
  },

  getByGodina: async (godina) => {
    const tableName = `PopisnaLista_${godina}`;

    const result = await pool.query(
      `SELECT
      (SELECT ROW_TO_JSON(tp_object) 
       FROM (
         SELECT 
           m.siframagacina, 
           m.naziv AS nazivmagacina,
           (SELECT ROW_TO_JSON(tp) 
            FROM (
              SELECT tp.sifratp, tp.naziv AS nazivtp
              FROM tipproizvoda tp
              WHERE tp.sifratp = m.sifratp
            ) tp
           ) AS tipproizvoda
         FROM magacin m
         WHERE m.siframagacina = pl.siframagacina
       ) tp_object
      ) AS magacin,
      pl.datum
    FROM ${tableName} pl`
    );

    return result.rows;
  },

  getCountByGodina: async (godina) => {
    const tableName = `PopisnaLista_${godina}`;
    const result = await pool.query(`SELECT COUNT(*) FROM ${tableName}`);
    return parseInt(result.rows[0].count, 10);
  },
};

module.exports = PopisnaListaService;
