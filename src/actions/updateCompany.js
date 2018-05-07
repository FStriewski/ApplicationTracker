import * as request from 'superagent'

const baseUrl = 'http://localhost:4009'

export const UPDATE_COMPANY = 'UPDATE_COMPANY'


export const updateCompany = (companyId, updates) => (dispatch) => {
    request
        .put(`${baseUrl}/companys/${companyId}`)
        .send(updates)
        .then(response => dispatch ({ 
            type: UPDATE_COMPANY,
            payload: response.body
        }) )
}