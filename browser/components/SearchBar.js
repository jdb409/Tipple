import React, { Component } from 'react';
import { connect } from 'react-redux';

class SearchBar extends Component {
    constructor() {
        super();
        this.state = {
            input: ''
        }
    }

    render() {
        return (
            <form>
                <input type='text' />
            </form>
        )
    }
}

export default connect(null, null)(SearchBar);


