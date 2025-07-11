import React, { useState, useEffect } from "react";
import Button from "../components/Button";
import Input from "../components/Input";
import { FaEdit, FaPlus, FaTimes, FaTrash } from "react-icons/fa";
import Select from "../components/Select";
import Modal from "../components/Modal";

const PopisiMagacinaPage = () => {
  const [popisi, setPopisi] = useState([]);
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [newPopis, setNewPopis] = useState({ siframagacina: "", datum: "" });
  const [magacini, setMagacini] = useState([]);
  const [stavke, setStavke] = useState([]);
  const [editingPopis, setEditingPopis] = useState(undefined);
  const [proizvodi, setProizvodi] = useState([]);
  const [newStavka, setNewStavka] = useState({
    siframagacina: "",
    datum: "",
    kolicina: "",
    sifraproizvoda: "",
  });
  const [modalOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState({
    title: "",
    message: "",
    onConfirm: null,
    onCancel: null,
  });
  const [selectedYear, setSelectedYear] = useState("");
  const [popisiByYear, setPopisiByYear] = useState([]);
  const [countByYear, setCountByYear] = useState(0);

  const fetchPopisiByYear = async (year) => {
    try {
      const response = await fetch(
        `http://localhost:5000/popisna-lista/godina/${year}`
      );
      if (!response.ok) {
        throw new Error("Greška pri dobijanju popisa za godinu");
      }
      const data = await response.json();
      setPopisiByYear(data);
    } catch (err) {
      console.error(err.message);
      setPopisiByYear([]);
    }
  };

  const fetchCountByYear = async (year) => {
    try {
      const response = await fetch(
        `http://localhost:5000/popisna-lista/godina/${year}/count`
      );
      if (!response.ok) throw new Error("Greška pri dobijanju broja popisa");
      const data = await response.json();
      setCountByYear(data.count);
    } catch (err) {
      console.error(err.message);
      setCountByYear(0);
    }
  };

  const fetchPopisi = async () => {
    try {
      const response = await fetch("http://localhost:5000/popisna-lista");
      if (!response.ok) {
        throw new Error("Greška pri dobijanju popisa");
      }
      const data = await response.json();
      setPopisi(data);
    } catch (err) {
      console.error(err.message);
    }
  };

  const fetchMagacini = async () => {
    try {
      const response = await fetch("http://localhost:5000/magacin");
      if (!response.ok) {
        throw new Error("Greška pri dobijanju magacina");
      }
      const data = await response.json();
      setMagacini(data);
    } catch (err) {
      console.error(err.message);
    }
  };

  const fetchPopisById = async (siframagacina, datum) => {
    try {
      const response = await fetch(
        `http://localhost:5000/popisna-lista/${siframagacina}/${datum}`
      );
      if (!response.ok) {
        throw new Error("Greška pri dobijanju popisa");
      }
      const data = await response.json();
      return data;
    } catch (err) {
      console.error(err.message);
    }
  };

  const fetchStavkeByDatumAndMagacin = async (siframagacina, datum) => {
    try {
      const formattedDate = formatDate(datum);
      const response = await fetch(
        `http://localhost:5000/stavka-pl/${siframagacina}/${formattedDate}`
      );
      if (!response.ok) {
        throw new Error("Greška pri dobijanju stavki");
      }
      const data = await response.json();
      setStavke(data);
    } catch (err) {
      console.error(err.message);
      setStavke([]);
    }
  };

  const fetchProizvodiByTip = async (sifratp) => {
    try {
      const response = await fetch(
        `http://localhost:5000/proizvod/tip/${sifratp}`
      );
      if (!response.ok) {
        throw new Error("Greška pri dobijanju proizvoda");
      }
      const data = await response.json();
      setProizvodi(data);
    } catch (err) {
      console.error(err.message);
    }
  };

  const fetchStavkaById = async (siframagacina, datum, rednibroj) => {
    try {
      const formattedDate = formatDate(datum);
      const response = await fetch(
        `http://localhost:5000/stavka-pl/${siframagacina}/${formattedDate}/${rednibroj}`
      );
      if (!response.ok) {
        throw new Error("Greška pri dobijanju stavke");
      }
      const data = await response.json();
      return data;
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    fetchPopisi();
    fetchMagacini();
  }, []);

  const formatDate = (date) => {
    const newDate = new Date(date);
    newDate.setMinutes(newDate.getMinutes() - newDate.getTimezoneOffset());
    return newDate.toISOString().split("T")[0];
  };

  const handleAddPopis = async (event) => {
    event.preventDefault();
    const formattedDate = formatDate(newPopis.datum);
    try {
      const response = await fetch("http://localhost:5000/popisna-lista", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...newPopis, datum: formattedDate }),
      });
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Greška pri dodavanju popisa. ${errorText}`);
      }
      const data = await response.json();
      const addedPopis = await fetchPopisById(
        data.siframagacina,
        formattedDate
      );
      setPopisi((prev) => [...prev, addedPopis]);
      setModalData({
        title: "Uspeh",
        message: "Popis je uspešno dodat.",
        onConfirm: () => setModalOpen(false),
      });
      fetchPopisiByYear(selectedYear);
      fetchCountByYear(selectedYear);
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

  const handleDelete = (siframagacina, datum) => {
    setModalData({
      title: "Potvrda brisanja",
      message: "Da li ste sigurni da želite da obrišete ovaj popis?",
      onConfirm: () => {
        deletePopis(siframagacina, datum);
        setModalOpen(false);
      },
      onCancel: () => setModalOpen(false),
    });
    setModalOpen(true);
  };

  const deletePopis = async (siframagacina, datum) => {
    const formattedDate = formatDate(datum);
    try {
      const response = await fetch(
        `http://localhost:5000/popisna-lista/${siframagacina}/${formattedDate}`,
        { method: "DELETE" }
      );
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Greška pri brisanju popisa. ${errorText}`);
      }
      setPopisi((prev) =>
        prev.filter(
          (popis) =>
            popis.siframagacina !== siframagacina &&
            formatDate(popis.datum) !== formattedDate
        )
      );
      fetchPopisiByYear(selectedYear);
      fetchCountByYear(selectedYear);
      setModalData({
        title: "Uspeh",
        message: "Popis je uspešno obrisan.",
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPopis((prev) => ({ ...prev, [name]: value }));
  };

  const groupedPopisi = popisi.reduce((acc, popis) => {
    const key = `${popis.magacin.nazivmagacina}-${popis.magacin.tipproizvoda.nazivtp}`;
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(popis);
    return acc;
  }, {});

  Object.keys(groupedPopisi).forEach((key) => {
    groupedPopisi[key].sort((a, b) => new Date(a.datum) - new Date(b.datum));
  });

  const handleCancel = () => {
    setIsAdding(false);
    setIsEditing(false);
    setNewPopis({
      datum: "",
      siframagacina: "",
    });
    setStavke([]);
  };

  const handleEdit = async (popis) => {
    setEditingPopis(popis);
    const formattedDate = formatDate(popis.datum);
    setNewStavka((prev) => ({
      ...prev,
      siframagacina: popis.magacin.siframagacina,
      datum: formattedDate,
    }));
    await fetchStavkeByDatumAndMagacin(
      popis.magacin.siframagacina,
      popis.datum
    );
    setIsAdding(true);
    setIsEditing(true);
    await fetchProizvodiByTip(popis.magacin.tipproizvoda.sifratp);
  };

  const handleDodajStavku = async () => {
    console.log(newStavka);

    try {
      const response = await fetch(`http://localhost:5000/stavka-pl`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newStavka),
      });
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Greška pri dodavanju stavke popisa. ${errorText}`);
      }
      const data = await response.json();
      const formattedDate = formatDate(data.datum);
      const novaStavka = await fetchStavkaById(
        data.siframagacina,
        formattedDate,
        data.rednibroj
      );
      console.log(novaStavka);
      setStavke((prev) => [...prev, novaStavka]);
      console.log(stavke);
      setModalData({
        title: "Uspeh",
        message: "Stavka popisa je uspešno dodata.",
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
    } finally {
      setNewStavka((prev) => ({
        ...prev,
        kolicina: "",
        sifraproizvoda: "",
      }));
    }
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">
          {isEditing
            ? `Popis za ${editingPopis.magacin.nazivmagacina} ${new Date(
                editingPopis.datum
              ).toLocaleDateString()}`
            : "Popisi Magacina"}
        </h1>
        <div className="flex items-center space-x-2">
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
      </div>

      {isAdding && !isEditing && (
        <form
          onSubmit={handleAddPopis}
          className="bg-white p-6 rounded-lg shadow-md mb-6"
        >
          <h2 className="text-xl font-semibold mb-4">Dodaj novi popis</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Select
              name="siframagacina"
              value={newPopis.siframagacina}
              onChange={handleInputChange}
              label="Magacin"
              options={magacini.map((m) => ({
                value: m.siframagacina,
                label: m.naziv + " | " + m.tipproizvoda.nazivtp,
              }))}
              required
            />
            <Input
              type="date"
              name="datum"
              value={newPopis.datum}
              onChange={handleInputChange}
              label="Datum"
              required
            />
          </div>
          <div className="mt-4">
            <Button
              icon={<FaPlus size={20} />}
              type="submit"
              variant="success"
            />
          </div>
        </form>
      )}

      {!isEditing && (
        <>
          <div className="overflow-x-auto shadow-md rounded-xl border border-gray-300">
            <table className="w-full text-sm text-left text-gray-700">
              <thead className="bg-gray-100 text-gray-900 uppercase text-xs">
                <tr>
                  <th className="px-4 py-3 border-b">Magacin</th>
                  <th className="px-4 py-3 border-b">Tip proizvoda</th>
                  <th className="px-4 py-3 border-b">Datum</th>
                  <th className="px-4 py-3 border-b"></th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(groupedPopisi).map(([key, popisi]) => {
                  const [magacinNaziv, tipProizvoda] = key.split("-");
                  return (
                    <React.Fragment key={key}>
                      <tr className="bg-gray-200">
                        <td className="px-4 py-3 font-bold text-gray-800">
                          {magacinNaziv}
                        </td>
                        <td className="px-4 py-3 font-bold text-gray-800">
                          {tipProizvoda}
                        </td>
                        <td colSpan="2"></td>
                      </tr>
                      {popisi.map((popis, index) => (
                        <tr
                          key={`${popis.siframagacina}-${popis.datum}`}
                          className={
                            index % 2 === 0 ? "bg-white" : "bg-gray-50"
                          }
                        >
                          <td className="px-4 py-3"></td>
                          <td className="px-4 py-3"></td>
                          <td className="px-4 py-3">
                            {new Date(popis.datum).toLocaleDateString()}
                          </td>
                          <td className="px-4 py-3 flex justify-end">
                            <Button
                              icon={<FaEdit size={20} />}
                              onClick={() => handleEdit(popis)}
                              variant="info"
                              className="mr-2"
                            />
                            <Button
                              icon={<FaTrash size={20} />}
                              onClick={() =>
                                handleDelete(
                                  popis.magacin.siframagacina,
                                  popis.datum
                                )
                              }
                              variant="danger"
                            />
                          </td>
                        </tr>
                      ))}
                    </React.Fragment>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="flex items-center my-4 gap-4">
            <h1 className="text-2xl font-bold">Popisi za godinu</h1>
            <Select
              name="godina"
              value={selectedYear}
              onChange={(e) => {
                const year = e.target.value;
                setSelectedYear(year);
                if (year) {
                  fetchPopisiByYear(year);
                  fetchCountByYear(year);
                } else {
                  setPopisiByYear([]);
                  setCountByYear(0);
                }
              }}
              option1="godinu"
              options={[
                { value: "2024", label: "2024" },
                { value: "2025", label: "2025" },
              ]}
              className="w-40"
            />
            {selectedYear && (
              <span className="text-gray-700 text-sm">
                Ukupan broj popisa je: <strong>{countByYear}</strong>
              </span>
            )}
          </div>
          <div className="overflow-x-auto shadow-md rounded-xl border border-gray-300">
            {selectedYear && (
              <div className="overflow-x-auto shadow-md rounded-xl border border-gray-300">
                <table className="w-full text-sm text-left text-gray-700">
                  <thead className="bg-gray-100 text-gray-900 uppercase text-xs">
                    <tr>
                      <th className="px-4 py-3 border-b">Magacin</th>
                      <th className="px-4 py-3 border-b">Tip proizvoda</th>
                      <th className="px-4 py-3 border-b">Datum</th>
                      <th className="px-4 py-3 border-b"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {popisiByYear.map((popis, index) => (
                      <tr
                        key={`${popis.magacin?.siframagacina}-${popis.datum}`}
                        className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                      >
                        <td className="px-4 py-3">
                          {popis.magacin?.nazivmagacina}
                        </td>
                        <td className="px-4 py-3">
                          {popis.magacin?.tipproizvoda?.nazivtp}
                        </td>
                        <td className="px-4 py-3">
                          {new Date(popis.datum).toLocaleDateString()}
                        </td>
                        <td className="px-4 py-3 flex justify-end">
                          <Button
                            icon={<FaEdit size={20} />}
                            onClick={() => handleEdit(popis)}
                            variant="info"
                            className="mr-2"
                          />
                          <Button
                            icon={<FaTrash size={20} />}
                            onClick={() =>
                              handleDelete(
                                popis.magacin.siframagacina,
                                popis.datum
                              )
                            }
                            variant="danger"
                          />
                        </td>
                      </tr>
                    ))}
                    {popisiByYear.length === 0 && (
                      <tr>
                        <td colSpan="3" className="px-4 py-3 text-gray-500">
                          Nema podataka za odabranu godinu.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </>
      )}

      {isEditing && (
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleDodajStavku();
            }}
          >
            <h2 className="text-xl font-semibold mb-4">
              Dodaj novu stavku popisa
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Select
                name="sifraproizvoda"
                value={newStavka.sifraproizvoda}
                onChange={(e) =>
                  setNewStavka((prev) => ({
                    ...prev,
                    sifraproizvoda: e.target.value,
                  }))
                }
                label="Proizvod"
                options={proizvodi.map((p) => ({
                  value: p.sifraproizvoda,
                  label: p.naziv,
                }))}
                required
              />
              <Input
                type="number"
                name="kolicina"
                value={newStavka.kolicina}
                onChange={(e) =>
                  setNewStavka((prev) => ({
                    ...prev,
                    kolicina: e.target.value,
                  }))
                }
                label="Količina"
                min={0}
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
          <div className="mt-6">
            <h2 className="text-xl font-semibold my-4">Stavke</h2>
            {stavke.length > 0 ? (
              <div className="overflow-x-auto shadow-md rounded-xl border border-gray-300">
                <table className="w-full text-sm text-left text-gray-700">
                  <thead className="bg-gray-100 text-gray-900 uppercase text-xs">
                    <tr>
                      <th className="px-4 py-3 border-b">Proizvod</th>
                      <th className="px-4 py-3 border-b">Količina</th>
                    </tr>
                  </thead>
                  <tbody>
                    {stavke.map((stavka, index) => (
                      <tr
                        key={index}
                        className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                      >
                        <td className="px-4 py-3">{stavka.proizvod.naziv}</td>
                        <td className="px-4 py-3">{stavka.kolicina}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className=" text-gray-500 text-sm">
                Trenutno ne postoje stavke popisa.
              </div>
            )}
          </div>
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

export default PopisiMagacinaPage;
