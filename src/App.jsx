import { Routes, Route, useLocation } from "react-router-dom";

//Components
import Navbar from "./components/Navbar";
import SideMenu from "./components/SideMenu";

//Views
import CharactersView from "./views/CharactersView";
import PlanetsView from "./views/PlanetsView";
import VehiclesView from "./views/VehiclesVIew";
import FavoritesView from "./views/FavoritesView";
import CharacterDetail from "./views/CharacterDetail";
import PlanetDetail from "./views/PlanetDetail";
import VehicleDetail from "./views/VehicleDetail";

//Context
import { CharactersProvider } from "./context/CharactersContext";
import { PlanetsProvider } from "./context/PlanetsContext";
import { VehiclesProvider } from "./context/VehiclesContext";
import { FavoritesProvider } from "./context/FavoritesContext";

function App() {
    const location = useLocation();
    const showSideMenu =
        !location.pathname.startsWith("/character/") &&
        !location.pathname.startsWith("/planet/") &&
        !location.pathname.startsWith("/vehicle/");

    return (
        <FavoritesProvider>
            <CharactersProvider>
                <PlanetsProvider>
                    <VehiclesProvider>
                        <Navbar />
                        <div className="container mt-3">
                            <div className="row">
                                {showSideMenu && <SideMenu />}
                                <Routes>
                                    <Route path="/" element={<CharactersView />} />
                                    <Route
                                        path="/character/:characterId"
                                        element={<CharacterDetail />}
                                    />
                                    <Route path="/planet/:planetId" element={<PlanetDetail />} />
                                    <Route
                                        path="/vehicle/:vehicleId"
                                        element={<VehicleDetail />}
                                    />
                                    <Route path="/planets-view" element={<PlanetsView />} />
                                    <Route path="/vehicles-view" element={<VehiclesView />} />
                                    <Route path="/favorites" element={<FavoritesView />} />
                                </Routes>
                            </div>
                        </div>
                    </VehiclesProvider>
                </PlanetsProvider>
            </CharactersProvider>
        </FavoritesProvider>
    );
}

export default App;
