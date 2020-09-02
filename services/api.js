import axios from "axios";
import config from "../config";

const api = axios.create({
  baseURL: config.apiURL,
  timeout: 10000,
});

const pokemonListRequest = (offset, limit) =>
  api.get(`/pokemon/?offset=${offset}&limit=${limit}`);

const pokemonTypeListRequest = () => api.get("/type/");

const pokemonListRequestByType = (type) => api.get(`/type/${type}`);

const pokemonDetailRequest = (id) => api.get(`/pokemon/${id}`);

export default {
  pokemonListRequest,
  pokemonDetailRequest,
  pokemonTypeListRequest,
  pokemonListRequestByType,
};
