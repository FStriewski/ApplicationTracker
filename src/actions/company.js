
import * as request from 'superagent'

const baseUrl = 'http://localhost:4009'

export const ADD_COMPANY = 'ADD_COMPANY'
export const FETCHED_DETAILED_COMPANY = 'FETCHED_DETAILED_COMPANY'
export const FETCHED_ALL_COMPANYS = 'FETCHED_ALL_COMPANYS'
export const REMOVE_COMPANY = 'REMOVE_COMPANY'
export const UPDATE_COMPANY = 'UPDATE_COMPANY'


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

export const removeCompany = (companyId) => (dispatch) => {
  request
    .delete(`${baseUrl}/companys/${companyId}`)
    .then(response => dispatch({
      type: REMOVE_COMPANY,
      payload: response.body
    })
    )
    //.then(response => dispatch)
    .catch(error => alert(error))
}

export const updateCompany = (companyId, updates) => (dispatch) => {
  request
    .put(`${baseUrl}/companys/${companyId}`)
    .send(updates)
    .then(response => dispatch({
      type: UPDATE_COMPANY,
      payload: response.body
    }))
}