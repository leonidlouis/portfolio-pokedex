import { END } from "redux-saga";
import PokemonActions from "../../redux/reducer/pokemon";
import { useSelector } from "react-redux";
import _ from "../../services/lodash";
import Header from "../../components/header";
import PokemonInfoBlock from "../../components/pokemon_info_block";
import PokemonAbilitiesTable from "../../components/card_table/pokemon_abilities_table";

import PokemonStatsTable from "../../components/card_table/pokemon_stats_table";
import PokemonAppearedTable from "../../components/card_table/pokemon_appeared_in_table";
import PokemonSkillsTable from "../../components/card_table/pokemon_skills_table";

const Detail = () => {
  const { fetching, success, error, data } = useSelector(
    (state) => state.pokemon
  );
  return (
    <section className="container container--center container--flex container--width-80">
      <Header showBackLink />
      <section>
        <PokemonInfoBlock
          fetching={fetching}
          success={success}
          error={error}
          data={data}
        />
        <PokemonAbilitiesTable data={data.abilities} />
        <PokemonStatsTable data={data.stats} />
        <PokemonAppearedTable data={data.gameIndices} />
        <PokemonSkillsTable data={data.moves} />
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
