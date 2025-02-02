import React, { useState, useEffect } from "react";
import Button from "../components/Button";
import Input from "../components/Input";
import Select from "../components/Select";
import { FaPlus, FaTimes, FaTrash, FaEdit } from "react-icons/fa";

const ZaposleniPage = () => {
  const [zaposleni, setZaposleni] = useState([]);
  const [isAdding, setIsAdding] = useState(false);
  const [newZaposleni, setnewZaposleni] = useState({
    imeprezime: "",
    jmbg: "",
    nazivtipazaposlenog: "",
  });
  const [Tipovi, setTipovi] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingZaposleniId, setEditingZaposleniId] = useState(null);

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
          throw new Error("Greška pri ažuriranju zaposlenog");
        }

        setZaposleni((prev) =>
          prev.map((zaposleni) =>
            zaposleni.jmbg === editingZaposleniId ? newZaposleni : zaposleni
          )
        );

        alert("Zaposleni je uspešno ažuriran.");
      } else {
        const response = await fetch("http://localhost:5000/zaposleni", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newZaposleni),
        });
        if (!response.ok) {
          throw new Error("Greška pri dodavanju zaposlenog");
        }
        const data = await response.json();
        setZaposleni((prev) => [...prev, data]);
        alert("Zaposleni je uspešno dodat.");
      }
    } catch (err) {
      console.error(err.message);
      alert("Došlo je do greške: " + err.message);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Da li ste sigurni da želite da obrišete ovog zaposlenog?"
    );
    if (!confirmDelete) return;

    try {
      const response = await fetch(`http://localhost:5000/zaposleni/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Greška pri brisanju zaposlenog");
      }
      setZaposleni((prev) => prev.filter((zaposleni) => zaposleni.jmbg !== id));
      alert("Zaposleni je uspešno obrisan.");
    } catch (err) {
      console.error(err.message);
      alert("Došlo je do greške pri brisanju.");
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

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Zaposleni</h1>
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
              options={Tipovi.map((tip) => ({
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
            {zaposleni.map((zaposleni, index) => (
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
    </div>
  );
};

export default ZaposleniPage;
