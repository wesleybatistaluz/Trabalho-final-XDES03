import axios from "axios";

const API_KEY = "5b47d7d46815ae746c9d67b7bc7721dd"; // Pegue a API key no site da The Movie DB.
const BASE_URL = "https://api.themoviedb.org/3";

export const buscarFilmesAleatorios = async () => {
  const response = await axios.get(`${BASE_URL}/discover/movie`, {
    params: { api_key: API_KEY, sort_by: "popularity.desc", page: 1 }
  });
  return response.data.results.slice(0, 3); // Retorna os 3 primeiros filmes.
};

export const buscarFilmesPorNome = async (query: string) => {
  const response = await axios.get(`${BASE_URL}/search/movie`, {
    params: { api_key: API_KEY, query }
  });
  return response.data.results;
};
