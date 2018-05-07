import {ADD_COMPANY} from '../actions/createCompany'
import {FETCHED_ALL_COMPANYS } from '../actions/fetchCompany'
import { REMOVE_COMPANY } from '../actions/removeCompany'

export default function (state = [], action) {
  switch (action.type) {

    case ADD_COMPANY:
      return [...state, action.payload]

    case FETCHED_ALL_COMPANYS:
      return action.payload

     case REMOVE_COMPANY:
      return state.filter(company => company.id !== action.payload)

    default:
      return state
  }
}