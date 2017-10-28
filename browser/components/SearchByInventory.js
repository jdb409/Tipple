import React, { Component } from 'react';
import Select from 'react-styled-select'
import { connect } from 'react-redux';
import { mapIngredients } from '../store/ingredients';
import { getCocktailsByIngredient } from '../store/cocktails';

class SearchByInventory extends Component {
    constructor() {
        super();
        this.state = {
            query: '',
            barcart: []
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
        console.log(this.state.query);
        this.props.getCocktailsByIngredient(this.state.query);
    }

    render() {
        const { handleChange, handleSubmit } = this;
        const { query } = this.state;
        const { ingredients } = this.props;
        return (
            <div>
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
                            <button className='btn btn-info'>Add Ingredient</button>
                        </div>
                        <div className='col-4 offset-1'>
                            <button className='btn btn-primary'>Search</button>
                        </div>
                    </div>

                </form>

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

export default connect(mapStateToProps, mapDispatchToProps)(SearchByInventory);

