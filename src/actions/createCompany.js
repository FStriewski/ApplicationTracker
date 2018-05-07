
import * as request from 'superagent'

const baseUrl = 'http://localhost:4009'

export const ADD_COMPANY = 'ADD_COMPANY'

export const createCompany = (company) => (dispatch) => {
  console.log(company)
  request
    .post(`${baseUrl}/companys`)
    .send(company)
    .then(response => dispatch({
      type: ADD_COMPANY,
      payload: response.body
    }))
}
