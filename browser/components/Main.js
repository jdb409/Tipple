import React, { Component } from 'react';
import ReactDom from 'react-dom';
import { Route, Switch, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import SearchBar from './SearchBar';

class Main extends Component {
    constructor() {
        super();
    }

    render() {
        return (
            <div>
                <h1> Make Me a Drink</h1>
            </div>
        );
    }
}

export default connect(null, null)(Main);
