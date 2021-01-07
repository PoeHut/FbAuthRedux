import libraries  from '../api/libraries.json'

export const selectLibrary = (id) => {
    return {
        type: 'SELECT_LIBRARY',
        payload: id
    }
}

export const getLibraries = () => libraries

export const selectedLibrary = (state = null, action) => {
    switch(action.type) {
        case 'SELECT_LIBRARY':
            return action.payload
        default:
            return state 
    }
}