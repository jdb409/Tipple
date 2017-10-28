import { createStore, applyMiddleware, combineReducers } from 'redux';
import {createLogger} from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import cocktail from './cocktail';
import cocktails from './cocktails';
import ingredients from './ingredients';

const reducer = combineReducers({ cocktail, cocktails, ingredients });

const middleware = applyMiddleware(thunkMiddleware, createLogger({collapsed: true}));

const store = createStore(reducer, middleware);

export default store;
