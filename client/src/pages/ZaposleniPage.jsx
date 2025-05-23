import React, { useState, useEffect } from "react";
import Button from "../components/Button";
import Input from "../components/Input";
import Select from "../components/Select";
import Modal from "../components/Modal";
import { FaPlus, FaTimes, FaTrash, FaEdit, FaSearch } from "react-icons/fa";

const ZaposleniPage = () => {
  const [zaposleni, setZaposleni] = useState([]);
  const [filteredZaposleni, setFilteredZaposleni] = useState([]);
  const [isAdding, setIsAdding] = useState(false);
  const [newZaposleni, setnewZaposleni] = useState({
    imeprezime: "",
    jmbg: "",
    nazivtipazaposlenog: "",
  });
  const [tipovi, setTipovi] = useState([]);
  const [newType, setNewType] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editingZaposleniId, setEditingZaposleniId] = useState(null);
  const [searchImePrezime, setSearchImePrezime] = useState("");
  const [selectedNazivTipaZaposlenog, setSelectedNazivTipaZaposlenog] =
    useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState({
    title: "",
    message: "",
    onConfirm: null,
    onCancel: null,
  });

  const fetchZaposleni = async () => {
    try {
      const response = await fetch("http://localhost:5000/zaposleni");
      if (!response.ok) {
        throw new Error("Greška pri dobijanju zaposlenih");
      }
      const data = await response.json();
      setZaposleni(data);
      setFilteredZaposleni(data);
    } catch (err) {
      console.error(err.message);
    }
  };

  const fetchNaziviTipaZaposlenog = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/zaposleni/tip-zaposlenog"
      );
      if (!response.ok) {
        throw new Error("Greška pri dobijanju naziva tipa zaposlenog");
      }
      const data = await response.json();
      setTipovi(data);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    fetchZaposleni();
    fetchNaziviTipaZaposlenog();
  }, []);

  const handleAddType = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(
        "http://localhost:5000/zaposleni/tip-zaposlenog",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ naziv: newType }),
        }
      );
      if (!response.ok) {
        const errorJson = await response.json();
        throw new Error(errorJson.message || "Došlo je do greške.");
      }
      const data = await response.json();
      fetchNaziviTipaZaposlenog();
      setNewType("");
      setModalData({
        title: "Uspeh",
        message: "Tip zaposlenog je uspešno dodat.",
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

  const handleAddZaposleni = async (event) => {
    event.preventDefault();
    try {
      if (isEditing) {
        const response = await fetch(
          `http://localhost:5000/zaposleni/${editingZaposleniId}`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newZaposleni),
          }
        );
        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Greška pri ažuriranju zaposlenog. ${errorText}`);
        }

        setZaposleni((prev) =>
          prev.map((zaposleni) =>
            zaposleni.jmbg === editingZaposleniId ? newZaposleni : zaposleni
          )
        );
        setFilteredZaposleni((prev) =>
          prev.map((zaposleni) =>
            zaposleni.jmbg === editingZaposleniId ? newZaposleni : zaposleni
          )
        );
        setModalData({
          title: "Uspeh",
          message: "Zaposleni je uspešno ažuriran.",
          onConfirm: () => setModalOpen(false),
        });
        setModalOpen(true);
      } else {
        const response = await fetch("http://localhost:5000/zaposleni", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newZaposleni),
        });
        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Greška pri dodavanju zaposlenog. ${errorText}`);
        }
        const data = await response.json();
        setZaposleni((prev) => [...prev, data]);
        handleSearch();
        setIsAdding(false);
        setIsEditing(false);
        setnewZaposleni({
          imeprezime: "",
          jmbg: "",
          nazivtipazaposlenog: "",
        });
        setModalData({
          title: "Uspeh",
          message: "Zaposleni je uspešno dodat.",
          onConfirm: () => setModalOpen(false),
        });
        setModalOpen(true);
      }
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

  const handleDelete = (id) => {
    setModalData({
      title: "Potvrda brisanja",
      message: "Da li ste sigurni da želite da obrišete ovog zaposlenog?",
      onConfirm: () => {
        deleteZaposleni(id);
        setModalOpen(false);
      },
      onCancel: () => setModalOpen(false),
    });
    setModalOpen(true);
  };

  const deleteZaposleni = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/zaposleni/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Greška pri brisanju zaposlenog. ${errorText}`);
      }
      setZaposleni((prev) => prev.filter((zaposleni) => zaposleni.jmbg !== id));
      setFilteredZaposleni((prev) =>
        prev.filter((zaposleni) => zaposleni.jmbg !== id)
      );
      setModalData({
        title: "Uspeh",
        message: "Zaposleni je uspešno obrisan.",
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

  const handleEdit = (zaposleni) => {
    setIsAdding(true);
    setIsEditing(true);
    setEditingZaposleniId(zaposleni.jmbg);
    setnewZaposleni({
      imeprezime: zaposleni.imeprezime,
      jmbg: zaposleni.jmbg,
      nazivtipazaposlenog: zaposleni.nazivtipazaposlenog,
    });
  };

  const handleCancel = () => {
    setIsAdding(false);
    setIsEditing(false);
    setnewZaposleni({
      imeprezime: "",
      jmbg: "",
      nazivtipazaposlenog: "",
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setnewZaposleni((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSearch = async () => {
    try {
      let searchUrl = "http://localhost:5000/zaposleni/search?";
      if (searchImePrezime) {
        searchUrl += `imeprezime=${encodeURIComponent(searchImePrezime)}&`;
      }
      if (selectedNazivTipaZaposlenog) {
        searchUrl += `nazivtipazaposlenog=${encodeURIComponent(
          selectedNazivTipaZaposlenog
        )}&`;
      }

      if (searchUrl.endsWith("&")) {
        searchUrl = searchUrl.slice(0, -1);
      }

      const response = await fetch(searchUrl);
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Greška pri pretrazi zaposlenih. ${errorText}`);
      }
      const data = await response.json();
      setFilteredZaposleni(data);
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

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Zaposleni</h1>
        <div className="flex items-center space-x-2">
          {/* Polje za pretragu */}
          <Input
            name="imePrezimeSearch"
            type="text"
            placeholder="Ime i prezime"
            value={searchImePrezime}
            onChange={(e) => setSearchImePrezime(e.target.value)}
          />
          <Select
            name="nazivTipaZaposlenogSearch"
            value={selectedNazivTipaZaposlenog}
            onChange={(e) => setSelectedNazivTipaZaposlenog(e.target.value)}
            option1="tip zaposlenog"
            options={tipovi.map((tip) => ({
              value: tip,
              label: tip,
            }))}
          />
          <Button
            icon={<FaSearch size={20} />}
            onClick={handleSearch}
            variant="info"
          />
          {/* Dugme za dodavanje */}
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

      {isAdding && (
        <>
          <form
            onSubmit={handleAddType}
            className="bg-white p-6 rounded-lg shadow-md mb-6"
          >
            <h2 className="text-xl font-semibold mb-4">
              Dodaj novi tip zaposlenog
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                type="text"
                name="newType"
                value={newType}
                onChange={(e) => setNewType(e.target.value)}
                label="Naziv tipa zaposlenog"
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

          <form
            onSubmit={handleAddZaposleni}
            className="bg-white p-6 rounded-lg shadow-md mb-6"
          >
            <h2 className="text-xl font-semibold mb-4">
              {isEditing ? "Izmeni zaposlenog" : "Dodaj novog zaposlenog"}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                type="text"
                name="imeprezime"
                value={newZaposleni.imeprezime}
                onChange={handleInputChange}
                label="Ime i prezime"
                required
              />
              {!isEditing && (
                <Input
                  type="text"
                  name="jmbg"
                  value={newZaposleni.jmbg}
                  onChange={handleInputChange}
                  label="JMBG"
                  required
                />
              )}
              <Select
                name="nazivtipazaposlenog"
                value={newZaposleni.nazivtipazaposlenog}
                onChange={handleInputChange}
                label="Tip zaposlenog"
                options={tipovi.map((tip) => ({
                  value: tip,
                  label: tip,
                }))}
                required
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
        </>
      )}

      <div className="overflow-x-auto shadow-md rounded-xl border border-gray-300">
        <table className="w-full text-sm text-left text-gray-700">
          <thead className="bg-gray-100 text-gray-900 uppercase text-xs">
            <tr>
              <th className="px-4 py-3 border-b">Ime i prezime</th>
              <th className="px-4 py-3 border-b">JMBG</th>
              <th className="px-4 py-3 border-b">Tip zaposlenog</th>
              <th className="px-4 py-3 border-b"></th>
            </tr>
          </thead>
          <tbody>
            {filteredZaposleni.map((zaposleni, index) => (
              <tr
                key={zaposleni.jmbg}
                className={`${
                  index % 2 === 0 ? "bg-white" : "bg-gray-50"
                } hover:bg-gray-100 transition-colors`}
              >
                <td className="px-4 py-3">{zaposleni.imeprezime}</td>
                <td className="px-4 py-3">{zaposleni.jmbg}</td>
                <td className="px-4 py-3">{zaposleni.nazivtipazaposlenog}</td>
                <td className="px-4 py-3 flex justify-end">
                  <Button
                    icon={<FaEdit size={20} />}
                    onClick={() => handleEdit(zaposleni)}
                    variant="info"
                    className="mr-2"
                  />
                  <Button
                    icon={<FaTrash size={20} />}
                    onClick={() => handleDelete(zaposleni.jmbg)}
                    variant="danger"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
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

export default ZaposleniPage;
