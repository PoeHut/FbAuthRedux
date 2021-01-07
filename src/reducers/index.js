import {combineReducers}  from 'redux'
import * as Auth  from './Auth'
import { getLibraries, selectedLibrary }  from './LibraryReducer'

export default combineReducers({
    auth: Auth.reducer,
    library: getLibraries,
    selectedItem: selectedLibrary
})