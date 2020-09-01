import axios from 'axios'
import config from '../config'

const api = axios.create({
  baseURL: config.apiURL,
  timeout: 10000
})


const pokemonListRequest = () => api.get('/pokemon')

export default {
  pokemonListRequest,
}
