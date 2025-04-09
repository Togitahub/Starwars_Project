import { useVehicles } from "../context/VehiclesContext";
import VehicleCard from "../components/VehicleCard";

const VehiclesView = () => {
	const { vehicles, loading, error } = useVehicles();
	return (
		<div className="col-10 row gap-3">
			{loading ? (
				<div>
					<h3>Cargando Vehiculos...</h3>
					<img
						style={{ width: "100px" }}
						className="rounded mx-auto d-block"
						src="https://www.animatedimages.org/data/media/636/animated-star-wars-image-0004.gif"
						alt="loading gif"
					/>
				</div>
			) : (
				""
			)}
			{error ? <h3>Error: {error}</h3> : ""}
			{vehicles.map((vehicle) => (
				<VehicleCard key={vehicle.id} vehicle={vehicle} />
			))}
		</div>
	);
};

export default VehiclesView;
