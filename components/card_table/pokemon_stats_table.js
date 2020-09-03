import React, { useMemo } from "react";
import _ from "../../services/lodash";

const PokemonStatsTable = React.memo(({ data }) => {
  const isPokemonStatsDataEmpty = _.isEmpty(data);

  return (
    <div className="card card--vertical">
      <div className="card__item bold">Stats</div>
      <table>
        <thead>
          <tr>
            <th>Stat</th>
            <th>Power</th>
          </tr>
        </thead>

        {!isPokemonStatsDataEmpty ? (
          <tbody>
            {data.map((val, key) => {
              return (
                <tr key={key}>
                  <td className="fs-s">{val.stat.name}</td>
                  <td className="fs-s">{val.base_stat}</td>
                </tr>
              );
            })}
          </tbody>
        ) : null}
      </table>
    </div>
  );
});

export default PokemonStatsTable;
