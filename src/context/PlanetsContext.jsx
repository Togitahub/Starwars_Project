import { createContext, useReducer, useEffect, useContext } from "react";
import { fetchPlanets, fetchPlanet } from "../utils/api";

const planetsImages = [
	"https://lumiere-a.akamaihd.net/v1/images/tatooine-main_9542b896.jpeg?region=165%2C0%2C949%2C534",
	"https://lumiere-a.akamaihd.net/v1/images/alderaan-main_f5b676cf.jpeg?region=0%2C0%2C1280%2C720",
	"https://lumiere-a.akamaihd.net/v1/images/databank_yavin4_01_169_b6945e20.jpeg?region=0%2C0%2C1560%2C878",
	"https://lumiere-a.akamaihd.net/v1/images/Hoth_d074d307.jpeg?region=0%2C0%2C1200%2C675",
	"https://lumiere-a.akamaihd.net/v1/images/Dagobah_890df592.jpeg?region=0%2C80%2C1260%2C711",
	"https://lumiere-a.akamaihd.net/v1/images/Bespin_2d0759aa.jpeg?region=0%2C0%2C1560%2C878",
	"https://lumiere-a.akamaihd.net/v1/images/databank_endor_01_169_68ba9bdc.jpeg?region=0%2C0%2C1560%2C878",
	"https://lumiere-a.akamaihd.net/v1/images/databank_naboo_01_169_6cd7e1e0.jpeg?region=0%2C0%2C1560%2C878",
	"https://lumiere-a.akamaihd.net/v1/images/coruscant-main_d2fad5f2.jpeg?region=245%2C0%2C1430%2C804",
	"https://lumiere-a.akamaihd.net/v1/images/kamino-main_3001369e.jpeg?region=158%2C0%2C964%2C542",
];

const reducer = (state, action) => {
	switch (action.type) {
		case "FETCH_PLANETS_SUCCESS":
			return { ...state, planets: action.payload, loading: false };
		case "FETCH_PLANETS_FAILURE":
			return { ...state, error: action.payload, loading: false };
		case "FETCH_PLANET_SUCCESS": {
			const updatedPlanets = state.planets.map((planet) =>
				planet.uid === action.payload.uid ? action.payload : planet
			);
			return { ...state, planets: updatedPlanets, loading: false };
		}
		case "FETCH_PLANET_FAILURE":
			return { ...state, error: action.payload, loading: false };
		case "SET_LOADING":
			return { ...state, loading: true };
		default:
			return state;
	}
};

const PlanetsContext = createContext();

export const PlanetsProvider = ({ children }) => {
	const initialState = {
		planets: [],
		loading: false,
		error: null,
	};

	const [state, dispatch] = useReducer(reducer, initialState);

	useEffect(() => {
		const getPlanets = async () => {
			dispatch({ type: "SET_LOADING" });
			try {
				const initialPlanets = await fetchPlanets();
				const detailedPlanets = await Promise.all(
					initialPlanets.map(async (planet, index) => {
						try {
							const details = await fetchPlanet(planet.uid);
							return {
								...details.result.properties,
								id: planet.uid,
								image: planetsImages[index],
							};
							
						} catch (error) {
							dispatch({
								type: "FETCH_PLANET_FAILURE",
								payload: error.message,
							});
						}
					})
				);
				dispatch({
					type: "FETCH_PLANETS_SUCCESS",
					payload: detailedPlanets,
				});
			} catch (error) {
				dispatch({ type: "FETCH_PLANETS_FAILURE", payload: error.message });
			}
		};

		getPlanets();
	}, []);

	return (
		<PlanetsContext.Provider value={{ ...state }}>
			{children}
		</PlanetsContext.Provider>
	);
};

// eslint-disable-next-line react-refresh/only-export-components
export const usePlanets = () => useContext(PlanetsContext);
