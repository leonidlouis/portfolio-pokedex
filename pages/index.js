import { END } from "redux-saga";
import PokedexActions from "../redux/reducer/pokedex";
import { useSelector, useDispatch } from "react-redux";
import _ from "../services/lodash";
import { useEffect, useState } from "react";
import constant from "../constant";
import SelectFilterType from "../components/select_filter_type";
import PokemonList from "../components/pokemon_list";
import Header from "../components/header";

const Index = () => {
  const {
    fetching,
    success,
    error,
    pokemonList,
    pokemonListByType,
  } = useSelector((state) => state.pokedex);

  const dispatch = useDispatch();
  const [isBottom, setIsBottom] = useState(false);
  const [pageLocation, setPageLocation] = useState(1);
  const [filter, setFilter] = useState(constant.DEFAULT_TYPE_FILTER);

  const handleScroll = () => {
    const scrollTop =
      (document.documentElement && document.documentElement.scrollTop) ||
      document.body.scrollTop;
    const scrollHeight =
      (document.documentElement && document.documentElement.scrollHeight) ||
      document.body.scrollHeight;
    if (
      scrollTop + window.innerHeight + 50 >= scrollHeight &&
      filter === constant.DEFAULT_TYPE_FILTER
    ) {
      setIsBottom(true);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [filter]);

  useEffect(() => {
    if (isBottom) {
      setPageLocation(pageLocation + 1);
      dispatch(PokedexActions.getPokemonListRequest(pageLocation + 1));
    }
  }, [isBottom]);

  useEffect(() => {
    if (success) {
      setIsBottom(false);
    }
  }, [success]);

  useEffect(() => {
    if (filter !== constant.DEFAULT_TYPE_FILTER) {
      dispatch(PokedexActions.getPokemonListByTypeRequest(filter));
    } else {
      dispatch(PokedexActions.getPokemonListRequest());
    }
  }, [filter]);

  return (
    <section className="container container--center container--flex container--width-80">
      <Header />
      <section>
        <SelectFilterType
          value={filter}
          onChange={(e) => {
            setPageLocation(1);
            setFilter(e.target.value);
          }}
        />
        <PokemonList
          filter={filter}
          pokemonList={pokemonList}
          pokemonListByType={pokemonListByType}
          error={error}
          success={success}
          isBottom={isBottom}
          fetching={fetching}
        />
      </section>
    </section>
  );
};

Index.getInitialProps = async ({ store, isServer }) => {
  if (_.isEmpty(store.getState().pokedex.pokemonList)) {
    store.dispatch(PokedexActions.getPokemonListRequest());
    if (isServer) {
      store.dispatch(END);
      await store.sagaTask.toPromise();
    }
  }
};

export default Index;
