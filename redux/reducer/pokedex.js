import { createActions, createReducer } from 'reduxsauce'
import Immutable from 'seamless-immutable'

const { Types, Creators } = createActions({
  getPokemonListRequest: ['payload'],
  getPokemonListSuccess: ['payload'],
  getPokemonListFailure: ['payload'],
})

export const PokedexTypes = Types
export default Creators

export const INITIAL_STATE = Immutable({
  fetching: false,
  error: false,
  success: false,
  pokemonList: null,
})

const getPokemonListRequest = (state) => state.merge({
  fetching: true,
  error: false,
  success: false,
  pokemonList: null,
})

const getPokemonListFailure = (state, { payload }) => state.merge({
  fetching: false,
  error: payload,
  success: false,
  pokemonList: null,
})

const getPokemonListSuccess = (state, { payload }) => state.merge({
  fetching: false,
  error: false,
  success: false,
  pokemonList: payload,
})


export const reducer = createReducer(INITIAL_STATE, {
  [Types.GET_POKEMON_LIST_SUCCESS]: getPokemonListSuccess,
  [Types.GET_POKEMON_LIST_REQUEST]: getPokemonListRequest,
  [Types.GET_POKEMON_LIST_FAILURE]: getPokemonListFailure,
})
