import { useNavigate, useParams } from "react-router-dom";
import { useVehicles } from "../context/VehiclesContext";

const VehicleDetail = () => {
	const navigate = useNavigate();
	const { vehicleId } = useParams();
	const { vehicles } = useVehicles();
	const vehicle = vehicles.find((vehicle) => vehicle.id === vehicleId);

	return (
		<div className="container">
			<div className="row mb-4">
				<div className="col-8">
					<img className="img-fluid" src={vehicle.image} alt={vehicle.name} />
				</div>
				<div className="col-4 border border-primary p-4">
					<h5>{vehicle.name}</h5>
					<p>
						Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ab maiores
						quas odio perferendis sequi, culpa possimus animi totam, eveniet
						temporibus molestiae ut quisquam unde placeat laudantium dolorem
						libero excepturi voluptatum.
					</p>
					<button
						onClick={() => navigate("/vehicles-view")}
						className="btn btn-danger"
					>
						Vehiculos
					</button>
				</div>
			</div>
			<div className="row row-cols-6 text-center">
				<div className="col border-end border-primary">
					<h5>Nombre</h5>
					<p>{vehicle.name}</p>
				</div>
				<div className="col border-end border-primary">
					<h5>Capacity</h5>
					<p>{vehicle.cargo_capacity}</p>
				</div>
				<div className="col border-end border-primary">
					<h5>Pasajeros</h5>
					<p>{vehicle.passengers}</p>
				</div>
				<div className="col border-end border-primary">
					<h5>Modelo</h5>
					<p>{vehicle.model}</p>
				</div>
				<div className="col border-end border-primary">
					<h5>Costo</h5>
					<p>{vehicle.cost_in_credits}</p>
				</div>
				<div className="col">
					<h5>Creador</h5>
					<p>{vehicle.manufacturer}</p>
				</div>
			</div>
		</div>
	);
};

export default VehicleDetail;
