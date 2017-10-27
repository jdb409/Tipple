import { createStore, applyMiddleware, combineReducers } from 'redux';
import {createLogger} from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import cocktail from './cocktail';

const reducer = combineReducers({ cocktail });

const middleware = applyMiddleware(thunkMiddleware, createLogger({collapsed: true}));

const store = createStore(reducer, middleware);

export default store;
