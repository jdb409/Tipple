import React, { Component } from 'react';
import ReactDom from 'react-dom';
import { Route, Switch, withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { me } from '../store/user';


import Search from './Search';
import FullPageCocktail from './FullPageCocktail';

import NavBar from './NavBar';
import Home from './Home';


class Main extends Component {
    constructor() {
        super();
    }
    componentDidMount() {
        this.props.fetchUser();
    }
   

    render() {
        // <Route path='/' component={NavBar} />
        return (
            <div>
                
                <Route path='/' component={Home} />
                <Route exact path='/' component={Search} />
                <Route exact path='/ingredients' component={Search} />
                <Route exact path='/barcart' component={Search} />
                <Route exact path='/cocktail/:id' component={FullPageCocktail} />

            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchUser: () => {
            dispatch(me());
        }

    }
}

export default withRouter(connect(null, mapDispatchToProps)(Main));
