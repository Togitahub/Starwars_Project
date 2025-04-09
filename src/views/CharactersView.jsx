import CharacterCard from "../components/CharacterCard";
import { useCharacters } from "../context/CharactersContext";

const CharactersView = () => {
	const { characters, loading, error } = useCharacters();
	return (
		<div className="col-10 row gap-3">
			{loading ? (
				<div>
					<h3>Cargando Personajes...</h3>
					<img
						style={{ width: "100px" }}
						className="rounded mx-auto d-block"
						src="https://www.animatedimages.org/data/media/636/animated-star-wars-image-0073.gif"
						alt="loading gif"
					/>
				</div>
			) : (
				""
			)}
			{error ? <h3>Error: {error}</h3> : ""}
			{characters.map((character) => (
				<CharacterCard key={character.id} character={character} />
			))}
		</div>
	);
};

export default CharactersView;
