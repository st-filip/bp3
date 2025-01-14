import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 text-white">
      <h1 className="text-5xl font-extrabold mb-12 drop-shadow-md text-center">
        Sistem za praćenje proizvodnje alkoholnih pića
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full max-w-2xl px-4">
        <Button
          type="button"
          text="Radni nalozi"
          onClick={() => navigate("/radni-nalozi")}
          variant="basic"
        ></Button>
        <Button
          type="button"
          text="Dnevnici smena"
          onClick={() => navigate("/dnevnici-smena")}
          variant="basic"
        ></Button>
        <Button
          type="button"
          text="Popisi magacina"
          onClick={() => navigate("/popisi-magacina")}
          variant="basic"
        ></Button>
      </div>
    </div>
  );
};

export default HomePage;
