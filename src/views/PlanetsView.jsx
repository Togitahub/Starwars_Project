import { usePlanets } from "../context/PlanetsContext";
import PlanetCard from "../components/PlanetCard";

const PlanetsView = () => {
	const { planets, loading, error } = usePlanets();
	return (
		<div className="col-10 row gap-3">
			{loading ? (
				<div>
					<h3>Cargando Planetas...</h3>
					<img
						style={{ width: "100px" }}
						className="rounded mx-auto d-block"
						src="https://www.animatedimages.org/data/media/636/animated-star-wars-image-0122.gif"
						alt="loading gif"
					/>
				</div>
			) : (
				""
			)}
			{error ? <h3>Error: {error}</h3> : ""}
			{planets.map((planet) => (
				<PlanetCard key={planet.id} planet={planet} />
			))}
		</div>
	);
};

export default PlanetsView;
