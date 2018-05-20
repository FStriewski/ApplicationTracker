import { ADD_COMPANY, FETCHED_ALL_COMPANYS, REMOVE_COMPANY} from '../actions/company'
import { BY_LANGUAGE, BY_POSAVAILABLE, BY_TERM , UNDO} from '../actions/filter'
import undoable, { distinctState } from 'redux-undo'

const companysreducer = (state = [], action) => {

  const { past, present, future } = state

  switch (action.type) {

    case ADD_COMPANY:
      return [...state, action.payload]

    case FETCHED_ALL_COMPANYS:
      return action.payload

    case BY_LANGUAGE:
      return action.payload 

    case BY_POSAVAILABLE:
      return action.payload 

    case BY_TERM:
      console.log(action.payload)
      return action.payload

     case REMOVE_COMPANY:
      return state.filter(company => company.id !== action.payload)

    case UNDO:
      const previous = past[past.length - 1]
      const newPast = past.slice(0, past.length - 1)
      return {
        past: newPast,
        present: previous,
        future: [present, ...future]
      }

    default:
      return state
  }
}

const companys = undoable(companysreducer)

export default companys