import { createContext, useReducer, useEffect, useContext } from "react";
import { fetchVehicles, fetchVehicle } from "../utils/api";

const vehiclesImages = [
	"https://lumiere-a.akamaihd.net/v1/images/sandcrawler-main_eb1b036b.jpeg?region=251%2C20%2C865%2C487",
	"https://lumiere-a.akamaihd.net/v1/images/E4D_IA_1136_6b8704fa.jpeg?region=237%2C0%2C1456%2C819",
	"https://lumiere-a.akamaihd.net/v1/images/databank_t16skyhopper_01_169_ad69e901.jpeg?region=141%2C304%2C750%2C422",
	"https://lumiere-a.akamaihd.net/v1/images/databank_vulturedroid_01_169_6ef9fd50.jpeg?region=0%2C0%2C1560%2C878",
	"https://lumiere-a.akamaihd.net/v1/images/snowspeeder_ef2f9334.jpeg?region=0%2C211%2C2048%2C1154",
	"https://lumiere-a.akamaihd.net/v1/images/AT-AT_89d0105f.jpeg?region=214%2C19%2C1270%2C716",
	"https://lumiere-a.akamaihd.net/v1/images/tie-bomber-main_d4d9b979.jpeg?region=424%2C0%2C632%2C356",
	"https://lumiere-a.akamaihd.net/v1/images/tlj-first-order-atst_dd236e34.jpeg?region=0%2C0%2C1560%2C878",
	"https://lumiere-a.akamaihd.net/v1/images/cloud-car-main-image_8d2e4e89.jpeg?region=271%2C0%2C1009%2C568",
	"https://lumiere-a.akamaihd.net/v1/images/5ab2780393e90900016590c5-image_463c9cf2.jpeg?region=0%2C0%2C1536%2C864",
];

const reducer = (state, action) => {
	switch (action.type) {
		case "FETCH_VEHICLES_SUCCESS":
			return { ...state, vehicles: action.payload, loading: false };
		case "FETCH_VEHICLES_FAILURE":
			return { ...state, error: action.payload, loading: false };
		case "FETCH_VEHICLE_SUCCESS": {
			const updatedVehicles = state.vehicles.map((vehicle) =>
				vehicle.uid === action.payload.uid ? action.payload : vehicle
			);
			return { ...state, vehicles: updatedVehicles, loading: false };
		}
		case "FETCH_VEHICLE_FAILURE":
			return { ...state, error: action.payload, loading: false };
		case "SET_LOADING":
			return { ...state, loading: true };
		default:
			return state;
	}
};

const VehiclesContext = createContext();

export const VehiclesProvider = ({ children }) => {
	const initialState = {
		vehicles: [],
		loading: false,
		error: null,
	};

	const [state, dispatch] = useReducer(reducer, initialState);

	useEffect(() => {
		const getVehicles = async () => {
			dispatch({ type: "SET_LOADING" });
			try {
				const initialVehicles = await fetchVehicles();
				const detailedVehicles = await Promise.all(
					initialVehicles.map(async (vehicle, index) => {
						try {
							const details = await fetchVehicle(vehicle.uid);
							return {
								...details.result.properties,
								id: vehicle.uid,
								image: vehiclesImages[index],
							};
						} catch (error) {
							dispatch({
								type: "FETCH_VEHICLE_FAILURE",
								payload: error.message,
							});
						}
					})
				);
				dispatch({
					type: "FETCH_VEHICLES_SUCCESS",
					payload: detailedVehicles,
				});
			} catch (error) {
				dispatch({ type: "FETCH_VEHICLES_FAILURE", payload: error.message });
			}
		};

		getVehicles();
	}, []);

	return (
		<VehiclesContext.Provider value={{ ...state }}>
			{children}
		</VehiclesContext.Provider>
	);
};

// eslint-disable-next-line react-refresh/only-export-components
export const useVehicles = () => useContext(VehiclesContext);
