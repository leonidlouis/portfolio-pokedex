import { all, fork } from "redux-saga/effects";
import { pokedexListener } from "./pokedex";
import { pokemonListener } from "./pokemon";
import api from "../../services/api";

export default function* rootSaga() {
  yield all([fork(pokedexListener, api), fork(pokemonListener, api)]);
}
