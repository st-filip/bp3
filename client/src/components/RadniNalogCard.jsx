import React, { useState } from "react";
import PropTypes from "prop-types";
import Button from "./Button";
import { FaEdit, FaTrash, FaInfoCircle } from "react-icons/fa";
import Modal from "./Modal";

const RadniNalogCard = ({ radniNalog, onEdit, onDelete, fetchNalogInfo }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [osnovniPodaci, setOsnovniPodaci] = useState(null);
  const [detaljiPodaci, setDetaljiPodaci] = useState(null);

  const handleModalOpen = async () => {
    const { osnovni, detalji } = await fetchNalogInfo(radniNalog.brojrn);
    console.log(osnovni);
    console.log(detalji);
    setOsnovniPodaci(osnovni);
    setDetaljiPodaci(detalji);
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md flex flex-col gap-4 relative">
      <div className="flex-1">
        <p className="text-gray-800">Broj: {radniNalog.brojrn}</p>
        <h2 className="text-xl font-semibold">{radniNalog.proizvod.naziv}</h2>
        <p>Status: {radniNalog.status}</p>
        <p>Datum: {new Date(radniNalog.datum).toLocaleDateString()}</p>
        <p>Planirana količina: {radniNalog.planiranakol}</p>
        <p>Ostvarena količina: {radniNalog.ostvarenakol}</p>
      </div>

      <div
        className="absolute top-6 right-6 cursor-pointer"
        onClick={handleModalOpen}
      >
        <FaInfoCircle size={24} className="text-gray-600 hover:text-blue-600" />
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
      <Modal
        isOpen={modalOpen}
        title="Podaci o radnom nalogu"
        onCancel={handleModalClose}
        onConfirm={handleModalClose}
        cancelText="Zatvori"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Osnovni podaci */}
          <div className="col-span-1 bg-gray-100 rounded-lg p-4 shadow-sm">
            <h4 className="text-lg font-semibold mb-4 border-b pb-2">
              Osnovni podaci
            </h4>
            {osnovniPodaci ? (
              <div className="space-y-2">
                <p>
                  <strong>Broj: </strong>
                  {osnovniPodaci.brojrn}
                </p>
                <p>
                  <strong>Datum: </strong>
                  {new Date(osnovniPodaci.datum).toLocaleDateString()}
                </p>
                <p>
                  <strong>Šifra pogona: </strong>
                  {osnovniPodaci.sifrapogona}
                </p>
                <p>
                  <strong>Šifra proizvoda: </strong>
                  {osnovniPodaci.sifraproizvoda}
                </p>
              </div>
            ) : (
              <p>Podaci se učitavaju...</p>
            )}
          </div>

          <div className="col-span-1 md:col-span-1 lg:col-span-3 bg-gray-100 rounded-lg p-4 shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <h4 className="text-lg font-semibold mb-4 border-b pb-2">
                  Detalji
                </h4>
                {detaljiPodaci ? (
                  <div className="space-y-2">
                    <p>
                      <strong>Planirana količina: </strong>
                      {detaljiPodaci.planiranakol}
                    </p>
                    <p>
                      <strong>Ostvarena količina: </strong>
                      {detaljiPodaci.ostvarenakol}
                    </p>
                    <p>
                      <strong>Status: </strong>
                      {detaljiPodaci.status}
                    </p>
                  </div>
                ) : (
                  <p>Podaci se učitavaju...</p>
                )}
              </div>

              <div>
                <h4 className="text-lg font-semibold mb-4 border-b pb-2 invisible">
                  Detalji
                </h4>
                {detaljiPodaci ? (
                  <div className="space-y-2">
                    <p>
                      <strong>Voda: </strong>
                      {detaljiPodaci.voda}
                    </p>
                    <p>
                      <strong>Vodena para: </strong>
                      {detaljiPodaci.vodenapara}
                    </p>
                    <p>
                      <strong>Električna energija: </strong>
                      {detaljiPodaci.elenergija}
                    </p>
                  </div>
                ) : (
                  <p>Podaci se učitavaju...</p>
                )}
              </div>

              <div>
                <h4 className="text-lg font-semibold mb-4 border-b pb-2 invisible">
                  Detalji
                </h4>
                {detaljiPodaci ? (
                  <div className="space-y-2">
                    <p>
                      <strong>Broj tehnološkog postupka: </strong>
                      {detaljiPodaci.brojtp}
                    </p>
                    <p>
                      <strong>Broj tehničke specifikacije: </strong>
                      {detaljiPodaci.brojts}
                    </p>
                    <p>
                      <strong>Ukupno sati: </strong>
                      {detaljiPodaci.ukupnosati}
                    </p>
                  </div>
                ) : (
                  <p>Podaci se učitavaju...</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

RadniNalogCard.propTypes = {
  radniNalog: PropTypes.object.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  fetchNalogInfo: PropTypes.func.isRequired,
};

export default RadniNalogCard;
