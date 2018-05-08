import { ADD_COMPANY, FETCHED_ALL_COMPANYS, REMOVE_COMPANY} from '../actions/company'

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