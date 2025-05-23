import React, { useState, useEffect } from "react";
import Button from "../components/Button";
import Input from "../components/Input";
import Select from "../components/Select";
import Modal from "../components/Modal";
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
  const [angazovanja, setAngazovanja] = useState([]);
  const [novoAngazovanje, setNovoAngazovanje] = useState({
    brojds: "",
    sifrauloge: "",
    jmbg: "",
    napomena: "",
    imeprezime: "",
  });
  const [zaposleni, setZaposleni] = useState([]);
  const [uloge, setUloge] = useState([]);
  const [isEditingAngazovanje, setIsEditingAngazovanje] = useState(false);
  const [poslovi, setPoslovi] = useState([]);
  const [isEditingStavka, setIsEditingStavka] = useState(false);
  const [stavke, setStavke] = useState([]);
  const [newStavka, setNewStavka] = useState({
    brojds: "",
    ostvarenakol: "",
    vremeod: "",
    vremedo: "",
    brojradnika: "",
    sifraposla: "",
  });
  const [utroscirs, setUtroscirs] = useState([]);
  const [tipovirs, setTipovirs] = useState([]);
  const [newUrs, setNewUrs] = useState({
    brojds: "",
    jmbg: "",
    sifratrs: "",
    kolicina: "",
  });
  const [isEditingUrs, setIsEditingUrs] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState({
    title: "",
    message: "",
    onConfirm: null,
    onCancel: null,
  });

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

  const fetchPoslovi = async () => {
    try {
      const response = await fetch("http://localhost:5000/posao-proizvodnje");
      if (!response.ok) {
        throw new Error("Greška pri dobijanju poslova proizvodnje");
      }
      const data = await response.json();
      setPoslovi(data);
    } catch (err) {
      console.error(err.message);
    }
  };

  const fetchDSangazovanjeById = async (brojds, jmbg, sifrauloge) => {
    try {
      const response = await fetch(
        `http://localhost:5000/ds-angazovanje/${brojds}/${jmbg}/${sifrauloge}`
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

  const fetchStavkaById = async (brojds, rednibroj) => {
    try {
      const response = await fetch(
        `http://localhost:5000/stavka-pp/${brojds}/${rednibroj}`
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

  const fetchStavkeByBrojDS = async (brojds) => {
    try {
      const response = await fetch(`http://localhost:5000/stavka-pp/${brojds}`);
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

  const fetchUtroscirsByBrojDS = async (brojds) => {
    try {
      const response = await fetch(
        `http://localhost:5000/utrosak-radnih-sati/${brojds}`
      );
      if (!response.ok) {
        throw new Error("Greška pri dobijanju utrošaka radnih sati");
      }
      const data = await response.json();
      setUtroscirs(data);
    } catch (err) {
      console.error(err.message);
      setUtroscirs([]);
    }
  };

  const fetchUrsById = async (brojds, jmbg, sifratrs) => {
    try {
      const response = await fetch(
        `http://localhost:5000/utrosak-radnih-sati/${brojds}/${jmbg}/${sifratrs}`
      );
      if (!response.ok) {
        throw new Error("Greška pri dobijanju utroška radnih sati");
      }
      const data = await response.json();
      return data;
    } catch (err) {
      console.error(err.message);
    }
  };

  const fetchTipovirs = async () => {
    try {
      const response = await fetch("http://localhost:5000/tip-radnih-sati");
      if (!response.ok) {
        throw new Error("Greška pri dobijanju tipova radnih sati");
      }
      const data = await response.json();
      setTipovirs(data);
    } catch (err) {
      console.error(err.message);
    }
  };

  const pivoted = [];

  utroscirs.forEach((entry) => {
    const fullName = entry.zaposleni.imeprezime;
    let existing = pivoted.find((p) => p.zaposleni === fullName);

    if (!existing) {
      existing = {
        zaposleni: fullName,
        _originals: [],
      };
      tipovirs.forEach((tip) => {
        existing[tip.naziv] = "";
      });
      pivoted.push(existing);
    }

    const nazivTipa = tipovirs.find(
      (t) => t.sifratrs === entry.tipradnihsati.sifratrs
    )?.naziv;
    if (nazivTipa) {
      existing[nazivTipa] = entry.kolicina;
    }

    existing._originals.push(entry);
  });

  useEffect(() => {
    fetchDnevniciSmena();
    fetchRadniNalozi();
    fetchZaposleni();
    fetchUloge();
    fetchPoslovi();
    fetchTipovirs();
  }, []);

  const handleAddSmena = async (event) => {
    event.preventDefault();
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
          const errorText = await response.text();
          throw new Error(`Greška pri ažuriranju dnevnika smene. ${errorText}`);
        }

        const updatedDnevnikSmene = await fetchDnevnikSmeneById(editBrojds);

        setDnevniciSmena((prev) =>
          prev.map((ds) =>
            ds.brojds === editBrojds ? updatedDnevnikSmene : ds
          )
        );
        setModalData({
          title: "Uspeh",
          message: "Dnevnik smene je uspešno ažuriran.",
          onConfirm: () => setModalOpen(false),
        });
        setModalOpen(true);
        const selectedNalog = radniNalozi.find(
          (nalog) => nalog.brojrn == newDnevnikSmene.brojrn
        );
        await setNewDnevnikSmene({
          ...newDnevnikSmene,
          sifrapogona: selectedNalog.proizvodnipogon.sifrapogona,
        });
      } else {
        const response = await fetch("http://localhost:5000/dnevnik-smene", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newDnevnikSmene),
        });

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Greška pri dodavanju dnevnika smene. ${errorText}`);
        }

        const data = await response.json();
        const addedDnevnik = await fetchDnevnikSmeneById(data.brojds);

        setDnevniciSmena((prev) => [...prev, addedDnevnik]);

        setModalData({
          title: "Uspeh",
          message: "Dnevnik smene je uspešno dodat.",
          onConfirm: () => setModalOpen(false),
        });
        setModalOpen(true);

        setIsAdding(false);
        setIsEditing(false);
        setNewDnevnikSmene({ datum: "", brojrn: "", sifrapogona: "" });
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

  const handleEdit = async (ds) => {
    console.log(ds);
    const formattedDate = formatDate(ds.datum);
    setNewDnevnikSmene({
      datum: formattedDate,
      brojrn: ds.brojrn,
      sifrapogona: ds.proizvodnipogon.sifrapogona,
    });

    setNovoAngazovanje((prev) => ({
      ...prev,
      brojds: ds.brojds,
    }));

    setNewStavka((prev) => ({
      ...prev,
      brojds: ds.brojds,
    }));

    setNewUrs((prev) => ({
      ...prev,
      brojds: ds.brojds,
    }));

    setEditBrojds(ds.brojds);

    try {
      const response = await fetch(
        `http://localhost:5000/ds-angazovanje/${ds.brojds}`
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

    fetchStavkeByBrojDS(ds.brojds);
    fetchUtroscirsByBrojDS(ds.brojds);

    setIsAdding(true);
    setIsEditing(true);
  };

  const handleDelete = (brojds) => {
    setModalData({
      title: "Potvrda brisanja",
      message: "Da li ste sigurni da želite da obrišete ovaj dnevnik smene?",
      onConfirm: () => {
        deleteDnevnikSmene(brojds);
        setModalOpen(false);
      },
      onCancel: () => setModalOpen(false),
    });
    setModalOpen(true);
  };

  const deleteDnevnikSmene = async (brojds) => {
    try {
      const response = await fetch(
        `http://localhost:5000/dnevnik-smene/${brojds}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Greška pri brisanju dnevnika smene. ${errorText}`);
      }
      setDnevniciSmena((prev) =>
        prev.filter((dnevnikSmene) => dnevnikSmene.brojds !== brojds)
      );
      setModalData({
        title: "Uspeh",
        message: "Dnevnik smene je uspešno obrisan.",
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

  const handleCancel = () => {
    setIsAdding(false);
    setIsEditing(false);
    setNewDnevnikSmene({
      datum: "",
      brojrn: "",
      sifrapogona: "",
    });
    setAngazovanja([]);
    setNovoAngazovanje({
      jmbg: "",
      sifrauloge: "",
      napomena: "",
      imeprezime: "",
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
        `http://localhost:5000/ds-angazovanje/${editBrojds}/${jmbg}/${sifrauloge}`,
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
    if (isEditingAngazovanje) {
      try {
        const response = await fetch(
          `http://localhost:5000/ds-angazovanje/${editBrojds}/${novoAngazovanje.jmbg}/${novoAngazovanje.sifrauloge}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              napomena: novoAngazovanje.napomena,
              imeprezime: novoAngazovanje.imeprezime,
            }),
          }
        );

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Greška pri ažuriranju angažovanja. ${errorText}`);
        }

        const updatedAngazovanje = await fetchDSangazovanjeById(
          editBrojds,
          novoAngazovanje.jmbg,
          novoAngazovanje.sifrauloge
        );

        setAngazovanja((prev) =>
          prev.map((a) =>
            a.uloga.sifrauloge === novoAngazovanje.sifrauloge &&
            a.zaposleni.jmbg === novoAngazovanje.jmbg
              ? updatedAngazovanje
              : a
          )
        );

        setIsEditingAngazovanje(false);
        setNovoAngazovanje((prev) => ({
          ...prev,
          jmbg: "",
          sifrauloge: "",
          napomena: "",
          imeprezime: "",
        }));
        setModalData({
          title: "Uspeh",
          message: "Angažovanje je uspešno ažurirano.",
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
    } else {
      try {
        const response = await fetch(`http://localhost:5000/ds-angazovanje`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(novoAngazovanje),
        });
        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Greška pri dodavanju angažovanja. ${errorText}`);
        }
        const data = await response.json();
        const novoDSAngazovanje = await fetchDSangazovanjeById(
          data.brojds,
          data.jmbg,
          data.sifrauloge
        );
        setAngazovanja((prev) => [...prev, novoDSAngazovanje]);
        setNovoAngazovanje({
          sifrauloge: "",
          jmbg: "",
          napomena: "",
          imeprezime: "",
        });
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
    }
  };

  const handleEditAngazovanje = async (a) => {
    setIsEditingAngazovanje(true);
    setNovoAngazovanje({
      brojds: a.brojds,
      sifrauloge: a.uloga.sifrauloge,
      jmbg: a.jmbg,
      napomena: a.napomena ? a.napomena : "",
      imeprezime: a.imeprezime,
    });
  };

  const handleEditStavka = async (s) => {
    console.log(s);
    setIsEditingStavka(true);
    setNewStavka({
      brojds: s.brojds,
      rednibroj: s.rednibroj,
      vremeod: s.vremeod,
      vremedo: s.vremedo,
      sifraposla: s.posao.sifraposla,
      brojradnika: s.brojradnika,
      ostvarenakol: s.ostvarenakol,
    });
  };

  const handleCancelEditAngazovanje = () => {
    setIsEditingAngazovanje(false);
    setNovoAngazovanje((prev) => ({
      ...prev,
      jmbg: "",
      sifrauloge: "",
      napomena: "",
      imeprezime: "",
    }));
  };

  const handleCancelEditStavka = () => {
    setIsEditingStavka(false);
    setNewStavka((prev) => ({
      ...prev,
      sifraposla: "",
      vremeod: "",
      vremedo: "",
      ostvarenakol: "",
      brojradnika: "",
    }));
  };

  const handleDodajStavku = async () => {
    console.log(newStavka);
    if (isEditingStavka) {
      console.log("Izmena");
      try {
        const response = await fetch(
          `http://localhost:5000/stavka-pp/${editBrojds}/${newStavka.rednibroj}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              ostvarenakol: newStavka.ostvarenakol,
              vremedo: newStavka.vremedo,
              vremeod: newStavka.vremeod,
              sifraposla: newStavka.sifraposla,
              brojradnika: newStavka.brojradnika,
            }),
          }
        );

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(
            `Greška pri ažuriranju stavke posla angažovanja. ${errorText}`
          );
        }

        const updatedStavka = await fetchStavkaById(
          editBrojds,
          newStavka.rednibroj
        );

        setStavke((prev) =>
          prev.map((s) =>
            s.brojds === newStavka.brojds && s.rednibroj === newStavka.rednibroj
              ? updatedStavka
              : s
          )
        );

        setIsEditingStavka(false);
        setNewStavka((prev) => ({
          ...prev,
          ostvarenakol: "",
          vremedo: "",
          vremeod: "",
          sifraposla: "",
          brojradnika: "",
        }));
        setModalData({
          title: "Uspeh",
          message: "Stavka posla je uspešno ažurirana.",
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
    } else {
      try {
        const response = await fetch(`http://localhost:5000/stavka-pp`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newStavka),
        });
        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Greška pri dodavanju stavke posla. ${errorText}`);
        }
        const data = await response.json();
        const novaStavka = await fetchStavkaById(data.brojds, data.rednibroj);
        console.log(novaStavka);
        setStavke((prev) => [...prev, novaStavka]);
        console.log(stavke);
        setModalData({
          title: "Uspeh",
          message: "Stavka posla je uspešno dodata.",
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
          ostvarenakol: "",
          vremedo: "",
          vremeod: "",
          sifraposla: "",
          brojradnika: "",
        }));
      }
    }
  };

  const handleDeleteStavka = (rednibroj) => {
    setModalData({
      title: "Potvrda brisanja",
      message: "Da li ste sigurni da želite da obrišete ovu stavku posla?",
      onConfirm: () => {
        deleteStavka(rednibroj);
        setModalOpen(false);
      },
      onCancel: () => setModalOpen(false),
    });
    setModalOpen(true);
  };

  const deleteStavka = async (rednibroj) => {
    try {
      const response = await fetch(
        `http://localhost:5000/stavka-pp/${editBrojds}/${rednibroj}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Greška pri brisanju stavke posla. ${errorText}`);
      }
      setStavke((prev) => prev.filter((s) => s.rednibroj !== rednibroj));
      setModalData({
        title: "Uspeh",
        message: "Stavka posla je uspešno obrisana.",
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

  const handleAddUrs = async () => {
    console.log(newUrs);
    if (isEditingUrs) {
      console.log("Izmena");
      try {
        const response = await fetch(
          `http://localhost:5000/utrosak-radnih-sati/${editBrojds}/${newUrs.jmbg}/${newUrs.sifratrs}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              kolicina: newUrs.kolicina,
            }),
          }
        );

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(
            `Greška pri ažuriranju utroška radnih sati. ${errorText}`
          );
        }

        const updatedUrs = await fetchUrsById(
          editBrojds,
          newUrs.jmbg,
          newUrs.sifratrs
        );
        console.log(updatedUrs);
        console.log("Previous state:", utroscirs);

        setUtroscirs((prev) =>
          prev.map((urs) =>
            urs.brojds === newUrs.brojds &&
            urs.zaposleni.jmbg === newUrs.jmbg &&
            urs.tipradnihsati.sifratrs === newUrs.sifratrs
              ? updatedUrs
              : urs
          )
        );

        setIsEditingUrs(false);
        setNewUrs((prev) => ({
          ...prev,
          kolicina: "",
          sifratrs: "",
          jmbg: "",
        }));
        setModalData({
          title: "Uspeh",
          message: "Utrošak radnih sati je uspešno ažuriran.",
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
    } else {
      try {
        const response = await fetch(
          `http://localhost:5000/utrosak-radnih-sati`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newUrs),
          }
        );
        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(
            `Greška pri dodavanju utroška radnih sati. ${errorText}`
          );
        }
        const data = await response.json();
        console.log(data);
        const noviUrs = await fetchUrsById(
          data.brojds,
          data.jmbg,
          data.sifratrs
        );
        console.log(noviUrs);
        setUtroscirs((prev) => [...prev, noviUrs]);
        console.log(utroscirs);
        setModalData({
          title: "Uspeh",
          message: "Utrošak radnih sati je uspešno dodat.",
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
        setNewUrs((prev) => ({
          ...prev,
          kolicina: "",
          sifratrs: "",
          jmbg: "",
        }));
      }
    }
  };

  const handleEditUrs = async (urs) => {
    console.log(urs);
    setIsEditingUrs(true);
    setNewUrs({
      brojds: urs.brojds,
      kolicina: urs.kolicina,
      sifratrs: urs.tipradnihsati.sifratrs,
      jmbg: urs.zaposleni.jmbg,
    });
  };

  const handleCancelEditUrs = () => {
    setIsEditingUrs(false);
    setNewStavka((prev) => ({
      ...prev,
      kolicina: "",
      sifratrs: "",
      jmbg: "",
    }));
  };

  const handleDeleteUrs = (urs) => {
    setModalData({
      title: "Potvrda brisanja",
      message:
        "Da li ste sigurni da želite da obrišete ovaj utrošak radnih sati?",
      onConfirm: () => {
        deleteUrs(urs);
        setModalOpen(false);
      },
      onCancel: () => setModalOpen(false),
    });
    setModalOpen(true);
  };

  const deleteUrs = async (urs) => {
    try {
      const response = await fetch(
        `http://localhost:5000/utrosak-radnih-sati/${editBrojds}/${urs.zaposleni.jmbg}/${urs.tipradnihsati.sifratrs}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `Greška pri brisanju utroška radnih sati. ${errorText}`
        );
      }
      setUtroscirs((prev) =>
        prev.filter(
          (u) =>
            !(
              u.brojds === urs.brojds &&
              u.zaposleni.jmbg === urs.zaposleni.jmbg &&
              u.tipradnihsati.sifratrs === urs.tipradnihsati.sifratrs
            )
        )
      );

      setModalData({
        title: "Uspeh",
        message: "Utrošak radnih sati je uspešno obrisan.",
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
        <>
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
                    nalog.brojrn +
                    " | " +
                    nalog.proizvodnipogon.naziv_pogona +
                    " | " +
                    nalog.proizvod.naziv,
                }))}
                required
              />
              {isEditing && (
                <Input
                  type="text"
                  name="sifrapogona"
                  value={newDnevnikSmene.sifrapogona}
                  onChange={(e) => {
                    setNewDnevnikSmene((prev) => ({
                      ...prev,
                      sifrapogona: e.target.value,
                    }));
                  }}
                  label="Šifra pogona"
                  required
                />
              )}
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
            <>
              <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleDodajAngazovanje();
                  }}
                >
                  <h2 className="text-xl font-semibold mb-4">
                    {isEditingAngazovanje
                      ? "Izmeni angažovanje"
                      : "Dodaj novo angažovanje"}
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {!isEditingAngazovanje ? (
                      <>
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
                      </>
                    ) : (
                      <Input
                        type="text"
                        name="imeprezime"
                        value={novoAngazovanje.imeprezime}
                        onChange={(e) => {
                          setNovoAngazovanje((prev) => ({
                            ...prev,
                            imeprezime: e.target.value,
                          }));
                        }}
                        label="Ime i prezime"
                      />
                    )}
                    <Input
                      type="text"
                      name="napomena"
                      value={novoAngazovanje.napomena}
                      onChange={(e) => {
                        setNovoAngazovanje((prev) => ({
                          ...prev,
                          napomena: e.target.value,
                        }));
                      }}
                      label="Napomena"
                    />
                  </div>
                  <div className="mt-4 flex">
                    {isEditingAngazovanje ? (
                      <>
                        <Button
                          type="submit"
                          icon={<FaEdit size={20} />}
                          variant="success"
                          className="mr-2"
                        />
                        <Button
                          type="button"
                          icon={<FaTimes size={20} />}
                          variant="danger"
                          onClick={handleCancelEditAngazovanje}
                        />
                      </>
                    ) : (
                      <Button
                        type="submit"
                        icon={<FaPlus size={20} />}
                        variant="success"
                      />
                    )}
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
                          <th className="px-4 py-3 border-b">Napomena</th>
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
                              {angazovanje.imeprezime}
                            </td>
                            <td className="px-4 py-3">
                              {angazovanje.uloga.nazivuloge}
                            </td>
                            <td className="px-4 py-3">
                              {angazovanje.napomena}
                            </td>
                            <td className="px-4 py-3 flex justify-end">
                              <Button
                                icon={<FaEdit size={20} />}
                                onClick={() =>
                                  handleEditAngazovanje(angazovanje)
                                }
                                variant="info"
                                className="mr-2"
                              />
                              <Button
                                icon={<FaTrash size={20} />}
                                onClick={() =>
                                  handleDeleteAngazovanje(
                                    angazovanje.uloga.sifrauloge,
                                    angazovanje.zaposleni.jmbg
                                  )
                                }
                                variant="danger"
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

              {/* URS */}

              <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleAddUrs();
                  }}
                >
                  <h2 className="text-xl font-semibold mb-4">
                    {isEditingUrs
                      ? "Izmeni utrošak radnih sati"
                      : "Dodaj novi utrošak radnih sati"}
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {!isEditingUrs && (
                      <>
                        <Select
                          name="jmbg"
                          value={newUrs.jmbg}
                          onChange={(e) =>
                            setNewUrs((prev) => ({
                              ...prev,
                              jmbg: e.target.value,
                            }))
                          }
                          label="Zaposleni"
                          option1="zaposlenog"
                          options={zaposleni.map((z) => ({
                            value: z.jmbg,
                            label: z.imeprezime,
                          }))}
                          required
                        />
                        <Select
                          name="sifratrs"
                          value={newUrs.sifratrs}
                          onChange={(e) =>
                            setNewUrs((prev) => ({
                              ...prev,
                              sifratrs: e.target.value,
                            }))
                          }
                          label="Tip radnih sati"
                          options={tipovirs.map((t) => ({
                            value: t.sifratrs,
                            label: t.naziv,
                          }))}
                          required
                        />
                      </>
                    )}
                    <Input
                      type="number"
                      name="kolicina"
                      value={newUrs.kolicina}
                      onChange={(e) =>
                        setNewUrs((prev) => ({
                          ...prev,
                          kolicina: e.target.value,
                        }))
                      }
                      label="Količina (sati)"
                      required
                    />
                  </div>
                  <div className="mt-4 flex">
                    {isEditingUrs ? (
                      <>
                        <Button
                          type="submit"
                          icon={<FaEdit size={20} />}
                          variant="success"
                          className="mr-2"
                        />
                        <Button
                          type="button"
                          icon={<FaTimes size={20} />}
                          variant="danger"
                          onClick={handleCancelEditUrs}
                        />
                      </>
                    ) : (
                      <Button
                        type="submit"
                        icon={<FaPlus size={20} />}
                        variant="success"
                      />
                    )}
                  </div>
                </form>

                <h2 className="text-xl font-semibold my-4">
                  Utrošci radnih sati
                </h2>
                {pivoted.length > 0 ? (
                  <div className="overflow-x-auto shadow-md rounded-xl border border-gray-300">
                    <table className="w-full text-sm text-left text-gray-700">
                      <thead className="bg-gray-100 text-gray-900 uppercase text-xs">
                        <tr>
                          <th className="px-4 py-3 border-b">Zaposleni</th>
                          {tipovirs.map((tip) => (
                            <th
                              key={tip.sifratrs}
                              className="px-4 py-3 border-b"
                            >
                              {tip.naziv}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {pivoted.map((row, idx) => (
                          <tr
                            key={idx}
                            className={`${
                              idx % 2 === 0 ? "bg-white" : "bg-gray-50"
                            } hover:bg-gray-100 transition-colors`}
                          >
                            <td className="px-4 py-3">{row.zaposleni}</td>
                            {tipovirs.map((tip) => {
                              const value = row[tip.naziv];
                              const entry = row._originals.find(
                                (e) => e.tipradnihsati.sifratrs === tip.sifratrs
                              );

                              return (
                                <td key={tip.sifratrs} className="px-4 py-3">
                                  {value !== "0" &&
                                  value !== 0 &&
                                  value !== "" ? (
                                    <div className="flex items-center justify-between">
                                      <span>{value}</span>
                                      <div className="flex gap-1 ml-2">
                                        <Button
                                          icon={<FaEdit size={16} />}
                                          onClick={() => handleEditUrs(entry)}
                                          variant="info"
                                          size="sm"
                                        />
                                        <Button
                                          icon={<FaTrash size={16} />}
                                          onClick={() => handleDeleteUrs(entry)}
                                          variant="danger"
                                          size="sm"
                                        />
                                      </div>
                                    </div>
                                  ) : null}
                                </td>
                              );
                            })}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="text-gray-500 text-sm">
                    Trenutno ne postoje uneti utrošci radnih sati.
                  </div>
                )}
              </div>

              {/* Poslovi */}

              <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleDodajStavku();
                  }}
                >
                  <h2 className="text-xl font-semibold mb-4">
                    {isEditingStavka ? "Izmeni posao" : "Dodaj novi posao"}
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Select
                      name="sifraposla"
                      value={newStavka.sifraposla}
                      onChange={(e) =>
                        setNewStavka((prev) => ({
                          ...prev,
                          sifraposla: e.target.value,
                        }))
                      }
                      label="Posao proizvodnje"
                      options={poslovi.map((posao) => ({
                        value: posao.sifraposla,
                        label: posao.naziv,
                      }))}
                      required
                    />
                    <Input
                      type="number"
                      name="ostvarenakol"
                      value={newStavka.ostvarenakol}
                      onChange={(e) => {
                        setNewStavka((prev) => ({
                          ...prev,
                          ostvarenakol: e.target.value,
                        }));
                      }}
                      label="Ostvarena količina"
                    />
                    <Input
                      type="time"
                      name="vremeod"
                      value={newStavka.vremeod}
                      onChange={(e) => {
                        setNewStavka((prev) => ({
                          ...prev,
                          vremeod: e.target.value,
                        }));
                      }}
                      label="Vreme početka"
                    />
                    <Input
                      type="time"
                      name="vremedo"
                      value={newStavka.vremedo}
                      onChange={(e) => {
                        setNewStavka((prev) => ({
                          ...prev,
                          vremedo: e.target.value,
                        }));
                      }}
                      label="Vreme završetka"
                    />
                    <Input
                      type="number"
                      name="brojradnika"
                      value={newStavka.brojradnika}
                      onChange={(e) => {
                        setNewStavka((prev) => ({
                          ...prev,
                          brojradnika: e.target.value,
                        }));
                      }}
                      label="Broj angažovanih radnika"
                    />
                  </div>
                  <div className="mt-4 flex">
                    {isEditingStavka ? (
                      <>
                        <Button
                          type="submit"
                          icon={<FaEdit size={20} />}
                          variant="success"
                          className="mr-2"
                        />
                        <Button
                          type="button"
                          icon={<FaTimes size={20} />}
                          variant="danger"
                          onClick={handleCancelEditStavka}
                        />
                      </>
                    ) : (
                      <Button
                        type="submit"
                        icon={<FaPlus size={20} />}
                        variant="success"
                      />
                    )}
                  </div>
                </form>

                {/* Prikaz poslova */}

                <h2 className="text-xl font-semibold my-4">
                  Poslovi proizvodnje
                </h2>
                {stavke.length > 0 ? (
                  <div className="overflow-x-auto shadow-md rounded-xl border border-gray-300">
                    <table className="w-full text-sm text-left text-gray-700">
                      <thead className="bg-gray-100 text-gray-900 uppercase text-xs">
                        <tr>
                          <th className="px-4 py-3 border-b">Posao</th>
                          <th className="px-4 py-3 border-b">
                            Ostvarena količina
                          </th>
                          <th className="px-4 py-3 border-b">Vreme početka</th>
                          <th className="px-4 py-3 border-b">
                            Vreme završetka
                          </th>
                          <th className="px-4 py-3 border-b">Broj radnika</th>
                          <th className="px-4 py-3 border-b"></th>
                        </tr>
                      </thead>
                      <tbody>
                        {stavke.map((stavka, index) => (
                          <tr
                            key={`${stavka.brojds}-${stavka.rednibroj}`}
                            className={`${
                              index % 2 === 0 ? "bg-white" : "bg-gray-50"
                            } hover:bg-gray-100 transition-colors`}
                          >
                            <td className="px-4 py-3">{stavka.posao.naziv}</td>
                            <td className="px-4 py-3">{stavka.ostvarenakol}</td>
                            <td className="px-4 py-3">{stavka.vremeod}</td>
                            <td className="px-4 py-3">{stavka.vremedo}</td>
                            <td className="px-4 py-3">{stavka.brojradnika}</td>
                            <td className="px-4 py-3 flex justify-end">
                              <Button
                                icon={<FaEdit size={20} />}
                                onClick={() => handleEditStavka(stavka)}
                                variant="info"
                                className="mr-2"
                              />
                              <Button
                                icon={<FaTrash size={20} />}
                                onClick={() =>
                                  handleDeleteStavka(stavka.rednibroj)
                                }
                                variant="danger"
                              />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className=" text-gray-500 text-sm">
                    Trenutno ne postoje poslovi.
                  </div>
                )}
              </div>
            </>
          )}
        </>
      )}
      {!isAdding && (
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

export default DnevniciSmenaPage;
