import React, { Component } from 'react';
import Select from 'react-styled-select'
import { connect } from 'react-redux';
import Scroll from 'react-scroll';

import { mapIngredients } from '../store/ingredients';
import { getCocktailsByInventory } from '../store/cocktails';
import { filterBarCart, addLiquor, addIngredientToServer, fetchBarcart } from '../store/barcart';

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

        //either add ingredient to user or guest's cart
        if (barcart.indexOf(itemName.label) < 0) {
            if (user.id) {
                this.props.addIngredientToServer(user, itemName.label)
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
        const ScrollLink = Scroll.Link;

        return (

            <div className='container text-center bgSearch'>
                <h1>Search your Barcart</h1>
                <small className='text-muted'><p>Add bottles from your bar to see the cocktails you can make</p></small>
                <div className='row'>
                    <div className='col-sm-offset-4'>
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
                                    <button type='submit' className='btn btn-default' >Add Ingredient</button>
                                </div>
                                <div className='col-md-offset-5 col-sm-offset-3'>
                                    <ScrollLink to='result' smooth={true} offset={50} duration={500} className="navbar-brand" onClick={handleSubmit}>
                                        <button type='button' className='btn btn-default'>Search</button>
                                    </ScrollLink>
                                </div>
                            </div>
                        </form>
                    </div>
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

