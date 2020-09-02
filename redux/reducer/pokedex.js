import { createActions, createReducer } from "reduxsauce";

const { Types, Creators } = createActions({
  getPokemonListRequest: ["payload"],
  getPokemonListByTypeRequest: ["payload"],
  getPokemonListSuccess: ["payload"],
  getPokemonListByTypeSuccess: ["payload"],
  getPokemonListFailure: ["payload"],
});

export const PokedexTypes = Types;
export default Creators;

export const INITIAL_STATE = {
  fetching: false,
  error: false,
  success: false,
  pokemonList: [],
  pokemonListByType: [],
};

const getPokemonListRequest = (state) => ({
  ...state,
  fetching: true,
  error: false,
  success: false,
});

const getPokemonListByTypeRequest = (state) => ({
  ...state,
  fetching: true,
  error: false,
  success: false,
  pokemonList: [],
});

const getPokemonListFailure = (state, { payload }) => ({
  ...state,
  fetching: false,
  error: payload,
  success: false,
  pokemonList: [],
});

const getPokemonListSuccess = (state, { payload }) => ({
  ...state,
  fetching: false,
  error: false,
  success: true,
  pokemonList: [...state.pokemonList, ...payload],
});

const getPokemonListByTypeSuccess = (state, { payload }) => ({
  ...state,
  fetching: false,
  error: false,
  success: true,
  pokemonListByType: payload,
});

export const reducer = createReducer(INITIAL_STATE, {
  [Types.GET_POKEMON_LIST_SUCCESS]: getPokemonListSuccess,
  [Types.GET_POKEMON_LIST_BY_TYPE_SUCCESS]: getPokemonListByTypeSuccess,
  [Types.GET_POKEMON_LIST_REQUEST]: getPokemonListRequest,
  [Types.GET_POKEMON_LIST_BY_TYPE_REQUEST]: getPokemonListByTypeRequest,
  [Types.GET_POKEMON_LIST_FAILURE]: getPokemonListFailure,
});
