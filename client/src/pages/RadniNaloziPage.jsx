import React, { useState, useEffect } from "react";
import RadniNalogCard from "../components/RadniNalogCard";

const RadniNaloziPage = () => {
  const [radniNalozi, setRadniNalozi] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRadniNalozi = async () => {
      try {
        const response = await fetch("http://localhost:5000/radni-nalog");
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        setRadniNalozi(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRadniNalozi();
  }, []);

  const handleEdit = (id) => {
    console.log(`Edit radni nalog with ID: ${id}`);
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
        throw new Error("Failed to delete radni nalog");
      }
      setRadniNalozi((prev) => prev.filter((nalog) => nalog.brojrn !== id));
      alert("Radni nalog je uspešno obrisan.");
    } catch (err) {
      console.error(err.message);
      alert("Došlo je do greške pri brisanju.");
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Radni Nalozi</h1>
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
    </div>
  );
};

export default RadniNaloziPage;
