

export const BY_LANGUAGE = "BY_LANGUAGE"
export const BY_POSAVAILABLE = "BY_POSAVAILABLE"
export const BY_TERM = "BY_TERM"
export const UNDO = "UNDO"
export const BY_SCORE = "BY_SCORE"

export const filterByLanguage = (selection) => ({
    type: BY_LANGUAGE,
    payload: selection,
})

export const filterByPosition = (selection) => ({
    type: BY_POSAVAILABLE,
    payload: selection,
})

export const filterByTerm = (selection) => ({
    type: BY_TERM,
    payload: selection,
})

export const undo = () => ({
    type: UNDO,
    payload: "",
})

export const filterByScore = (selection) => ({
    type: BY_SCORE,
    payload: selection,
})


