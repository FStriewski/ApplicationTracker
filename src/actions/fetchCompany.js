import * as request from 'superagent'

const baseUrl = 'http://localhost:4009'

export const FETCHED_DETAILED_COMPANY = 'FETCHED_DETAILED_COMPANY'
export const FETCHED_ALL_COMPANYS = 'FETCHED_ALL_COMPANYS'

export const fetchCompany = (companyId) => (dispatch) => {
  request
    .get(`${baseUrl}/companys/${companyId}`)
    .then(response => dispatch({
      type: FETCHED_DETAILED_COMPANY,
      payload: response.body
    }))
    .catch(err => alert(err))
}

export const fetchAllCompanys = () => (dispatch) => {
  request
    .get(`${baseUrl}/companys/`)
    .then(response => dispatch({
      type: FETCHED_ALL_COMPANYS,
      payload: response.body
    }))
    .catch(err => alert(err))

}
