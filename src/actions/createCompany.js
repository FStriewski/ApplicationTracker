
import * as request from 'superagent'

const baseUrl = 'http://localhost:4009'

export const ADD_COMPANY = 'ADD_COMPANY'

export const createCompany = (data) => (dispatch) => {
  console.log(data)
  request
    .post(`${baseUrl}/companys`)
    .send(data)
    .then(response => dispatch({
      type: ADD_COMPANY,
      payload: response.body
    }))
}
