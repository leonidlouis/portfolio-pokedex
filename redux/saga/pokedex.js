import { takeLatest, call, put } from "redux-saga/effects";
import PokedexActions, { PokedexTypes } from "../reducer/pokedex";
import utils from "../../services/utils";

export function* pokedexListener(api) {
  yield takeLatest(
    PokedexTypes.GET_POKEMON_LIST_REQUEST,
    getPokemonListAction,
    api
  );
  yield takeLatest(
    PokedexTypes.GET_POKEMON_LIST_BY_TYPE_REQUEST,
    getPokemonListByTypeAction,
    api
  );
}

function* getPokemonListAction(api, action) {
  try {
    const limit = 20;
    const offset = (action.payload - 1) * limit;

    const res = yield call(api.pokemonListRequest, offset, limit);

    if (res.data.results) {
      let data = [];
      for (let i = 0; i < res.data.results.length; i++) {
        data.push(utils.toCamel(res.data.results[i]));
      }

      yield put(PokedexActions.getPokemonListSuccess(data));
    } else {
      yield put(PokedexActions.getPokemonListFailure(res.data));
    }
  } catch (err) {
    yield put(
      PokedexActions.getPokemonListFailure(
        "something went wrong, contact administrator for further info."
      )
    );
  }
}

function* getPokemonListByTypeAction(api, action) {
  try {
    const res = yield call(api.pokemonListRequestByType, action.payload);

    if (res.data.pokemon) {
      yield put(PokedexActions.getPokemonListByTypeSuccess(res.data.pokemon));
    } else {
      yield put(PokedexActions.getPokemonListFailure(res.data));
    }
  } catch (err) {
    yield put(
      PokedexActions.getPokemonListFailure(
        "something went wrong, contact administrator for further info."
      )
    );
  }
}
