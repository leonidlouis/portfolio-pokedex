import React, { useMemo } from "react";
import _ from "../../services/lodash";

const PokemonSkillsTable = React.memo(({ data }) => {
  const isPokemonSkillsDataEmpty = _.isEmpty(data);

  return (
    <div className="card card--vertical">
      <div className="card__item bold">List of Skills</div>
      <table>
        <thead>
          <tr>
            <th>Skill Name</th>
            <th>URL For Additional Info</th>
          </tr>
        </thead>

        {!isPokemonSkillsDataEmpty ? (
          <tbody>
            {data.map((val, key) => {
              return (
                <tr key={key}>
                  <td className="fs-s">{val.move.name}</td>
                  <td className="fs-s">
                    <a target="_blank" href={val.move.url}>
                      {val.move.url}
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

export default PokemonSkillsTable;
