import { END } from "redux-saga";
import PokemonActions from "../../redux/reducer/pokemon";
import { useSelector, useDispatch } from "react-redux";
import _ from "../../services/lodash";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const Detail = () => {
  const { fetching, success, error, data } = useSelector(
    (state) => state.pokemon
  );

  const router = useRouter();

  // const dispatch = useDispatch()
  console.log(data);
  return (
    <section className="container container--center container--flex container--width-80">
      <header className="header">
        <div
          onClick={() => {
            router.push(`/`);
          }}
          className="bold"
        >
          <i className="ai-left" />
          &nbsp;Go Back
        </div>
        <img className="header__logo" src="/static/pokedex-logo.png"></img>
      </header>
      <section>
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
              {data.sprites.other["official-artwork"].front_default ? (
                <img
                  src={data.sprites.other["official-artwork"].front_default}
                />
              ) : null}
            </div>
          ) : null}
          <div className="card__item">
            <span className="bold">Sprites:</span>{" "}
            <img src={data.sprites.back_default} />{" "}
            <img src={data.sprites.front_default} />
          </div>
        </div>

        <div className="card card--vertical">
          <div className="card__item bold">Abilities</div>
          <table>
            <thead>
              <tr>
                <th>Name of Ability</th>
                <th>URL For Additional Info</th>
              </tr>
            </thead>

            {!_.isEmpty(data.abilities) ? (
              <tbody>
                {data.abilities.map((val, key) => {
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

        <div className="card card--vertical">
          <div className="card__item bold">Stats</div>
          <table>
            <thead>
              <tr>
                <th>Stat</th>
                <th>Power</th>
              </tr>
            </thead>
            {!_.isEmpty(data.stats) ? (
              <tbody>
                {data.stats.map((val, key) => {
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

        <div className="card card--vertical">
          <div className="card__item bold">Appeared In</div>
          <table>
            <thead>
              <tr>
                <th>Name of Version</th>
                <th>URL For Additional Info</th>
              </tr>
            </thead>
            {!_.isEmpty(data.gameIndices) ? (
              <tbody>
                {data.gameIndices.map((val, key) => {
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

        <div className="card card--vertical">
          <div className="card__item bold">List of Skills</div>
          <table>
            <thead>
              <tr>
                <th>Skill Name</th>
                <th>URL For Additional Info</th>
              </tr>
            </thead>
            {!_.isEmpty(data.moves) ? (
              <tbody>
                {data.moves.map((val, key) => {
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
      </section>
    </section>
  );
};

Detail.getInitialProps = async ({ store, isServer, query }) => {
  store.dispatch(PokemonActions.getPokemonDetailRequest(query.id));
  if (isServer) {
    store.dispatch(END);
    await store.sagaTask.toPromise();
  }
};

export default Detail;
