import { Heart } from "lucide-react";
import { Link } from "react-router-dom";
import { useFavorites } from "../context/FavoritesContext";

const Navbar = () => {
	const { favorites } = useFavorites();
	const favoritesCount = favorites.length;

	return (
		<nav className="navbar navbar-expand-lg navbar-dark bg-dark">
			<div className="container">
				<Link to="/" className="navbar-brand text-primary fw-bold">
					Star Wars Data Bank
				</Link>
				<div className="d-flex align-items-center">
					<Link
						to="/favorites"
						className="d-flex align-items-center text-decoration-none text-white"
					>
						<Heart
							className="me-2"
							fill={favoritesCount > 0 ? "red" : "none"}
							style={{ width: "24px", height: "24px" }}
						/>
						Favoritos
						{favoritesCount > 0 && (
							<span className="badge bg-danger ms-2">{favoritesCount}</span>
						)}
					</Link>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
