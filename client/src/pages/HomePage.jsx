import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";

const HomePage = () => {
  const navigate = useNavigate();

  const buttons = [
    { text: "Radni nalozi", path: "/radni-nalozi" },
    { text: "Dnevnici smena", path: "/dnevnici-smena" },
    { text: "Popisi magacina", path: "/popisi-magacina" },
    { text: "Zaposleni", path: "/zaposleni" },
    { text: "Proizvodi", path: "/proizvodi" },
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 text-white">
      <h1 className="text-5xl font-extrabold mb-12 drop-shadow-md text-center">
        Sistem za praćenje proizvodnje alkoholnih pića
      </h1>
      <div className="flex flex-wrap justify-center gap-6 w-full max-w-xl px-4">
        {buttons.map((btn, index) => (
          <Button
            key={index}
            type="button"
            text={btn.text}
            onClick={() => navigate(btn.path)}
            variant="basic"
            className="flex-shrink-0"
          />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
