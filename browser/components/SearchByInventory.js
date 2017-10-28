import React, { Component } from 'react';
import Select from 'react-styled-select'
import { connect } from 'react-redux';
import { mapIngredients } from '../store/ingredients';
import { getCocktailsByInventory } from '../store/cocktails';

class SearchByInventory extends Component {
    constructor() {
        super();
        this.state = {
            query: '',
            barCart: []
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.addItem = this.addItem.bind(this);
        this.getItem = this.getItem.bind(this);
        this.removeItem = this.removeItem.bind(this);
    }

    componentDidMount() {
        this.props.mapIngredients();
    }

    getItem(query) {
        return this.props.ingredients.find((ing) => {
            return ing.value === query
        })
    }

    addItem() {
        const { query, barCart } = this.state
        const itemName = this.getItem(query).label;
        if (barCart.indexOf(itemName) < 0) {
            this.setState({ barCart: barCart.concat(itemName) })
        }
    }
    handleChange(input) {
        console.log(input);
        this.setState({ query: input })
    }

    handleSubmit(ev) {
        ev.preventDefault();
        console.log('barcart',this.state.barCart);
        this.props.getCocktailsByInventory(this.state.barCart);
    }


    removeItem(id) {
        const filtered = this.state.barCart.filter(ing => {
            return ing !== id
        })

        this.setState({ barCart: filtered });
        console.log('filtered', filtered)
    }

    render() {
        const { handleChange, handleSubmit, addItem, removeItem } = this;
        const { query, barCart } = this.state;
        const { ingredients } = this.props;
        console.log(this.state);

        return (
            <div className='row'>
                <div className='col-10'>
                    <h1 className='display-5'>Search your Bar Cart</h1>
                    <small className='text-muted'><p>Add bottles from your bar to see the cocktails you can make</p></small>

                    <form onSubmit={handleSubmit} style={{ 'width': '50%' }}>
                        <Select
                            options={ingredients.length && ingredients}
                            value={query}
                            onChange={handleChange}
                            placeholder="Search Cocktail by Ingredient"
                            className='dark-theme'
                        />
                        <br />
                        <div className='row'>
                            <div className='col-4'>
                                <button type='button' className='btn btn-info' onClick={addItem}>Add Ingredient</button>
                            </div>
                            <div className='col-4 offset-2'>
                                <button className='btn btn-primary'>Search</button>
                            </div>
                        </div>
                    </form>
                </div>

                <div className='col-2 offset-0'>
                    <ul className='list-group' style={{ "listStyleType": "none" }}>
                        {barCart.map(ing => {
                            return (
                                <div key={ing}>
                                    <button type='button' className='btn btn-success btn-md' onClick={() => removeItem(ing)}>
                                        <li key={ing}>
                                            {ing}
                                        </li>
                                    </button>
                                    <br />
                                    <br />
                                </div>
                            );
                        })}
                    </ul>
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
        getCocktailsByInventory: (ingredients) => {
            dispatch(getCocktailsByInventory(ingredients));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchByInventory);

