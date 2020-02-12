import React from 'react'
import reactDOM from 'react-dom'
import {Provider} from 'react-redux'
import { createStore, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'

import "bootstrap/dist/css/bootstrap.min.css"
import reducers from './reducers'
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";

import App from './components/App'

const STORE = createStore(reducers, applyMiddleware(thunk))

reactDOM.render(
    <Provider store={STORE}>
        <App />
    </Provider>,
    document.getElementById('root')
)