import { ADD_COMPANY, FETCHED_ALL_COMPANYS, REMOVE_COMPANY} from '../actions/company'
import { BY_LANGUAGE, BY_POSAVAILABLE, BY_TERM , UNDO} from '../actions/filter'


// Reducer enhancer by redux recipe;
function undoable(reducer) {
  // Call the reducer with empty action to populate the initial state
  const initialState = {
    past: [],
    present: reducer(undefined, {}),
    future: []
  }

  // Return a reducer that handles undo and redo
  return function (state = initialState, action) {
    const { past, present, future } = state

    switch (action.type) {
      case 'UNDO':
        const previous = past[past.length - 2]
        const newPast = past.slice(0, past.length - 1)
        return {
          past: newPast,
          present: previous,
          future: [present, ...future]
        }
      default:
        // Delegate handling the action to the passed reducer
        const newPresent = reducer(present, action)
        if (present === newPresent) {
          return state
        }
        return {
          past: [...past, present],
          present: newPresent,
          future: []
        }
    }
  }
}



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
      return action.payload

     case REMOVE_COMPANY:
      return state.filter(company => company.id !== action.payload)

    case UNDO:
      return  state

    default:
      return state
  }
}

const companys = undoable(companysreducer)

export default companys