import React, { useMemo } from "react";
import _ from "../../services/lodash";

const PokemonAbilitiesTable = React.memo(({ data }) => {
  const isPokemonAbilitiesDataEmpty = _.isEmpty(data);

  return (
    <div className="card card--vertical">
      <div className="card__item bold">Abilities</div>
      <table>
        <thead>
          <tr>
            <th>Name of Ability</th>
            <th>URL For Additional Info</th>
          </tr>
        </thead>

        {!isPokemonAbilitiesDataEmpty ? (
          <tbody>
            {data.map((val, key) => {
              return (
                <tr key={key}>
                  <td className="fs-s">{val.ability.name}</td>
                  <td className="fs-s">
                    <a target="_blank" href={val.ability.url}>
                      {val.ability.url}
                    </a>
                  </td>
                </tr>
              );
            })}
          </tbody>
        ) : null}
      </table>
    </div>
  );
});

export default PokemonAbilitiesTable;
