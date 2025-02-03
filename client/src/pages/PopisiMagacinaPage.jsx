import React, { useState, useEffect } from "react";
import Button from "../components/Button";
import Input from "../components/Input";
import { FaLongArrowAltDown, FaPlus, FaTimes, FaTrash } from "react-icons/fa";
import Select from "../components/Select";

const PopisiMagacinaPage = () => {
  const [popisi, setPopisi] = useState([]);
  const [isAdding, setIsAdding] = useState(false);
  const [newPopis, setNewPopis] = useState({ siframagacina: "", datum: "" });
  const [magacini, setMagacini] = useState([]);

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
      if (!response.ok) throw new Error("Greška pri dodavanju popisa");
      const data = await response.json();
      const addedPopis = await fetchPopisById(
        data.siframagacina,
        formattedDate
      );
      setPopisi((prev) => [...prev, addedPopis]);
      alert("Popis je uspešno dodat.");
    } catch (err) {
      console.error(err.message);
      alert("Došlo je do greške: " + err.message);
    }
  };

  const handleDelete = async (siframagacina, datum) => {
    const confirmDelete = window.confirm(
      "Da li ste sigurni da želite da obrišete ovaj popis?"
    );
    if (!confirmDelete) return;

    const formattedDate = formatDate(datum); // Format the date before sending

    try {
      const response = await fetch(
        `http://localhost:5000/popisna-lista/${siframagacina}/${formattedDate}`,
        { method: "DELETE" }
      );
      if (!response.ok) throw new Error("Greška pri brisanju popisa");
      setPopisi((prev) =>
        prev.filter(
          (popis) =>
            popis.siframagacina !== siframagacina &&
            formatDate(popis.datum) !== formattedDate
        )
      );
      alert("Popis je uspešno obrisan.");
    } catch (err) {
      console.error(err.message);
      alert("Došlo je do greške pri brisanju.");
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

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Popisi Magacina</h1>
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
              onClick={() => setIsAdding(false)}
              variant="danger"
            />
          )}
        </div>
      </div>

      {isAdding && (
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
                      className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                    >
                      <td className="px-4 py-3"></td>
                      <td className="px-4 py-3"></td>
                      <td className="px-4 py-3">
                        {new Date(popis.datum).toLocaleDateString()}
                      </td>
                      <td className="px-4 py-3 flex justify-end">
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
    </div>
  );
};

export default PopisiMagacinaPage;
