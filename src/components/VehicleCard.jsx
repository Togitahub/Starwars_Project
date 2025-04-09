import { Heart } from "lucide-react";
import { useFavorites } from "../context/FavoritesContext";
import { useNavigate } from "react-router-dom";

const VehicleCard = ({ vehicle }) => {
	const navigate = useNavigate();
	const { addFavorite, removeFavorite, isFavorite } = useFavorites();
	const isVehicleFavorite = isFavorite(vehicle.id, "vehicle");

	const handleFavoriteClick = () => {
		if (isVehicleFavorite) {
			removeFavorite(vehicle.id, "vehicle");
		} else {
			addFavorite(vehicle, "vehicle");
		}
	};

	const handleViewMoreClick = () => {
		navigate(`/vehicle/${vehicle.id}`);
	};

	return (
		<div className="col-auto">
			<div className="card bg-dark text-white" style={{ width: "18rem" }}>
				<img
					src={vehicle.image}
					className="card-img-top border border-primary"
					alt={vehicle.name}
				/>
				<div className="card-body">
					<h5 className="card-title"> {vehicle.name} </h5>
					<p className="card-text">
						Passengers: {vehicle.passengers} <br /> Class:{" "}
						{vehicle.vehicle_class}
					</p>
				</div>
				<div className="card-footer d-flex justify-content-between border-primary">
					<button onClick={handleViewMoreClick} className="btn btn-primary">
						VER MAS
					</button>
					<button
						className={`btn ${
							isVehicleFavorite ? "btn-danger" : "btn-outline-danger"
						}`}
						onClick={handleFavoriteClick}
					>
						<Heart fill={isVehicleFavorite ? "white" : "none"} />
					</button>
				</div>
			</div>
		</div>
	);
};

export default VehicleCard;
