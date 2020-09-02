import { takeLatest, call, put } from "redux-saga/effects";
import PokemonActions, { PokemonTypes } from "../reducer/pokemon";
import utils from "../../services/utils";

export function* pokemonListener(api) {
  yield takeLatest(
    PokemonTypes.GET_POKEMON_DETAIL_REQUEST,
    getPokemonListAction,
    api
  );
}

function* getPokemonListAction(api, action) {
  try {
    const res = yield call(api.pokemonDetailRequest, action.payload);
    if (res.data) {
      yield put(
        PokemonActions.getPokemonDetailSuccess(utils.toCamel(res.data))
      );
    } else {
      yield put(PokemonActions.getPokemonDetailFailure(res.data));
    }
  } catch (err) {
    yield put(
      PokemonActions.getPokemonDetailFailure(
        "something went wrong, contact administrator for further info."
      )
    );
  }
}
