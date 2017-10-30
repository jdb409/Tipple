import React, { Component } from 'react';
import Select from 'react-styled-select'
import { connect } from 'react-redux';

import { getSingleCocktail } from '../store/cocktail';
import { mapCocktails } from '../store/cocktails';

class SearchBarCocktail extends Component {
    constructor() {
        super();
        this.state = {
            query: ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        this.props.mapCocktails();
    }

    handleChange(input) {

        this.setState({ query: input })
    }

    handleSubmit(ev) {
        ev.preventDefault();
        this.props.getSingleCocktail(this.state.query);
    }

    render() {
        const { handleChange, handleSubmit } = this;
        const { query } = this.state;
        const { cocktail, cocktails } = this.props;
        return (
            <div className='container text-center'>
                <h1>Search by Cocktail</h1>
                <div className='row'>
                    <div className='col-sm-offset-4'>
                        <form onSubmit={handleSubmit} style={{ 'width': '50%' }}>
                            <Select
                                options={cocktails.length && cocktails}
                                value={query}
                                onChange={handleChange}
                                placeholder="Search Cocktails"
                                className='dark-theme'
                            />
                            <br />
                            <button className='btn btn-primary'>Search</button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = ({ cocktail, cocktails }) => {
    return { cocktail, cocktails }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getSingleCocktail: (name) => {
            dispatch(getSingleCocktail(name));
        },
        mapCocktails: () => {
            dispatch(mapCocktails());
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchBarCocktail);


