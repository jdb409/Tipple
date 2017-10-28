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
        console.log(input)
        this.setState({ query: input })
    }

    handleSubmit(ev) {
        ev.preventDefault();
        console.log(this.state.query);
        this.props.getCocktailsByIngredient(this.state.query);
    }

    render() {
        const { handleChange, handleSubmit } = this;
        const { query } = this.state;
        const { cocktails, ingredients } = this.props;
        return (
            <div>
                <form onSubmit={handleSubmit} style={{ 'width': '50%' }}>
                    <Select
                        options={ingredients.length && ingredients}
                        value={query}
                        onChange={handleChange}
                        placeholder="Search Cocktail by Ingredient"
                        className='dark-theme'
                    />
                    <br />
                    <button className='btn btn-primary'>Search</button>
                </form>
                {cocktails.length && cocktails.map(cocktail => {
                    return (<h1>{cocktail.name}</h1>);
                })}
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


// <h1>{cocktail.name} <span><img style={{ 'width': '50%' }} src={cocktail.photo} /></span></h1>
// <h2>{cocktail.instructions}</h2>
// <h3>
//     {cocktail.ingredientList && cocktail.ingredientList.map(ing => {
//         return (
//             <p key={ing}>{ing}</p>
//         );
//     })}
// </h3>