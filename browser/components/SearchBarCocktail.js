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
        console.log(input)
        this.setState({ query: input })
    }

    handleSubmit(ev) {
        ev.preventDefault();
        console.log(this.state.query);
        this.props.getSingleCocktail(this.state.query);
    }

    render() {
        const { handleChange, handleSubmit } = this;
        const { query } = this.state;
        const { cocktail, cocktails } = this.props;
        return (
            <div>
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
                <h1>{cocktail.name} <span><img style={{ 'width': '50%' }} src={cocktail.photo} /></span></h1>
                <h2>{cocktail.instructions}</h2>
                <h3>
                    {cocktail.ingredientList && cocktail.ingredientList.map(ing => {
                        return (
                            <p key={ing}>{ing}</p>
                        );
                    })}
                </h3>


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


