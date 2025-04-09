const BASE_CHARACTERS_URL = "https://www.swapi.tech/api/people";
const BASE_PLANETS_URL = "https://www.swapi.tech/api/planets";
const BASE_VEHICLES_URL = "https://www.swapi.tech/api/vehicles";

//Characters API Functions
export const fetchCharacters = async () => {
    try {
        const response = await fetch(BASE_CHARACTERS_URL);
        const data = await response.json();
        return data.results;
    } catch (error) {
        console.error("Error fetching characters:", error);
        return [];
    }
};

export const fetchCharacter = async (id) => {
    try {
        const response = await fetch(`${BASE_CHARACTERS_URL}/${id}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(`Error fetching character with id ${id}:`, error);
        return null;
    }
};

//Planets API Functions
export const fetchPlanets = async () => {
    try {
        const response = await fetch(BASE_PLANETS_URL);
        const data = await response.json();
        return data.results;
    } catch (error) {
        console.error("Error fetching planets:", error);
        return [];
    }
}

export const fetchPlanet = async (id) => {
    try {
        const response = await fetch(`${BASE_PLANETS_URL}/${id}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(`Error fetching planet with id ${id}:`, error);
        return null;
    }
};

//Vehicles API Functions
export const fetchVehicles = async () => {
    try {
        const response = await fetch(BASE_VEHICLES_URL);
        const data = await response.json();
        return data.results;
    } catch (error) {
        console.error("Error fetching planets:", error);
        return [];
    }
}

export const fetchVehicle = async (id) => {
    try {
        const response = await fetch(`${BASE_VEHICLES_URL}/${id}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(`Error fetching planet with id ${id}:`, error);
        return null;
    }
};