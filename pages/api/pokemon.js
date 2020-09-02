import api from '../../services/api'
export default async (req, res) => {
    const x = await api.pokemonListRequest()
    console.log(x)
    res.send(x.data.results)
}