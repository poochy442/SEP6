import axios from 'axios'

const URL = 'https://api.themoviedb.org/3/';
const API_KEY = 'a6542eee3c051a7d9cb6ac8b8f313ebc';

export async function TMBDClient(endpoint, { method, params, body}){
  return axios({
      method,
      url: URL + endpoint,
      params: {...params, api_key: API_KEY}
  }).then((response) => {
      return response
  }).catch((err) => {
      return err.response
  })
}

TMBDClient.get = function (endpoint, {params = ''} ) {
  return TMBDClient(endpoint, {method: 'GET', params })
}