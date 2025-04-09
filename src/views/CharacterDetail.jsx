import { useNavigate, useParams } from "react-router-dom";
import { useCharacters } from "../context/CharactersContext";

const CharacterDetail = () => {
	const navigate = useNavigate();
	const { characterId } = useParams();
	const { characters } = useCharacters();
	const character = characters.find(
		(character) => character.id === characterId
	);

	return (
		<div className="container">
			<div className="row mb-4">
				<div className="col-8">
					<img
						className="img-fluid"
						src={character.image}
						alt={character.name}
					/>
				</div>
				<div className="col-4 border border-primary p-4">
					<h5>{character.name}</h5>
					<p>
						Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ab maiores
						quas odio perferendis sequi, culpa possimus animi totam, eveniet
						temporibus molestiae ut quisquam unde placeat laudantium dolorem
						libero excepturi voluptatum.
					</p>
					<button onClick={() => navigate("/")} className="btn btn-danger">
						Personajes
					</button>
				</div>
			</div>
			<div className="row row-cols-6 text-center">
				<div className="col border-end border-primary">
					<h5>Nombre</h5>
					<p>{character.name}</p>
				</div>
				<div className="col border-end border-primary">
					<h5>Genero</h5>
					<p>{character.gender}</p>
				</div>
				<div className="col border-end border-primary">
					<h5>Color de Piel</h5>
					<p>{character.skin_color}</p>
				</div>
				<div className="col border-end border-primary">
					<h5>Color de Cabello</h5>
					<p>{character.hair_color}</p>
				</div>
				<div className="col border-end border-primary">
					<h5>Altura</h5>
					<p>{character.height}</p>
				</div>
				<div className="col">
					<h5>Masa</h5>
					<p>{character.mass}</p>
				</div>
			</div>
		</div>
	);
};

export default CharacterDetail;
