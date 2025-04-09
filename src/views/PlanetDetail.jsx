import { useNavigate, useParams } from "react-router-dom";
import { usePlanets } from "../context/PlanetsContext";

const PlanetDetail = () => {
	const navigate = useNavigate();
	const { planetId } = useParams();
	const { planets } = usePlanets();
	const planet = planets.find((planet) => planet.id === planetId);

	return (
		<div className="container">
			<div className="row mb-4">
				<div className="col-8">
					<img className="img-fluid" src={planet.image} alt={planet.name} />
				</div>
				<div className="col-4 border border-primary p-4">
					<h5>{planet.name}</h5>
					<p>
						Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ab maiores
						quas odio perferendis sequi, culpa possimus animi totam, eveniet
						temporibus molestiae ut quisquam unde placeat laudantium dolorem
						libero excepturi voluptatum.
					</p>
					<button
						onClick={() => navigate("/planets-view")}
						className="btn btn-danger"
					>
						Planetas
					</button>
				</div>
			</div>
			<div className="row row-cols-6 text-center">
				<div className="col border-end border-primary">
					<h5>Nombre</h5>
					<p>{planet.name}</p>
				</div>
				<div className="col border-end border-primary">
					<h5>Clima</h5>
					<p>{planet.climate}</p>
				</div>
				<div className="col border-end border-primary">
					<h5>Diametro</h5>
					<p>{planet.diameter}</p>
				</div>
				<div className="col border-end border-primary">
					<h5>Periodo de Rotacion</h5>
					<p>{planet.rotation_period}</p>
				</div>
				<div className="col border-end border-primary">
					<h5>Terreno</h5>
					<p>{planet.terrain}</p>
				</div>
				<div className="col">
					<h5>Poblacion</h5>
					<p>{planet.population}</p>
				</div>
			</div>
		</div>
	);
};

export default PlanetDetail;
