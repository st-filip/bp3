import React from "react";
import PropTypes from "prop-types";
import Button from "./Button";
import { FaEdit, FaTrash } from "react-icons/fa";

const RadniNalogCard = ({ radniNalog, onEdit, onDelete }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md flex flex-col gap-4">
      <div className="flex-1">
        <p className="text-gray-800">Broj: {radniNalog.brojrn}</p>
        <h2 className="text-xl font-semibold">{radniNalog.proizvod.naziv}</h2>
        <p>Status: {radniNalog.status}</p>
        <p>Datum: {new Date(radniNalog.datum).toLocaleDateString()}</p>
        <p>Planirana količina: {radniNalog.planiranakol}</p>
        <p>Ostvarena količina: {radniNalog.ostvarenakol}</p>
      </div>
      <div className="flex flex-col gap-2 mt-4">
        <Button
          text="Izmeni"
          icon={<FaEdit size={20} />}
          onClick={() => onEdit(radniNalog)}
          variant="info"
        />
        <Button
          text="Obriši"
          icon={<FaTrash size={20} />}
          onClick={() => onDelete(radniNalog.brojrn)}
          variant="danger"
        />
      </div>
    </div>
  );
};

RadniNalogCard.propTypes = {
  radniNalog: PropTypes.object.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default RadniNalogCard;
