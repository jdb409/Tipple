import React, { Component } from 'react';
import Select from 'react-styled-select'
import { connect } from 'react-redux';
import { mapIngredients } from '../store/ingredients';
import { getCocktailsByInventory } from '../store/cocktails';
import { filterBarCart, addLiquor, addIngredientToServer } from '../store/barcart';

import Inventory from './Inventory';


class SearchByInventory extends Component {
    constructor() {
        super();
        this.state = {
            query: ''
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

    addItem(ev) {
        ev.preventDefault();
        const { query } = this.state
        const { barcart, user } = this.props
        const itemName = this.getItem(query);
        
        if (barcart.indexOf(itemName) < 0) {
            if (user.id) {
                console.log('itemName', itemName.value)
                this.props.addIngredientToServer(itemName.value)
            } else {
                this.props.addLiquor(itemName.label);
            }

        }
        this.setState({ query: '' })
    }

    removeItem(id) {
        this.props.filterBarCart(this.props.barcart, id)
    }

    handleChange(input) {
        this.setState({ query: input })
    }

    handleSubmit(ev) {
        ev.preventDefault();
        this.props.getCocktailsByInventory(this.props.barcart);
    }

    render() {
        const { handleChange, handleSubmit, addItem, removeItem } = this;
        const { query } = this.state;
        const { ingredients, barcart } = this.props;
        console.log(this.state);

        return (
            <div>
                <div className='col-12'>
                    <h1 className='display-5'>Search your Barcart</h1>
                    <small className='text-muted'><p>Add bottles from your bar to see the cocktails you can make</p></small>

                    <form id='searchBar' onSubmit={addItem} style={{ 'width': '50%' }}>
                        <Select
                            options={ingredients.length && ingredients}
                            value={query}
                            onChange={handleChange}
                            placeholder="Search Cocktail by Ingredient"
                            className='dark-theme'
                            clearable={true}

                        />
                        <br />
                        <div className='row'>
                            <div className='col-4'>
                                <button type='submit' className='btn btn-info' >Add Ingredient</button>
                            </div>
                            <div className='col-4 offset-2'>
                                <button type='button' className='btn btn-primary' onClick={handleSubmit}>Search</button>
                            </div>
                        </div>
                    </form>
                </div>

            </div>
        )
    }
}

const mapStateToProps = ({ ingredients, cocktails, barcart, user }) => {
    return { ingredients, cocktails, barcart, user }
}

const mapDispatchToProps = (dispatch) => {
    return {
        mapIngredients: () => {
            dispatch(mapIngredients());
        },
        getCocktailsByInventory: (ingredients) => {
            dispatch(getCocktailsByInventory(ingredients));
        },
        filterBarCart: (barCart, removedId) => {
            dispatch(filterBarCart(barCart, removedId))
        },
        addLiquor: (liquor) => {
            dispatch(addLiquor(liquor));
        },
        addIngredientToServer: (userId, ingId) => {
            dispatch(addIngredientToServer(userId, ingId))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchByInventory);

