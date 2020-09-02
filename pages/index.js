import { END } from "redux-saga";
import PokedexActions from "../redux/reducer/pokedex";
import { useSelector, useDispatch } from "react-redux";
import _ from "../services/lodash";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import constant from "../constant";

const Index = () => {
  const {
    fetching,
    success,
    error,
    pokemonList,
    pokemonListByType,
  } = useSelector((state) => state.pokedex);

  const dispatch = useDispatch();
  const router = useRouter();
  const [isBottom, setIsBottom] = useState(false);
  const [pageLocation, setPageLocation] = useState(1);
  const [filter, setFilter] = useState("all");
  const [shownPokemon, setShownPokemon] = useState([]);

  const handleScroll = () => {
    const scrollTop =
      (document.documentElement && document.documentElement.scrollTop) ||
      document.body.scrollTop;
    const scrollHeight =
      (document.documentElement && document.documentElement.scrollHeight) ||
      document.body.scrollHeight;
    if (
      scrollTop + window.innerHeight + 50 >= scrollHeight &&
      filter === "all"
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
    if (filter !== "all") {
      dispatch(PokedexActions.getPokemonListByTypeRequest(filter));
    } else {
      dispatch(PokedexActions.getPokemonListRequest());
    }
  }, [filter]);

  return (
    <section className="container container--center container--flex container--width-80">
      <header className="header">
        <img className="header__logo" src="/static/pokedex-logo.png"></img>
      </header>
      <section>
        <div className="select-box m-bot-m">
          FILTER BY TYPE:
          <select
            className="form__select-full"
            value={filter}
            onChange={(e) => {
              console.log("masuk sini", e.target.value);
              setPageLocation(1);
              setFilter(e.target.value);
            }}
          >
            <option value="all">show all</option>
            {constant.POKEMON_TYPES.map((val, key) => (
              <option key={key} value={val.name}>
                {val.name}
              </option>
            ))}
          </select>
        </div>
        {filter === "all" && pokemonList
          ? pokemonList.map((val, key) => {
              return (
                <div
                  className="card"
                  key={key}
                  onClick={() => {
                    const splitted = val.url.split("/");
                    router.push(`/detail/${splitted[splitted.length - 2]}`);
                  }}
                >
                  <div className="card__item bold">{val.name}</div>
                  <span className="card__action">
                    <i className="ai-arrow-right" />
                  </span>
                </div>
              );
            })
          : pokemonListByType
          ? pokemonListByType.map((val, key) => {
              return (
                <div
                  className="card"
                  key={key}
                  onClick={() => {
                    const splitted = val.pokemon.url.split("/");
                    router.push(`/detail/${splitted[splitted.length - 2]}`);
                  }}
                >
                  <div className="card__item bold">{val.pokemon.name}</div>
                  <span className="card__action">
                    <i className="ai-arrow-right" />
                  </span>
                </div>
              );
            })
          : null}
        {isBottom ? (
          <div className="card">
            <div className="card__item">Loading...</div>
          </div>
        ) : null}
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
