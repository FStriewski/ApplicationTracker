import * as request from 'superagent'
export const REMOVE_COMPANY = 'REMOVE_COMPANY'


const baseUrl = 'http://localhost:4009'

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