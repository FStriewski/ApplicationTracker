export const BY_LANGUAGE = "BY_LANGUAGE"
export const BY_POSAVAILABLE = "BY_POSAVAILABLE"
export const BY_TERM = "BY_TERM"

export const filterByLanguage = (selection) => ({
    type: BY_LANGUAGE,
    payload: selection,
})

export const filterByPosition = (selection) => ({
    type: BY_POSAVAILABLE,
    payload: selection,
})

export const filterByTerm = (term) => ({
    type: BY_TERM,
    payload: term,
})




