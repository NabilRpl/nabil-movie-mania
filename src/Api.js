import axios from "axios";

const apiKey = process.env.REACT_APP_APIKEY;
const baseUrl = process.env.REACT_APP_BASEURL;

export const getMovieList = async () => {
    try {
        const response = await axios.get(`${baseUrl}/movie/popular?api_key=${apiKey}`);
        return response.data.results;
    } catch (error) {
        console.error("Error fetching movie list:", error);
        throw error;
    }
};

export const searchMovie = async (q) => {
    try {
        const search = await axios.get(`${baseUrl}/search/movie?query=${q}&api_key=${apiKey}`);
        return search.data;
    } catch (error) {
        console.error("Error searching movies:", error);
        throw error;
    }
};

