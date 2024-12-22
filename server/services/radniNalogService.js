const pool = require("../db");

const RadniNalogService = {
  create: async (
    datum,
    sifraproizvoda,
    sifrapogona,
    planiranakol,
    ostvarenakol,
    status,
    voda,
    vodenapara,
    elenergija,
    brojtp,
    brojts
  ) => {
    const result = await pool.query(
      "INSERT INTO radninalogpregled (datum, sifraproizvoda, sifrapogona, planiranakol, ostvarenakol, status, voda, vodenapara, elenergija, brojtp, brojts) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *",
      [
        datum,
        sifraproizvoda,
        sifrapogona,
        planiranakol,
        ostvarenakol,
        status,
        voda,
        vodenapara,
        elenergija,
        brojtp,
        brojts,
      ]
    );
    return result.rows[0];
  },

  getAll: async () => {
    const result = await pool.query(
      `SELECT 
      rn.brojrn,
      rn.datum,
      rn.planiranakol,
      rn.ostvarenakol,
      rn.status,
      rn.voda,
      rn.vodenapara,
      rn.elenergija,
      rn.ukupnosati,
      (SELECT ROW_TO_JSON(p_object)
      FROM (
        SELECT sifraproizvoda, naziv 
        FROM proizvod 
        WHERE sifraproizvoda = rn.sifraproizvoda
      ) p_object) AS proizvod,
      (SELECT ROW_TO_JSON(pg_object)
      FROM (
        SELECT sifrapogona, naziv AS naziv_pogona 
        FROM proizvodnipogon 
        WHERE sifrapogona = rn.sifrapogona
      ) pg_object) AS proizvodnipogon,
      (SELECT ROW_TO_JSON(tp_object)
      FROM (
        SELECT brojtp, naziv AS tp_naziv 
        FROM tehnoloskipostupak 
        WHERE brojtp = rn.brojtp
      ) tp_object) AS tehnoloskipostupak,
      (SELECT ROW_TO_JSON(ts_object)
      FROM (
        SELECT brojts, naziv AS ts_naziv
        FROM tehnickaspecifikacija 
        WHERE brojts = rn.brojts
      ) ts_object) AS tehnickaspecifikacija
    FROM radninalogpregled rn`
    );
    return result.rows;
  },

  getById: async (brojrn) => {
    const result = await pool.query(
      `SELECT 
      rn.brojrn,
      rn.datum,
      rn.planiranakol,
      rn.ostvarenakol,
      rn.status,
      rn.voda,
      rn.vodenapara,
      rn.elenergija,
      rn.ukupnosati,
      (SELECT ROW_TO_JSON(p_object)
      FROM (
        SELECT sifraproizvoda, naziv 
        FROM proizvod 
        WHERE sifraproizvoda = rn.sifraproizvoda
      ) p_object) AS proizvod,
      (SELECT ROW_TO_JSON(pg_object)
      FROM (
        SELECT sifrapogona, naziv AS naziv_pogona 
        FROM proizvodnipogon 
        WHERE sifrapogona = rn.sifrapogona
      ) pg_object) AS proizvodnipogon,
      (SELECT ROW_TO_JSON(tp_object)
      FROM (
        SELECT brojtp, naziv AS tp_naziv 
        FROM tehnoloskipostupak 
        WHERE brojtp = rn.brojtp
      ) tp_object) AS tehnoloskipostupak,
      (SELECT ROW_TO_JSON(ts_object)
      FROM (
        SELECT brojts, naziv AS ts_naziv
        FROM tehnickaspecifikacija 
        WHERE brojts = rn.brojts
      ) ts_object) AS tehnickaspecifikacija
    FROM radninalogpregled rn WHERE brojrn = $1`,
      [brojrn]
    );
    return result.rows[0];
  },

  update: async (
    brojrn,
    datum,
    sifraproizvoda,
    sifrapogona,
    planiranakol,
    ostvarenakol,
    status,
    voda,
    vodenapara,
    elenergija,
    brojtp,
    brojts
  ) => {
    await pool.query(
      "UPDATE radninalogpregled SET datum = $1, sifraproizvoda = $2, sifrapogona = $3, planiranakol = $4, ostvarenakol = $5, status = $6, voda = $7, vodenapara = $8, elenergija = $9, brojtp = $10, brojts = $11 WHERE brojrn = $12",
      [
        datum,
        sifraproizvoda,
        sifrapogona,
        planiranakol,
        ostvarenakol,
        status,
        voda,
        vodenapara,
        elenergija,
        brojtp,
        brojts,
        brojrn,
      ]
    );
  },

  delete: async (brojrn) => {
    await pool.query("DELETE FROM radninalogpregled WHERE brojrn = $1", [
      brojrn,
    ]);
  },
};

module.exports = RadniNalogService;
