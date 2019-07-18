import React from 'react';
import { render } from 'react-dom';
import { createBrowserHistory } from "history";
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { Routes } from './Routes';
import configureStore from './store';

const store = configureStore();
const hist = createBrowserHistory();

render(
    <Provider store={store}>
        <Router history={hist}>
            <Routes />
        </Router>
    </Provider>,
    document.getElementById('root')
);
