import { Heart } from "lucide-react";
import { useFavorites } from "../context/FavoritesContext";
import { useNavigate } from "react-router-dom";

const CharacterCard = ({ character }) => {
	const navigate = useNavigate();
	const { addFavorite, removeFavorite, isFavorite } = useFavorites();
	const isCharacterFavorite = isFavorite(character.id, "character");

	const handleFavoriteClick = () => {
		if (isCharacterFavorite) {
			removeFavorite(character.id, "character");
		} else {
			addFavorite(character, "character");
		}
	};

	const handleViewMoreClick = () => {
		navigate(`/character/${character.id}`);
	}

	return (
		<div className="col-auto">
			<div className="card bg-dark text-white" style={{ width: "18rem" }}>
				<img
					src={character.image}
					className="card-img-top border border-primary"
					alt={character.name}
				/>
				<div className="card-body">
					<h5 className="card-title"> {character.name} </h5>
					<p className="card-text">
						Mass: {character.mass} <br /> Height: {character.height}
					</p>
				</div>
				<div className="card-footer d-flex justify-content-between border-primary">
					<button onClick={handleViewMoreClick} className="btn btn-primary">VER MAS</button>
					<button
						className={`btn ${
							isCharacterFavorite ? "btn-danger" : "btn-outline-danger"
						}`}
						onClick={handleFavoriteClick}
					>
						<Heart fill={isCharacterFavorite ? "white" : "none"} />
					</button>
				</div>
			</div>
		</div>
	);
};

export default CharacterCard;
