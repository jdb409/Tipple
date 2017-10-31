import React, { Component } from 'react';
import { connect } from 'react-redux'
import { getSingleCocktail } from '../store/cocktail';

class SingleCocktail extends Component {


    render() {
        const { cocktail } = this.props;
        const { ingredients } = cocktail || [];

        return (

            <div className='bg-1'>
                <div className='container'>
                    {cocktail.name && cocktail.name.length > 0 ?
                        <div className='row'>
                            <div className='col-sm-2'>
                                <button className='btn btn-default btn-lg'>Like</button>
                            </div>
                            <div className='col-sm-10'>
                                <h1>{cocktail.name}</h1>
                                <p>{cocktail.instructions}</p>

                                <ul className="list-group">
                                    {ingredients && ingredients.map(ing => {
                                        return (
                                            <li className="list-group-item h2" key={ing.id}><strong>{ing.name} - {ing.mix.quantity}</strong></li>

                                        );
                                    })}
                                </ul>
                            </div>
                        </div>
                        : null}
                </div>
            </div>

        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getSingleCocktail: (name) => {
            dispatch(getSingleCocktail(name));
        },
    }
}


export default connect(null, mapDispatchToProps)(SingleCocktail);