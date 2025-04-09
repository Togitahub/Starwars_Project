import { useState, useEffect, useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const SideMenu = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const [linkClicked, setLinkClicked] = useState("");

	const pathMap = useMemo(
		() => ({
			"/": "CharactersView",
			"/planets-view": "PlanetsView",
			"/vehicles-view": "VehiclesView",
		}),
		[]
	);

	useEffect(() => {
		setLinkClicked(pathMap[location.pathname] || "CharactersView");
	}, [location.pathname, pathMap]);

	const handleNavigate = (link, path) => {
		setLinkClicked(link);
		navigate(path);
	};

	return (
		<div className="col-2">
			<div className="list-group" id="list-tab" role="tablist">
				{Object.entries(pathMap).map(([path, link]) => (
					<div
						key={link}
						role="button"
						onClick={() => handleNavigate(link, path)}
						className={`list-group-item ${
							linkClicked === link ? "active" : ""
						}`}
					>
						{link.replace("View", "")}
					</div>
				))}
			</div>
		</div>
	);
};

export default SideMenu;
