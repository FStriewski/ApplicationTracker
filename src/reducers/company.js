import { FETCHED_DETAILED_COMPANY, UPDATE_COMPANY } from '../actions/company'

export default function (state = [], action) {

    switch (action.type) {
        case FETCHED_DETAILED_COMPANY:
            return action.payload
        case UPDATE_COMPANY:
            if (action.payload.id === state.id) {
                return action.payload
            }
            else return state
        default:
            return state

        }

    }

    