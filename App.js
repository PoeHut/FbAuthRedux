import React from 'react'
import { Provider } from 'react-redux'
import {createStore, applyMiddleware}  from 'redux'
import thunk from 'redux-thunk'
import reducers  from './src/reducers'
import Routes  from './src/Routes'

const App = () => {
   return (
    <Provider store={createStore(reducers, applyMiddleware(thunk))}>
        <Routes />
    </Provider>
   )
}

export default App
