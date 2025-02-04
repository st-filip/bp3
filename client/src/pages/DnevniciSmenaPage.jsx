import React, { useState, useEffect } from "react";
import Button from "../components/Button";
import Input from "../components/Input";
import Select from "../components/Select";
import { FaPlus, FaEdit, FaTrash, FaTimes } from "react-icons/fa";

const DnevniciSmenaPage = () => {
  const [dnevniciSmena, setDnevniciSmena] = useState([]);
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [newDnevnikSmene, setNewDnevnikSmene] = useState({
    datum: "",
    brojrn: "",
    sifrapogona: "",
  });
  const [radniNalozi, setRadniNalozi] = useState([]);
  const [editBrojds, setEditBrojds] = useState(undefined);

  const fetchDnevniciSmena = async () => {
    const response = await fetch("http://localhost:5000/dnevnik-smene");
    const data = await response.json();
    setDnevniciSmena(data);
  };

  const fetchRadniNalozi = async () => {
    const response = await fetch("http://localhost:5000/radni-nalog");
    const data = await response.json();
    setRadniNalozi(data);
  };

  const fetchDnevnikSmeneById = async (brojds) => {
    try {
      const response = await fetch(
        `http://localhost:5000/dnevnik-smene/${brojds}`
      );
      if (!response.ok) {
        throw new Error("Greška pri dobijanju dnevnika smene");
      }
      const data = await response.json();
      return data;
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    fetchDnevniciSmena();
    fetchRadniNalozi();
  }, []);

  const handleAddSmena = async (event) => {
    event.preventDefault();
    const selectedNalog = radniNalozi.find(
      (nalog) => nalog.brojrn == newDnevnikSmene.brojrn
    );
    await setNewDnevnikSmene({
      ...newDnevnikSmene,
      sifrapogona: selectedNalog.proizvodnipogon.sifrapogona,
    });

    try {
      if (isEditing) {
        const response = await fetch(
          `http://localhost:5000/dnevnik-smene/${editBrojds}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(newDnevnikSmene),
          }
        );

        if (!response.ok) {
          throw new Error("Greška pri ažuriranju dnevnika smene");
        }

        const updatedDnevnikSmene = await fetchDnevnikSmeneById(editBrojds);

        setDnevniciSmena((prev) =>
          prev.map((ds) =>
            ds.brojds === editBrojds ? updatedDnevnikSmene : ds
          )
        );

        alert("Dnevnik smene je uspešno ažuriran.");
      } else {
        const response = await fetch("http://localhost:5000/dnevnik-smene", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newDnevnikSmene),
        });

        if (!response.ok) {
          throw new Error("Greška pri dodavanju dnevnika smene");
        }

        const data = await response.json();
        const addedDnevnik = await fetchDnevnikSmeneById(data.brojds);

        setDnevniciSmena((prev) => [...prev, addedDnevnik]);

        alert("Dnevnik smene je uspešno dodat.");

        setIsAdding(false);
        setIsEditing(false);
        setNewDnevnikSmene({ datum: "", brojrn: "", sifrapogona: "" });
      }
    } catch (err) {
      console.error(err.message);
      alert("Došlo je do greške: " + err.message);
    }
  };

  const handleEdit = async (ds) => {
    console.log(ds);
    const formattedDate = formatDate(ds.datum);
    setNewDnevnikSmene({
      datum: formattedDate,
      brojrn: ds.brojrn,
      sifrapogona: ds.proizvodnipogon.sifrapogona,
    });
    setEditBrojds(ds.brojds);
    setIsAdding(true);
    setIsEditing(true);
  };

  const handleDelete = async (brojds) => {
    const confirmDelete = window.confirm(
      "Da li ste sigurni da želite da obrišete ovaj dnevnik smene?"
    );
    if (!confirmDelete) return;

    try {
      const response = await fetch(
        `http://localhost:5000/dnevnik-smene/${brojds}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        throw new Error("Greška pri brisanju dnevnika smene");
      }
      setDnevniciSmena((prev) =>
        prev.filter((dnevnikSmene) => dnevnikSmene.brojds !== brojds)
      );
      alert("Dnevnik smene je uspešno obrisan.");
    } catch (err) {
      console.error(err.message);
      alert("Došlo je do greške pri brisanju.");
    }
  };

  const handleCancel = () => {
    setIsAdding(false);
    setIsEditing(false);
    setNewDnevnikSmene({
      datum: "",
      brojrn: "",
      sifrapogona: "",
    });
  };

  const groupedDnevnici = dnevniciSmena.reduce((acc, smena) => {
    if (!acc[smena.brojrn]) {
      acc[smena.brojrn] = [];
    }
    acc[smena.brojrn].push(smena);
    acc[smena.brojrn].sort((a, b) => new Date(a.datum) - new Date(b.datum));
    return acc;
  }, {});

  const formatDate = (date) => {
    const newDate = new Date(date);
    newDate.setMinutes(newDate.getMinutes() - newDate.getTimezoneOffset());
    return newDate.toISOString().split("T")[0];
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Dnevnici smena</h1>
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
          onSubmit={handleAddSmena}
          className="bg-white p-6 rounded-lg shadow-md mb-6"
        >
          <h2 className="text-xl font-semibold mb-4">
            {isEditing
              ? "Izmeni dnevnik smene " + editBrojds
              : "Dodaj novi dnevnik smene"}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              type="date"
              name="datum"
              value={newDnevnikSmene.datum}
              onChange={(e) => {
                setNewDnevnikSmene((prev) => ({
                  ...prev,
                  datum: e.target.value,
                }));
              }}
              label="Datum"
              required
            />
            <Select
              name="brojrn"
              value={newDnevnikSmene.brojrn}
              onChange={(e) => {
                setNewDnevnikSmene((prev) => ({
                  ...prev,
                  brojrn: e.target.value,
                }));
              }}
              label="Radni nalog"
              options={radniNalozi.map((nalog) => ({
                value: nalog.brojrn,
                label:
                  nalog.brojrn + " | " + nalog.proizvodnipogon.naziv_pogona,
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
              <th className="px-4 py-3 border-b">Radni nalog</th>
              <th className="px-4 py-3 border-b">Broj dnevnika</th>
              <th className="px-4 py-3 border-b">Datum</th>
              <th className="px-4 py-3 border-b"></th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(groupedDnevnici).map(([brojrn, dsmene]) => (
              <React.Fragment key={brojrn}>
                <tr className="bg-gray-200">
                  <td className="px-4 py-3 font-bold text-gray-800">
                    Broj: {brojrn} | {dsmene[0].proizvodnipogon.naziv_pogona}
                  </td>
                  <td colSpan="3"></td>
                </tr>
                {dsmene.map((dsmena, index) => (
                  <tr
                    key={dsmena.brojds}
                    className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                  >
                    <td className="px-4 py-3"></td>
                    <td className="px-4 py-3">{dsmena.brojds}</td>
                    <td className="px-4 py-3">{formatDate(dsmena.datum)}</td>
                    <td className="px-4 py-3 flex justify-end">
                      <Button
                        icon={<FaEdit size={20} />}
                        onClick={() => handleEdit(dsmena)}
                        variant="info"
                        className="mr-2"
                      />
                      <Button
                        icon={<FaTrash size={20} />}
                        onClick={() => handleDelete(dsmena.brojds)}
                        variant="danger"
                      />
                    </td>
                  </tr>
                ))}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DnevniciSmenaPage;
