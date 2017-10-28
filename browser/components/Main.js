import React, { Component } from 'react';
import ReactDom from 'react-dom';
import { Route, Switch, withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';

import Search from './Search';
import SingleCocktail from './SingleCocktail';
import FullPageCocktail from './FullPageCocktail';


class Main extends Component {
    constructor() {
        super();
    }

    render() {
        return (
            <div>
                <Route exact path='/' component={Search} />
                <Route exact path='/ingredients' component={Search} />
                <Route exact path='/barcart' component={Search} />
                <Route exact path='/cocktail/:id' component={FullPageCocktail} />
            </div>
        );
    }
}

export default withRouter(connect(null, null)(Main));
