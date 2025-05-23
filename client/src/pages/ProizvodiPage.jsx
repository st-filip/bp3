import React, { useState, useEffect } from "react";
import Button from "../components/Button";
import Input from "../components/Input";
import Select from "../components/Select";
import { FaPlus, FaTimes, FaTrash, FaEdit, FaSearch } from "react-icons/fa";

const ProizvodiPage = () => {
  const [proizvodi, setProizvodi] = useState([]);
  const [filteredProizvodi, setFilteredProizvodi] = useState([]);
  const [isAdding, setIsAdding] = useState(false);
  const [newProizvod, setNewProizvod] = useState({
    naziv: "",
    sifrajm: "",
    sifratp: "",
  });
  const [tipoviProizvoda, setTipoviProizvoda] = useState([]);
  const [jediniceMere, setJediniceMere] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingProizvodId, setEditingProizvodId] = useState(null);
  const [searchNaziv, setSearchNaziv] = useState("");
  const [selectedJedinicaMere, setSelectedJedinicaMere] = useState("");

  const fetchProizvodi = async () => {
    try {
      const response = await fetch("http://localhost:5000/proizvod");
      if (!response.ok) {
        throw new Error("Greška pri dobijanju proizvoda");
      }
      const data = await response.json();
      setProizvodi(data);
      setFilteredProizvodi(data);
    } catch (err) {
      console.error(err.message);
    }
  };

  const fetchTipoviProizvoda = async () => {
    try {
      const response = await fetch("http://localhost:5000/tip-proizvoda");
      if (!response.ok) {
        throw new Error("Greška pri dobijanju tipova proizvoda");
      }
      const data = await response.json();
      setTipoviProizvoda(data);
    } catch (err) {
      console.error(err.message);
    }
  };

  const fetchJediniceMere = async () => {
    try {
      const response = await fetch("http://localhost:5000/jedinica-mere");
      if (!response.ok) {
        throw new Error("Greška pri dobijanju jedinica mere");
      }
      const data = await response.json();
      setJediniceMere(data);
    } catch (err) {
      console.error(err.message);
    }
  };

  const fetchProizvodById = async (sifraproizvoda) => {
    try {
      const response = await fetch(
        `http://localhost:5000/proizvod/${sifraproizvoda}`
      );
      if (!response.ok) {
        throw new Error("Greška pri dobijanju proizvoda");
      }
      const data = await response.json();
      return data;
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchProizvodi();
    fetchTipoviProizvoda();
    fetchJediniceMere();
  }, []);

  const handleAddProizvod = async (event) => {
    event.preventDefault();
    try {
      if (isEditing) {
        const response = await fetch(
          `http://localhost:5000/proizvod/${editingProizvodId}`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newProizvod),
          }
        );
        if (!response.ok) {
          throw new Error("Greška pri ažuriranju proizvoda");
        }

        const editedProizvod = await fetchProizvodById(editingProizvodId);

        setProizvodi((prev) =>
          prev.map((proizvod) =>
            proizvod.sifraproizvoda === editingProizvodId
              ? editedProizvod
              : proizvod
          )
        );
        setFilteredProizvodi((prev) =>
          prev.map((proizvod) =>
            proizvod.sifraproizvoda === editingProizvodId
              ? editedProizvod
              : proizvod
          )
        );

        alert("Proizvod je uspešno ažuriran.");
      } else {
        const response = await fetch("http://localhost:5000/proizvod", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newProizvod),
        });
        if (!response.ok) {
          throw new Error("Greška pri dodavanju proizvoda");
        }
        const data = await response.json();
        const addedProizvod = await fetchProizvodById(data.sifraproizvoda);
        setProizvodi((prev) => [...prev, addedProizvod]);
        handleSearch();
        setNewProizvod({
          naziv: "",
          sifrajm: "",
          sifratp: "",
        });
        setIsAdding(false);
        setIsEditing(false);
        alert("Proizvod je uspešno dodat.");
      }
    } catch (err) {
      console.error(err.message);
      alert("Došlo je do greške: " + err.message);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Da li ste sigurni da želite da obrišete ovaj proizvod?"
    );
    if (!confirmDelete) return;

    try {
      const response = await fetch(`http://localhost:5000/proizvod/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Greška pri brisanju proizvoda");
      }
      setProizvodi((prev) =>
        prev.filter((proizvod) => proizvod.sifraproizvoda !== id)
      );
      setFilteredProizvodi((prev) =>
        prev.filter((proizvod) => proizvod.sifraproizvoda !== id)
      );
      alert("Proizvod je uspešno obrisan.");
    } catch (err) {
      console.error(err.message);
      alert("Došlo je do greške pri brisanju.");
    }
  };

  const handleEdit = (proizvod) => {
    setIsAdding(true);
    setIsEditing(true);
    setEditingProizvodId(proizvod.sifraproizvoda);
    setNewProizvod({
      naziv: proizvod.naziv,
      sifrajm: proizvod.jedinicamere.sifrajm,
      sifratp: proizvod.tipproizvoda.sifratp,
    });
  };

  const handleCancel = () => {
    setIsAdding(false);
    setIsEditing(false);
    setNewProizvod({
      naziv: "",
      sifrajm: "",
      sifratp: "",
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProizvod((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSearch = async () => {
    try {
      let searchUrl = "http://localhost:5000/proizvod/search?";
      if (searchNaziv) {
        searchUrl += `naziv=${encodeURIComponent(searchNaziv)}&`;
      }
      if (selectedJedinicaMere) {
        searchUrl += `nazivjm=${encodeURIComponent(selectedJedinicaMere)}&`;
      }

      if (searchUrl.endsWith("&")) {
        searchUrl = searchUrl.slice(0, -1);
      }

      const response = await fetch(searchUrl);
      if (!response.ok) {
        throw new Error("Greška pri pretrazi proizvoda");
      }
      const data = await response.json();
      setFilteredProizvodi(data);
    } catch (err) {
      console.error(err.message);
      alert("Došlo je do greške pri pretrazi.");
    }
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Proizvodi</h1>
        <div className="flex items-center space-x-2">
          {/* Polje za pretragu */}
          <Input
            name="nazivSearch"
            type="text"
            placeholder="Naziv proizvoda"
            value={searchNaziv}
            onChange={(e) => setSearchNaziv(e.target.value)}
          />
          <Select
            name="nazivjmSearch"
            value={selectedJedinicaMere}
            onChange={(e) => setSelectedJedinicaMere(e.target.value)}
            option1="jedinicu mere"
            options={jediniceMere.map((jm) => ({
              value: jm.naziv,
              label: jm.naziv,
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
        <form
          onSubmit={handleAddProizvod}
          className="bg-white p-6 rounded-lg shadow-md mb-6"
        >
          <h2 className="text-xl font-semibold mb-4">
            {isEditing ? "Izmeni proizvod" : "Dodaj novi proizvod"}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              type="text"
              name="naziv"
              value={newProizvod.naziv}
              onChange={handleInputChange}
              label="Naziv proizvoda"
              required
            />
            <Select
              name="sifrajm"
              value={newProizvod.sifrajm}
              onChange={handleInputChange}
              label="Jedinica mere"
              option1="jedinicu mere"
              options={jediniceMere.map((jm) => ({
                value: jm.sifrajm,
                label: jm.naziv,
              }))}
              required
            />
            <Select
              name="sifratp"
              value={newProizvod.sifratp}
              onChange={handleInputChange}
              label="Tip proizvoda"
              options={tipoviProizvoda.map((tp) => ({
                value: tp.sifratp,
                label: tp.naziv,
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
      )}

      <div className="overflow-x-auto shadow-md rounded-xl border border-gray-300">
        <table className="w-full text-sm text-left text-gray-700">
          <thead className="bg-gray-100 text-gray-900 uppercase text-xs">
            <tr>
              <th className="px-4 py-3 border-b">Naziv proizvoda</th>
              <th className="px-4 py-3 border-b">Jedinica mere</th>
              <th className="px-4 py-3 border-b">Tip proizvoda</th>
              <th className="px-4 py-3 border-b"></th>
            </tr>
          </thead>
          <tbody>
            {filteredProizvodi.map((proizvod, index) => (
              <tr
                key={proizvod.sifraproizvoda}
                className={`${
                  index % 2 === 0 ? "bg-white" : "bg-gray-50"
                } hover:bg-gray-100 transition-colors`}
              >
                <td className="px-4 py-3">{proizvod.naziv}</td>
                <td className="px-4 py-3">{proizvod.jedinicamere.nazivjm}</td>
                <td className="px-4 py-3">{proizvod.tipproizvoda.nazivtp}</td>
                <td className="px-4 py-3 flex justify-end">
                  <Button
                    icon={<FaEdit size={20} />}
                    onClick={() => handleEdit(proizvod)}
                    variant="info"
                    className="mr-2"
                  />
                  <Button
                    icon={<FaTrash size={20} />}
                    onClick={() => handleDelete(proizvod.sifraproizvoda)}
                    variant="danger"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProizvodiPage;
