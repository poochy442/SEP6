import axios from 'axios'

const URL = 'https://europe-central2-sep6-123456.cloudfunctions.net/';

export async function FunctionClient(endpoint, { method, params, body}){
  return axios({
      method: method,
      url: URL + endpoint,
      params: params,
			data: body
  }).then((response) => {
      return response
  }).catch((err) => {
      return err.response
  })
}

FunctionClient.review = function ({params, body}) {
  return FunctionClient('review', {method: 'POST', params, body })
}

FunctionClient.updateReview = function ({params, body}) {
  return FunctionClient('review', {method: 'PUT', params, body })
}