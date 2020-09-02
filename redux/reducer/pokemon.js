import { createActions, createReducer } from "reduxsauce";

const { Types, Creators } = createActions({
  getPokemonDetailRequest: ["payload"],
  getPokemonDetailSuccess: ["payload"],
  getPokemonDetailFailure: ["payload"],
});

export const PokemonTypes = Types;
export default Creators;

export const INITIAL_STATE = {
  fetching: false,
  error: false,
  success: false,
  data: {},
};

const getPokemonDetailRequest = (state) => ({
  ...state,
  fetching: true,
  error: false,
  success: false,
  data: {},
});

const getPokemonDetailFailure = (state, { payload }) => ({
  ...state,
  fetching: false,
  error: payload,
  success: false,
  data: {},
});

const getPokemonDetailSuccess = (state, { payload }) => ({
  ...state,
  fetching: false,
  error: false,
  success: true,
  data: payload,
});

export const reducer = createReducer(INITIAL_STATE, {
  [Types.GET_POKEMON_DETAIL_SUCCESS]: getPokemonDetailSuccess,
  [Types.GET_POKEMON_DETAIL_REQUEST]: getPokemonDetailRequest,
  [Types.GET_POKEMON_DETAIL_FAILURE]: getPokemonDetailFailure,
});
