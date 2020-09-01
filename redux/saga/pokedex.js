import { takeLatest, call, put } from 'redux-saga/effects'
import PokedexActions, { PokedexTypes } from '../reducer/pokedex'
import utils from '../../services/utils'

export function * pokedexListener (api) {
  yield takeLatest(PokedexTypes.GET_POKEMON_LIST_REQUEST, getPokemonListAction, api)
}

function * getPokemonListAction (api, action) {
  try {
    // you can access action.payload here
    const res = yield call(api.pokemonListRequest)

    if (res.data.results) {
      let data = []
      for (let i = 0; i < res.data.results.length; i++) {
        data.push(utils.toCamel(res.data.results[i]))
      }
      yield put(PokedexActions.getPokemonListSuccess(data))
    } else {
      yield put(PokedexActions.getPokemonListFailure(res.data))
    }
  } catch (err) {
    yield put(PokedexActions.getPokemonListFailure('something went wrong, contact administrator for further info.'))
  }
}

