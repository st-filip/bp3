import React, { useState, useEffect } from "react";
import RadniNalogCard from "../components/RadniNalogCard";
import Button from "../components/Button";
import Input from "../components/Input";
import Select from "../components/Select";
import Modal from "../components/Modal";
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
    ukupnosati: 0,
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
  const [us, setUs] = useState(undefined);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState({
    title: "",
    message: "",
    onConfirm: null,
    onCancel: null,
  });

  const fetchNalogInfo = async (brojrn) => {
    try {
      const osnovniRes = await fetch(
        `http://localhost:5000/radni-nalog/osnovni-podaci/${brojrn}`
      );
      const detaljiRes = await fetch(
        `http://localhost:5000/radni-nalog/detalji/${brojrn}`
      );
      if (!osnovniRes.ok || !detaljiRes.ok) {
        throw new Error("Greška pri dohvatanju podataka");
      }
      const osnovniData = await osnovniRes.json();
      const detaljiData = await detaljiRes.json();
      return { osnovni: osnovniData, detalji: detaljiData };
    } catch (err) {
      console.error(err);
      return { osnovni: null, detalji: null };
    }
  };

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
      console.error(err.message);
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
      console.error(err.message);
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
      console.error(err.message);
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
      console.error(err.message);
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
      console.error(err.message);
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
      console.error(err.message);
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
      console.error(err.message);
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
      console.error(err.message);
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
      ukupnosati: rn.ukupnosati || 0,
    });

    console.log(rn);
    setUs(rn.ukupnosati);

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
      setModalData({
        title: "Greška",
        message: err.message,
        onConfirm: () => setModalOpen(false),
      });
      setModalOpen(true);
    }

    setIsAdding(true);
    setIsEditing(true);
  };

  const handleDelete = (id) => {
    setModalData({
      title: "Potvrda brisanja",
      message: "Da li ste sigurni da želite da obrišete ovaj radni nalog?",
      onConfirm: () => {
        deleteNalog(id);
        setModalOpen(false);
      },
      onCancel: () => setModalOpen(false),
    });
    setModalOpen(true);
  };

  const deleteNalog = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/radni-nalog/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Greška pri brisanju radnog naloga. ${errorText}`);
      }
      setRadniNalozi((prev) => prev.filter((nalog) => nalog.brojrn !== id));
      setModalData({
        title: "Uspeh",
        message: "Radni nalog je uspešno obrisan.",
        onConfirm: () => setModalOpen(false),
      });
      setModalOpen(true);
    } catch (err) {
      console.error(err.message);
      setModalData({
        title: "Greška",
        message: err.message,
        onConfirm: () => setModalOpen(false),
      });
      setModalOpen(true);
    }
  };

  const handleAddNalog = async (event) => {
    event.preventDefault();
    try {
      if (isEditing) {
        console.log(newNalog.ukupnosati + " " + us);
        if (us == undefined && newNalog.ukupnosati == 0) {
          newNalog.ukupnosati = undefined;
        }
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
          const errorText = await response.text();
          throw new Error(`Greška pri ažuriranju radnog naloga. ${errorText}`);
        }

        const updatedNalog = await fetchRadniNalogById(editBrojrn);
        setNewNalog((prev) => ({
          ...prev,
          ukupnosati: updatedNalog.ukupnosati ? updatedNalog.ukupnosati : 0,
        }));

        setRadniNalozi((prev) =>
          prev.map((nalog) =>
            nalog.brojrn === editBrojrn ? updatedNalog : nalog
          )
        );

        setModalData({
          title: "Uspeh",
          message: "Radni nalog je uspešno ažuriran.",
          onConfirm: () => setModalOpen(false),
        });
        setModalOpen(true);
      } else {
        if (newNalog.ukupnosati == 0) {
          newNalog.ukupnosati = undefined;
        }
        console.log("Dodaje se novi radni nalog", newNalog);

        const response = await fetch("http://localhost:5000/radni-nalog", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newNalog),
        });

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Greška pri dodavanju radnog naloga. ${errorText}`);
        }

        const data = await response.json();
        const updatedNalog = await fetchRadniNalogById(data.brojrn);

        setRadniNalozi((prev) => [...prev, updatedNalog]);

        setModalData({
          title: "Uspeh",
          message: "Radni nalog je uspešno dodat.",
          onConfirm: () => setModalOpen(false),
        });
        setModalOpen(true);

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
          ukupnosati: 0,
        });
      }
    } catch (err) {
      console.error(err.message);
      setModalData({
        title: "Greška",
        message: err.message,
        onConfirm: () => setModalOpen(false),
      });
      setModalOpen(true);
      setNewNalog((prev) => ({
        ...prev,
        ukupnosati: us || 0,
      }));
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
      ukupnosati: 0,
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

  const handleDeleteAngazovanje = (sifrauloge, jmbg) => {
    setModalData({
      title: "Potvrda brisanja",
      message: "Da li ste sigurni da želite da obrišete ovo angažovanje?",
      onConfirm: () => {
        deleteAngazovanje(sifrauloge, jmbg);
        setModalOpen(false);
      },
      onCancel: () => setModalOpen(false),
    });
    setModalOpen(true);
  };

  const deleteAngazovanje = async (sifrauloge, jmbg) => {
    try {
      const response = await fetch(
        `http://localhost:5000/rn-angazovanje/${editBrojrn}/${jmbg}/${sifrauloge}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Greška pri brisanju angažovanja. ${errorText}`);
      }
      setAngazovanja((prev) =>
        prev.filter(
          (a) => a.uloga.sifrauloge !== sifrauloge && a.zaposleni.jmbg !== jmbg
        )
      );
      setModalData({
        title: "Uspeh",
        message: "Angažovanje je uspešno obrisano.",
        onConfirm: () => setModalOpen(false),
      });
      setModalOpen(true);
    } catch (err) {
      console.error(err.message);
      setModalData({
        title: "Greška",
        message: err.message,
        onConfirm: () => setModalOpen(false),
      });
      setModalOpen(true);
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
        const errorText = await response.text();
        throw new Error(`Greška pri dodavanju angažovanja. ${errorText}`);
      }
      const data = await response.json();
      const novoRNAngazovanje = await fetchRNNagazovanjeById(
        data.brojrn,
        data.jmbg,
        data.sifrauloge
      );
      setAngazovanja((prev) => [...prev, novoRNAngazovanje]);
      setNovoAngazovanje({ sifrauloge: "", jmbg: "" });
      setModalData({
        title: "Uspeh",
        message: "Angažovanje je uspešno dodato.",
        onConfirm: () => setModalOpen(false),
      });
      setModalOpen(true);
    } catch (err) {
      console.error(err.message);
      setModalData({
        title: "Greška",
        message: err.message,
        onConfirm: () => setModalOpen(false),
      });
      setModalOpen(true);
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
                required
              />
              <Input
                type="number"
                name="ostvarenakol"
                value={newNalog.ostvarenakol}
                onChange={handleInputChange}
                label="Ostvarena količina"
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
                required
              />
              <Input
                type="number"
                name="vodenapara"
                value={newNalog.vodenapara}
                onChange={handleInputChange}
                label="Vodena para"
                required
              />
              <Input
                type="number"
                name="elenergija"
                value={newNalog.elenergija}
                onChange={handleInputChange}
                label="Električna energija"
                required
              />
              <Input
                type="number"
                name="ukupnosati"
                value={newNalog.ukupnosati}
                onChange={handleInputChange}
                label="Ukupno sati"
              />
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
              fetchNalogInfo={fetchNalogInfo}
            />
          ))}
        </div>
      )}
      <Modal
        isOpen={modalOpen}
        title={modalData.title}
        message={modalData.message}
        onConfirm={modalData.onConfirm}
        onCancel={modalData.onCancel}
      />
    </div>
  );
};

export default RadniNaloziPage;
