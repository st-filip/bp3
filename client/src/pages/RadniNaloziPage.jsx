import React, { useState, useEffect } from "react";
import RadniNalogCard from "../components/RadniNalogCard";
import Button from "../components/Button";
import Input from "../components/Input";
import Select from "../components/Select";
import { FaPlus, FaTimes, FaTrash, FaEdit } from "react-icons/fa";

const RadniNaloziPage = () => {
  const [radniNalozi, setRadniNalozi] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [proizvodi, setProizvodi] = useState([]);
  const [pogoni, setPogoni] = useState([]);
  const [tehnoloskiPostupci, setTehnoloskiPostupci] = useState([]);
  const [tehnickeSpecifikacije, setTehnickeSpecifikacije] = useState([]);
  const [newNalog, setNewNalog] = useState({
    datum: "",
    sifraproizvoda: "",
    sifrapogona: "",
    planiranakol: 0,
    ostvarenakol: 0,
    status: "",
    voda: 0,
    vodenapara: 0,
    elenergija: 0,
    brojtp: "",
    brojts: "",
    ukupnoSati: 0,
  });
  const [isEditing, setIsEditing] = useState(false);
  const [angazovanja, setAngazovanja] = useState([]);
  const [novoAngazovanje, setNovoAngazovanje] = useState({
    brojrn: "",
    sifrauloge: "",
    jmbg: "",
  });
  const [editBrojrn, setEditBrojrn] = useState(undefined);
  const [zaposleni, setZaposleni] = useState([]);
  const [uloge, setUloge] = useState([]);
  const [ukupnoSati, setUkupnoSati] = useState(0);

  const fetchRadniNalozi = async () => {
    try {
      const response = await fetch("http://localhost:5000/radni-nalog");
      if (!response.ok) {
        throw new Error("Greška pri dobijanju radnih naloga");
      }
      const data = await response.json();
      setRadniNalozi(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchRadniNalogById = async (brojrn) => {
    try {
      const response = await fetch(
        `http://localhost:5000/radni-nalog/${brojrn}`
      );
      if (!response.ok) {
        throw new Error("Greška pri dobijanju radnog naloga");
      }
      const data = await response.json();
      return data;
    } catch (err) {
      setError(err.message);
    }
  };

  const fetchProizvodi = async () => {
    try {
      const response = await fetch("http://localhost:5000/proizvod");
      if (!response.ok) {
        throw new Error("Greška pri dobijanju proizvoda");
      }
      const data = await response.json();
      setProizvodi(data);
    } catch (err) {
      setError(err.message);
    }
  };

  const fetchPogoni = async () => {
    try {
      const response = await fetch("http://localhost:5000/proizvodni-pogon");
      if (!response.ok) {
        throw new Error("Greška pri dobijanju pogona");
      }
      const data = await response.json();
      setPogoni(data);
    } catch (err) {
      setError(err.message);
    }
  };

  const fetchTehnoloskiPostupci = async () => {
    try {
      const response = await fetch("http://localhost:5000/tehnoloski-postupak");
      if (!response.ok) {
        throw new Error("Greška pri tehnoloskih postupaka");
      }
      const data = await response.json();
      setTehnoloskiPostupci(data);
    } catch (err) {
      setError(err.message);
    }
  };

  const fetchTehnickeSpecifikacije = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/tehnicka-specifikacija"
      );
      if (!response.ok) {
        throw new Error("Greška pri dobijanju tehničkih specifikacija");
      }
      const data = await response.json();
      setTehnickeSpecifikacije(data);
    } catch (err) {
      setError(err.message);
    }
  };

  const fetchZaposleni = async () => {
    try {
      const response = await fetch("http://localhost:5000/zaposleni");
      if (!response.ok) {
        throw new Error("Greška pri dobijanju zaposlenih");
      }
      const data = await response.json();
      setZaposleni(data);
    } catch (err) {
      setError(err.message);
    }
  };

  const fetchUloge = async () => {
    try {
      const response = await fetch("http://localhost:5000/uloga");
      if (!response.ok) {
        throw new Error("Greška pri dobijanju uloga");
      }
      const data = await response.json();
      setUloge(data);
    } catch (err) {
      setError(err.message);
    }
  };

  const fetchRNNagazovanjeById = async (brojrn, jmbg, sifrauloge) => {
    try {
      const response = await fetch(
        `http://localhost:5000/rn-angazovanje/${brojrn}/${jmbg}/${sifrauloge}`
      );
      if (!response.ok) {
        throw new Error("Greška pri dobijanju angažovanja");
      }
      const data = await response.json();
      return data;
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchRadniNalozi();
    fetchProizvodi();
    fetchPogoni();
    fetchTehnickeSpecifikacije();
    fetchTehnoloskiPostupci();
    fetchZaposleni();
    fetchUloge();
  }, []);

  const handleEdit = async (rn) => {
    setNewNalog({
      datum: rn.datum ? rn.datum.split("T")[0] : "",
      sifraproizvoda: rn.proizvod.sifraproizvoda,
      sifrapogona: rn.proizvodnipogon.sifrapogona,
      planiranakol: rn.planiranakol || 0,
      ostvarenakol: rn.ostvarenakol || 0,
      status: rn.status || "Aktivan",
      voda: rn.voda || 0,
      vodenapara: rn.vodenapara || 0,
      elenergija: rn.elenergija || 0,
      brojtp: rn.tehnoloskipostupak.brojtp,
      brojts: rn.tehnickaspecifikacija.brojts,
      ukupnoSati: rn.ukupnosati || 0,
    });

    setNovoAngazovanje((prev) => ({
      ...prev,
      brojrn: rn.brojrn,
    }));

    setEditBrojrn(rn.brojrn);

    try {
      const response = await fetch(
        `http://localhost:5000/rn-angazovanje/${rn.brojrn}`
      );
      if (!response.ok) {
        throw new Error("Greška pri dobijanju angažovanja");
      }
      const data = await response.json();
      setAngazovanja(data);
    } catch (err) {
      console.error(err.message);
      alert("Došlo je do greške pri dobijanju angažovanja.");
    }

    setIsAdding(true);
    setIsEditing(true);
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Da li ste sigurni da želite da obrišete ovaj radni nalog?"
    );
    if (!confirmDelete) return;

    try {
      const response = await fetch(`http://localhost:5000/radni-nalog/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Greška pri brisanju radnog naloga");
      }
      setRadniNalozi((prev) => prev.filter((nalog) => nalog.brojrn !== id));
      alert("Radni nalog je uspešno obrisan.");
    } catch (err) {
      console.error(err.message);
      alert("Došlo je do greške pri brisanju.");
    }
  };

  const handleAddNalog = async (event) => {
    event.preventDefault();

    try {
      if (isEditing) {
        const response = await fetch(
          `http://localhost:5000/radni-nalog/${editBrojrn}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(newNalog),
          }
        );

        if (!response.ok) {
          throw new Error("Greška pri ažuriranju radnog naloga");
        }

        const updatedNalog = await fetchRadniNalogById(editBrojrn);

        setRadniNalozi((prev) =>
          prev.map((nalog) =>
            nalog.brojrn === editBrojrn ? updatedNalog : nalog
          )
        );

        alert("Radni nalog je uspešno ažuriran.");
      } else {
        console.log("Dodaje se novi radni nalog", newNalog);

        const response = await fetch("http://localhost:5000/radni-nalog", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newNalog),
        });

        if (!response.ok) {
          throw new Error("Greška pri dodavanju radnog naloga");
        }

        const data = await response.json();
        const updatedNalog = await fetchRadniNalogById(data.brojrn);

        setRadniNalozi((prev) => [...prev, updatedNalog]);

        alert("Radni nalog je uspešno dodat.");

        setIsAdding(false);
        setIsEditing(false);
        setNewNalog({
          datum: "",
          sifraproizvoda: "",
          sifrapogona: "",
          planiranakol: 0,
          ostvarenakol: 0,
          status: "",
          voda: 0,
          vodenapara: 0,
          elenergija: 0,
          brojtp: "",
          brojts: "",
        });
      }
    } catch (err) {
      console.error(err.message);
      alert("Došlo je do greške: " + err.message);
    }
  };

  const handleCancel = () => {
    setIsAdding(false);
    setIsEditing(false);
    setNewNalog({
      datum: "",
      sifraproizvoda: "",
      sifrapogona: "",
      planiranakol: 0,
      ostvarenakol: 0,
      status: "",
      voda: 0,
      vodenapara: 0,
      elenergija: 0,
      brojtp: "",
      brojts: "",
    });
    setAngazovanja([]);
    setNovoAngazovanje({
      jmbg: "",
      sifrauloge: "",
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewNalog((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDeleteAngazovanje = async (sifrauloge, jmbg) => {
    const confirmDelete = window.confirm(
      "Da li ste sigurni da želite da obrišete ovo angažovanje?"
    );
    if (!confirmDelete) return;

    try {
      const response = await fetch(
        `http://localhost:5000/rn-angazovanje/${editBrojrn}/${jmbg}/${sifrauloge}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        throw new Error("Greška pri brisanju angažovanja");
      }
      setAngazovanja((prev) =>
        prev.filter(
          (a) => a.uloga.sifrauloge !== sifrauloge && a.zaposleni.jmbg !== jmbg
        )
      );
      alert("Angažovanje je uspešno obrisano.");
    } catch (err) {
      console.error(err.message);
      alert("Došlo je do greške pri brisanju angažovanja.");
    }
  };

  const handleDodajAngazovanje = async () => {
    try {
      const response = await fetch(`http://localhost:5000/rn-angazovanje`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(novoAngazovanje),
      });
      if (!response.ok) {
        throw new Error("Greška pri dodavanju angažovanja");
      }
      const data = await response.json();
      const novoRNAngazovanje = await fetchRNNagazovanjeById(
        data.brojrn,
        data.jmbg,
        data.sifrauloge
      );
      setAngazovanja((prev) => [...prev, novoRNAngazovanje]);
      setNovoAngazovanje({ sifrauloge: "", jmbg: "" });
      alert("Angažovanje je uspešno dodato.");
    } catch (err) {
      console.error(err.message);
      alert("Došlo je do greške pri dodavanju angažovanja.");
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Radni Nalozi</h1>
        {!isAdding ? (
          <Button
            icon={<FaPlus size={20} />}
            onClick={() => setIsAdding(true)}
            variant="success"
          />
        ) : (
          <Button
            icon={<FaTimes size={20} />}
            onClick={handleCancel}
            variant="danger"
          />
        )}
      </div>

      {isAdding && (
        <>
          <form
            onSubmit={handleAddNalog}
            className="bg-white p-6 rounded-lg shadow-md mb-6"
          >
            <h2 className="text-xl font-semibold mb-4">
              {isEditing
                ? "Izmeni radni nalog " + editBrojrn
                : "Dodaj novi radni nalog"}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              <Input
                type="date"
                name="datum"
                value={newNalog.datum}
                onChange={handleInputChange}
                label="Datum"
                required
              />
              <Select
                name="sifraproizvoda"
                value={newNalog.sifraproizvoda}
                onChange={handleInputChange}
                label="Proizvod"
                options={proizvodi.map((proizvod) => ({
                  value: proizvod.sifraproizvoda,
                  label: `${proizvod.naziv} | ${proizvod.tipproizvoda.nazivtp}`,
                }))}
                required
              />
              <Select
                name="sifrapogona"
                value={newNalog.sifrapogona}
                onChange={handleInputChange}
                label="Proizvodni pogon"
                options={pogoni.map((pogon) => ({
                  value: pogon.sifrapogona,
                  label: pogon.naziv,
                }))}
                required
              />
              <Select
                name="brojtp"
                value={newNalog.brojtp}
                onChange={handleInputChange}
                label="Tehnički postupak"
                options={tehnoloskiPostupci.map((tp) => ({
                  value: tp.brojtp,
                  label: tp.naziv,
                }))}
                required
              />
              <Select
                name="brojts"
                value={newNalog.brojts}
                onChange={handleInputChange}
                label="Tehnička specifikacija"
                option1="tehničku specifikaciju"
                options={tehnickeSpecifikacije.map((ts) => ({
                  value: ts.brojts,
                  label: ts.naziv,
                }))}
                required
              />
              <Input
                type="number"
                name="planiranakol"
                value={newNalog.planiranakol}
                onChange={handleInputChange}
                label="Planirana količina"
                min={0}
                required
              />
              <Input
                type="number"
                name="ostvarenakol"
                value={newNalog.ostvarenakol}
                onChange={handleInputChange}
                label="Ostvarena količina"
                min={0}
                required
              />
              <Select
                name="status"
                value={newNalog.status}
                onChange={handleInputChange}
                label="Status"
                options={[
                  { value: "Aktivan", label: "Aktivan" },
                  { value: "Odgovara", label: "Odgovara" },
                  { value: "Ne odgovara", label: "Ne odgovara" },
                ]}
                required
              />
              <Input
                type="number"
                name="voda"
                value={newNalog.voda}
                onChange={handleInputChange}
                label="Voda"
                min={0}
                required
              />
              <Input
                type="number"
                name="vodenapara"
                value={newNalog.vodenapara}
                onChange={handleInputChange}
                label="Vodena para"
                min={0}
                required
              />
              <Input
                type="number"
                name="elenergija"
                value={newNalog.elenergija}
                onChange={handleInputChange}
                label="Električna energija"
                min={0}
                required
              />
              {isEditing && (
                <Input
                  type="number"
                  name="ukupnoSati"
                  value={newNalog.ukupnoSati}
                  onChange={handleInputChange}
                  label="Ukupno sati"
                  readonly={true}
                />
              )}
            </div>

            <div className="mt-4">
              <Button
                icon={isEditing ? <FaEdit size={20} /> : <FaPlus size={20} />}
                type="submit"
                variant="success"
              />
            </div>
          </form>

          {isEditing && (
            <div className="bg-white p-6 rounded-lg shadow-md mb-6">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleDodajAngazovanje();
                }}
              >
                <h2 className="text-xl font-semibold mb-4">
                  Dodaj novo angažovanje
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Select
                    name="jmbg"
                    value={novoAngazovanje.jmbg}
                    onChange={(e) =>
                      setNovoAngazovanje((prev) => ({
                        ...prev,
                        jmbg: e.target.value,
                      }))
                    }
                    label="Zaposleni"
                    option1="zaposlenog"
                    options={zaposleni.map((zaposleni) => ({
                      value: zaposleni.jmbg,
                      label: zaposleni.imeprezime,
                    }))}
                    required
                  />
                  <Select
                    name="sifrauloge"
                    value={novoAngazovanje.sifrauloge}
                    onChange={(e) =>
                      setNovoAngazovanje((prev) => ({
                        ...prev,
                        sifrauloge: e.target.value,
                      }))
                    }
                    label="Uloga"
                    option1="ulogu"
                    options={uloge.map((uloga) => ({
                      value: uloga.sifrauloge,
                      label: uloga.naziv,
                    }))}
                    required
                  />
                </div>
                <div className="mt-4">
                  <Button
                    type="submit"
                    icon={<FaPlus size={20} />}
                    variant="success"
                  />
                </div>
              </form>

              {/* Prikaz angažovanja */}

              <h2 className="text-xl font-semibold my-4">Angažovanja</h2>
              {angazovanja.length > 0 ? (
                <div className="overflow-x-auto shadow-md rounded-xl border border-gray-300">
                  <table className="w-full text-sm text-left text-gray-700">
                    <thead className="bg-gray-100 text-gray-900 uppercase text-xs">
                      <tr>
                        <th className="px-4 py-3 border-b">Zaposleni</th>
                        <th className="px-4 py-3 border-b">Uloga</th>
                        <th className="px-4 py-3 border-b"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {angazovanja.map((angazovanje, index) => (
                        <tr
                          key={`${angazovanje.zaposleni.jmbg}-${angazovanje.uloga.sifrauloge}`}
                          className={`${
                            index % 2 === 0 ? "bg-white" : "bg-gray-50"
                          } hover:bg-gray-100 transition-colors`}
                        >
                          <td className="px-4 py-3">
                            {angazovanje.zaposleni.imeprezime}
                          </td>
                          <td className="px-4 py-3">
                            {angazovanje.uloga.nazivuloge}
                          </td>
                          <td className="px-4 py-3 text-right">
                            <Button
                              icon={<FaTrash size={20} />}
                              onClick={() =>
                                handleDeleteAngazovanje(
                                  angazovanje.uloga.sifrauloge,
                                  angazovanje.zaposleni.jmbg
                                )
                              }
                              variant="danger"
                              className="ml-auto"
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className=" text-gray-500 text-sm">
                  Trenutno ne postoje angažovanja.
                </div>
              )}
            </div>
          )}
        </>
      )}

      {!isAdding && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {radniNalozi.map((nalog) => (
            <RadniNalogCard
              key={nalog.brojrn}
              radniNalog={nalog}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default RadniNaloziPage;
