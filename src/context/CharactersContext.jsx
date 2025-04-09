import { createContext, useReducer, useEffect, useContext } from "react";
import { fetchCharacters, fetchCharacter } from "../utils/api";

const charactersImages = [
	"https://lumiere-a.akamaihd.net/v1/images/luke-skywalker-main_7ffe21c7.jpeg?region=130%2C147%2C1417%2C796",
	"https://lumiere-a.akamaihd.net/v1/images/c-3po-main_d6850e28.jpeg?region=176%2C0%2C951%2C536",
	"https://lumiere-a.akamaihd.net/v1/images/r2-d2-main_f315b094.jpeg?region=273%2C0%2C951%2C536",
	"https://lumiere-a.akamaihd.net/v1/images/darth-vader-main_4560aff7.jpeg?region=0%2C67%2C1280%2C720",
	"https://lumiere-a.akamaihd.net/v1/images/leia-organa-main_9af6ff81.jpeg?region=187%2C157%2C1400%2C786",
	"https://lumiere-a.akamaihd.net/v1/images/owen-lars-main_08c717c8.jpeg?region=0%2C34%2C1053%2C593",
	"https://lumiere-a.akamaihd.net/v1/images/beru-lars-main_fa680a4c.png?region=342%2C0%2C938%2C527",
	"https://lumiere-a.akamaihd.net/v1/images/r5-d4_main_image_7d5f078e.jpeg?region=374%2C0%2C1186%2C666",
	"https://lumiere-a.akamaihd.net/v1/images/image_606ff7f7.jpeg?region=0%2C0%2C1560%2C878",
	"https://lumiere-a.akamaihd.net/v1/images/obi-wan-kenobi-main_3286c63c.jpeg?region=0%2C0%2C1280%2C721",
];

const reducer = (state, action) => {
	switch (action.type) {
		case "FETCH_CHARACTERS_SUCCESS":
			return { ...state, characters: action.payload, loading: false };
		case "FETCH_CHARACTERS_FAILURE":
			return { ...state, error: action.payload, loading: false };
		case "FETCH_CHARACTER_SUCCESS": {
			const updatedCharacters = state.characters.map((char) =>
				char.uid === action.payload.uid ? action.payload : char
			);
			return { ...state, characters: updatedCharacters, loading: false };
		}
		case "FETCH_CHARACTER_FAILURE":
			return { ...state, error: action.payload, loading: false };
		case "SET_LOADING":
			return { ...state, loading: true };
		default:
			return state;
	}
};

const CharactersContext = createContext();

export const CharactersProvider = ({ children }) => {
	const initialState = {
		characters: [],
		loading: false,
		error: null,
	};

	const [state, dispatch] = useReducer(reducer, initialState);

	useEffect(() => {
		const getCharacters = async () => {
			dispatch({ type: "SET_LOADING" });
			try {
				const initialCharacters = await fetchCharacters();
				const detailedCharacters = await Promise.all(
					initialCharacters.map(async (char, index) => {
						try {
							const details = await fetchCharacter(char.uid);
							return {
								...details.result.properties,
								id: char.uid,
								image: charactersImages[index],
							};
						} catch (error) {
							dispatch({
								type: "FETCH_CHARACTER_FAILURE",
								payload: error.message,
							});
						}
					})
				);
				dispatch({
					type: "FETCH_CHARACTERS_SUCCESS",
					payload: detailedCharacters,
				});
			} catch (error) {
				dispatch({ type: "FETCH_CHARACTERS_FAILURE", payload: error.message });
			}
		};

		getCharacters();
	}, []);

	return (
		<CharactersContext.Provider value={{ ...state }}>
			{children}
		</CharactersContext.Provider>
	);
};

// eslint-disable-next-line react-refresh/only-export-components
export const useCharacters = () => useContext(CharactersContext);
