import React, { useMemo } from "react";
import _ from "../services/lodash";

const PokemonInfoBlock = ({ data, fetching, error, success }) => {
  if (fetching) return null; // could also return something, but the loading is very fast

  const isPokemonDataEmpty = useMemo(() => _.isEmpty(data), [data]);

  if (error) return "something went wrong, please refresh your browser";

  if (success && isPokemonDataEmpty) {
    return "pokemon does not exist";
  }

  return (
    <div className="card card--vertical">
      <div className="card__item bold">General Info</div>
      <div className="card__item">
        <span className="bold">Base Experience:</span> {data.baseExperience}
      </div>
      <div className="card__item">
        <span className="bold">Name:</span> {data.name}
      </div>
      <div className="card__item">
        <span className="bold">Height:</span> {data.height}
      </div>
      <div className="card__item">
        <span className="bold">Weight:</span> {data.weight}
      </div>
      <div className="card__item">
        <span className="bold">Types:</span>{" "}
        {data.types.map(
          (val, key) =>
            `${val.type.name}${key + 1 === data.types.length ? "" : ", "}`
        )}
      </div>
      {data.sprites.other["official-artwork"] ? (
        <div className="card__item">
          <span className="bold">Artwork:</span>{" "}
          <img src={data.sprites.other["official-artwork"].front_default} />
        </div>
      ) : null}
      <div className="card__item">
        <span className="bold">Sprites:</span>{" "}
        <img src={data.sprites.back_default} />{" "}
        <img src={data.sprites.front_default} />
      </div>
    </div>
  );
};

export default PokemonInfoBlock;
