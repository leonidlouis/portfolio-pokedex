import React, { useMemo } from "react";
import _ from "../../services/lodash";

const PokemonAppearedTable = React.memo(({ data }) => {
  const isPokemonAppearedDataEmpty = _.isEmpty(data);

  return (
    <div className="card card--vertical">
      <div className="card__item bold">Appeared In</div>
      <table>
        <thead>
          <tr>
            <th>Name of Version</th>
            <th>URL For Additional Info</th>
          </tr>
        </thead>

        {!isPokemonAppearedDataEmpty ? (
          <tbody>
            {data.map((val, key) => {
              return (
                <tr key={key}>
                  <td className="fs-s">{val.version.name}</td>
                  <td className="fs-s">
                    <a target="_blank" href={val.version.url}>
                      {val.version.url}
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

export default PokemonAppearedTable;
