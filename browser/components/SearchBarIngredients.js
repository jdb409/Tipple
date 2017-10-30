import React, { Component } from 'react';
import Select from 'react-styled-select'
import { connect } from 'react-redux';
import { mapIngredients } from '../store/ingredients';
import { getCocktailsByIngredient } from '../store/cocktails';

class SearchBarCocktailIngredients extends Component {
    constructor() {
        super();
        this.state = {
            query: ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        this.props.mapIngredients();
    }

    handleChange(input) {
        this.setState({ query: input })
    }

    handleSubmit(ev) {
        ev.preventDefault();

        this.props.getCocktailsByIngredient(this.state.query);
    }

    render() {
        const { handleChange, handleSubmit } = this;
        const { query } = this.state;
        const { cocktails, ingredients } = this.props;
        return (
            <div className='container text-center bgSearch'>
                <h1>Search by Ingredient</h1>
                <div className='row'>
                    <div className='col-sm-offset-4'>
                        <form onSubmit={handleSubmit} style={{ 'width': '50%' }}>
                            <Select
                                options={ingredients.length && ingredients}
                                value={query}
                                onChange={handleChange}
                                placeholder="Search Cocktail by Ingredient"
                                className='dark-theme'
                            />
                            <br />
                            <button className='btn btn-default'>Search</button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = ({ ingredients, cocktails }) => {
    return { ingredients, cocktails }
}

const mapDispatchToProps = (dispatch) => {
    return {
        mapIngredients: () => {
            dispatch(mapIngredients());
        },
        getCocktailsByIngredient: (id) => {
            dispatch(getCocktailsByIngredient(id));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchBarCocktailIngredients);
