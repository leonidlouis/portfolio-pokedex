import React, { useMemo, Fragment } from "react";
import _ from "../services/lodash";
import constant from "../constant";
import BottomLoadingCard from "./bottom_loading_card";
import { useRouter } from "next/router";

const PokemonList = ({
  filter,
  pokemonList,
  pokemonListByType,
  error,
  success,
  isBottom,
  fetching,
}) => {
  if (fetching) return null; // could also return something, but the loading is very fast

  const router = useRouter();

  const isPokemonListEmpty = useMemo(() => _.isEmpty(pokemonList), [
    pokemonList,
  ]);
  const isPokemonListByTypeEmpty = useMemo(() => _.isEmpty(pokemonListByType), [
    pokemonListByType,
  ]);

  if (error) {
    return "something went wrong, please refresh your browser";
  }

  if (success && isPokemonListEmpty && isPokemonListByTypeEmpty) {
    return "pokemon of such type does not exist";
  }

  if (filter === constant.DEFAULT_TYPE_FILTER && !isPokemonListEmpty) {
    return (
      <Fragment>
        {pokemonList.map((val, key) => {
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
        })}
        <BottomLoadingCard isBottom={isBottom} />
      </Fragment>
    );
  }

  if (filter !== constant.DEFAULT_TYPE_FILTER && !isPokemonListByTypeEmpty) {
    return pokemonListByType.map((val, key) => {
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
    });
  }

  return "something went wrong, please refresh your browser";
};
export default PokemonList;
