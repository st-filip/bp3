import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage";
import RadniNaloziPage from "./pages/RadniNaloziPage";
import DnevniciSmenaPage from "./pages/DnevniciSmenaPage";
import PopisiMagacinaPage from "./pages/PopisiMagacinaPage";
import MainLayout from "./components/MainLayout";
import ZaposleniPage from "./pages/ZaposleniPage";
import ProizvodiPage from "./pages/ProizvodiPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/home" replace={true} />} />
        <Route path="/home" element={<HomePage />} />
        <Route element={<MainLayout />}>
          <Route path="/radni-nalozi" element={<RadniNaloziPage />} />
          <Route path="/dnevnici-smena" element={<DnevniciSmenaPage />} />
          <Route path="/popisi-magacina" element={<PopisiMagacinaPage />} />
          <Route path="/zaposleni" element={<ZaposleniPage />} />
          <Route path="/proizvodi" element={<ProizvodiPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
