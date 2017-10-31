import React, { Component } from 'react';
import ReactDom from 'react-dom';
import { Route, Switch, withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { me } from '../store/user';


import Search from './Search';

import FullPageCocktail from './FullPageCocktail';

import NavBar from './NavBar';
import Home from './Home';
import SignUp from './SignUp';


class Main extends Component {
    constructor() {
        super();
    }
    componentDidMount() {
        this.props.fetchUser();
    }


    render() {

        return (
            <div>
                <Route path='/' component={NavBar} />
                <Route path='/' component={Home} />
                <Route exact path='/' component={Search} />
                <Route exact path='/signup' component={Search} />
                <Route exact path='/ingredients' component={Search} />
                <Route exact path='/cocktail' component={Search} />
                <Route exact path='/profile' component={Search} />
                <Route exact path='/cocktail/:id' component={FullPageCocktail} />
            </div>
        );
    }
}


const mapStateToProps = ({ cocktail }) => {
    return {
        cocktail
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchUser: () => {
            dispatch(me());
        }

    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
