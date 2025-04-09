import { createContext, useReducer, useContext } from "react";

const FavoritesContext = createContext();

const favoritesReducer = (state, action) => {
	switch (action.type) {
		case "ADD_FAVORITE":
			if (
				state.some(
					(favoriteItem) =>
						favoriteItem.id === action.payload.id && favoriteItem.type === action.payload.type
				)
			) {
				return state;
			}
			return [...state, action.payload];

		case "REMOVE_FAVORITE":
			return state.filter(
				(favoriteItem) =>
					!(favoriteItem.id === action.payload.id && favoriteItem.type === action.payload.type)
			);

		default:
			return state;
	}
};

export const FavoritesProvider = ({ children }) => {
	const [favorites, dispatch] = useReducer(favoritesReducer, []);

	const addFavorite = (item, type) => {
		dispatch({
			type: "ADD_FAVORITE",
			payload: { ...item, type },
		});
	};

	const removeFavorite = (id, type) => {
		dispatch({
			type: "REMOVE_FAVORITE",
			payload: { id, type },
		});
	};

	const isFavorite = (id, type) => {
		return favorites.some((item) => item.id === id && item.type === type);
	};

	return (
		<FavoritesContext.Provider
			value={{ favorites, addFavorite, removeFavorite, isFavorite }}
		>
			{children}
		</FavoritesContext.Provider>
	);
};

// eslint-disable-next-line react-refresh/only-export-components
export const useFavorites = () => useContext(FavoritesContext);
