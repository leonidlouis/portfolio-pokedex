import { combineReducers } from "redux";
import { reducer as pokedex } from "./pokedex";
import { reducer as pokemon } from "./pokemon";
import { HYDRATE } from "next-redux-wrapper";

const combinedReducers = combineReducers({
  pokedex,
  pokemon,
});

// to handle merging server side store to clien side store
const reducerHydrator = (state, action) => {
  if (action.type === HYDRATE) {
    const nextState = {
      ...state,
      ...action.payload,
    };
    return nextState;
  } else {
    return combinedReducers(state, action);
  }
};

export default reducerHydrator;
