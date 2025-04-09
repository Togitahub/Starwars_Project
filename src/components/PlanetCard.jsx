import { Heart } from "lucide-react";
import { useFavorites } from "../context/FavoritesContext";
import { useNavigate } from "react-router-dom";

const PlanetCard = ({ planet }) => {
	const navigate = useNavigate();
	const { addFavorite, removeFavorite, isFavorite } = useFavorites();
	const isPlanetFavorite = isFavorite(planet.id, "planet");

	const handleFavoriteClick = () => {
		if (isPlanetFavorite) {
			removeFavorite(planet.id, "planet");
		} else {
			addFavorite(planet, "planet");
		}
	};

	const handleViewMoreClick = () => {
		navigate(`/planet/${planet.id}`);
	}

	return (
		<div className="col-auto">
			<div className="card bg-dark text-white" style={{ width: "18rem" }}>
				<img
					src={planet.image}
					className="card-img-top border border-primary"
					alt={planet.name}
				/>
				<div className="card-body">
					<h5 className="card-title"> {planet.name} </h5>
					<p className="card-text">
						Climate: {planet.climate} <br /> Diameter: {planet.diameter}
					</p>
				</div>
				<div className="card-footer d-flex justify-content-between border-primary">
					<button onClick={handleViewMoreClick} className="btn btn-primary">VER MAS</button>
					<button
						className={`btn ${
							isPlanetFavorite ? "btn-danger" : "btn-outline-danger"
						}`}
						onClick={handleFavoriteClick}
					>
						<Heart fill={isPlanetFavorite ? "white" : "none"} />
					</button>
				</div>
			</div>
		</div>
	);
};

export default PlanetCard;
