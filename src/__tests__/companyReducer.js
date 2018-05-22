import company from '../reducers/company'

describe('company reducer', () => {
    const reducer = company
    const initialState = []

    it('returns an empty array for the initial state', () => {
        expect(reducer()).toEqual(initialState)
    })
})

// https://readest.codaisseur.com/courses/intermediate-bootcamp/05-redux-i/04-actions/03-reducing-action