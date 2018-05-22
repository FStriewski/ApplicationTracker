import currentUser from '../reducers/currentUser'

describe('currentUser reducer', () => {
    const reducer = currentUser
    const initialState = null

    it('returns an empty array for the initial state', () => {
        expect(reducer()).toEqual(initialState)
    })
})