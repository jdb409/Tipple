import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getSingleCocktail } from '../store/cocktail';
import Select from 'react-select';
import axios from 'axios';

class SearchBar extends Component {
    constructor() {
        super();
        this.state = {
            query: ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(ev) {
        this.setState({ query: ev.target.value })
    }

    handleSubmit(ev) {
        ev.preventDefault();
        console.log(this.state);
        this.props.getSingleCocktail(this.state.query);
    }

    render() {
        const { handleChange, handleSubmit } = this;
        const { query } = this.state;
        const { cocktail } = this.props;
        console.log(cocktail);
        return (
            <div>
                <form onSubmit={handleSubmit}>
                    <input
                        type='text'
                        onChange={handleChange}
                        value={query}
                    />
                    <button>Search</button>
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

const mapStateToProps = ({ cocktail }) => {
    return { cocktail }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getSingleCocktail: (name) => {
            dispatch(getSingleCocktail(name));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);


