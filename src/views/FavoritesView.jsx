import { useFavorites } from "../context/FavoritesContext";
import CharacterCard from "../components/CharacterCard";
import PlanetCard from "../components/PlanetCard";
import VehicleCard from "../components/VehicleCard";
import { useNavigate } from "react-router-dom";

const FavoritesView = () => {
    const navigate = useNavigate();
	const { favorites } = useFavorites();

	const characters = favorites.filter((item) => item.type === "character");
	const planets = favorites.filter((item) => item.type === "planet");
	const vehicles = favorites.filter((item) => item.type === "vehicle");

	return (
		<div className="col-10">
			<div className="d-flex mb-3">
				<h2 className="me-3">Favorites</h2>
                <button onClick={() => navigate('/')} className="btn btn-danger">GO BACK</button >
			</div>

			{favorites.length === 0 ? (
				<div className="alert alert-info">Ningun Favorito Aun</div>
			) : (
				<>
					{characters.length > 0 && (
						<div className="mb-4">
							<h3>Characters</h3>
							<div className="row gap-3">
								{characters.map((character) => (
									<CharacterCard
										key={`char-${character.id}`}
										character={character}
									/>
								))}
							</div>
						</div>
					)}

					{planets.length > 0 && (
						<div className="mb-4">
							<h3>Planets</h3>
							<div className="row gap-3">
								{planets.map((planet) => (
									<PlanetCard key={`planet-${planet.id}`} planet={planet} />
								))}
							</div>
						</div>
					)}

					{vehicles.length > 0 && (
						<div className="mb-4">
							<h3>Vehicles</h3>
							<div className="row gap-3">
								{vehicles.map((vehicle) => (
									<VehicleCard
										key={`vehicle-${vehicle.id}`}
										vehicle={vehicle}
									/>
								))}
							</div>
						</div>
					)}
				</>
			)}
		</div>
	);
};

export default FavoritesView;
