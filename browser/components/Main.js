import React, { Component } from 'react';
import ReactDom from 'react-dom';
import { Route, Switch, withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';

import Search from './Search';


class Main extends Component {
    constructor() {
        super();
    }

    render() {
        return (
            <div>
                <Search />
            </div>
        );
    }
}

export default withRouter(connect(null, null)(Main));
