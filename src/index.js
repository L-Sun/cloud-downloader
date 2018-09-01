import React from 'react'
import { render } from 'react-dom'
import { createStore, compose, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import createSagaMiddleware from 'redux-saga';

import rootReducer from './reducers'
import rootSaga from './sagas'
import App from './containers/App'

const rootElement = document.getElementById('root')
const sagaMiddleware = createSagaMiddleware()

let store
if (!(window.__REDUX_DEVTOOLS_EXTENSION__ || window.__REDUX_DEVTOOLS_EXTENSION__)) {
    store = createStore(rootReducer, compose(
        applyMiddleware(sagaMiddleware),
    ))
} else {
    store = createStore(rootReducer, compose(
        applyMiddleware(sagaMiddleware),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    ))
}


sagaMiddleware.run(rootSaga)

render(
    <Provider store={store}>
        <App />
    </Provider>,
    rootElement
)