
import { END } from 'redux-saga'
import PokedexActions from '../redux/reducer/pokedex'
import {useSelector} from 'react-redux'
import { wrapper } from '../redux/index'

const Index = () => {
  const obj= useSelector(state => state.pokedex)
  const { fetching, success, error, pokemonList } = useSelector(state => state.pokedex)

  console.log(fetching, success, error, pokemonList, obj)
  return (
    <div>
      {pokemonList ? pokemonList.map((val, key) => <div key={key}>{val.name}</div>) : null}
    </div>
  )
  
}

// Index.getInitialProps = async ({ store, isServer }) => {
  // store.dispatch(PokedexActions.getPokemonListRequest())
  // if (isServer) {
  //   store.dispatch(END)
  //   await store.sagaTask.toPromise()
  // }
//   // return store
// }

export const getStaticProps = wrapper.getStaticProps(async ({ store }) => {
  store.dispatch(PokedexActions.getPokemonListRequest())
  store.dispatch(END)
  await store.sagaTask.toPromise()
})

export default Index