import React, { Component } from 'react';
import { connect } from 'react-redux'
import { getSingleCocktail } from '../store/cocktail';

class SingleCocktail extends Component {


    render() {
        const { cocktail } = this.props;
        const { ingredients } = cocktail || [];

        return (

            <div>
                {cocktail.name && cocktail.name.length > 0 ?
                    <div className="card container" style={{ "width": "20rem" }}>
                        <div className="card-body">
                            <h4 className="card-title">{cocktail.name}</h4>
                            <p className="card-text">{cocktail.instructions}</p>
                        </div>
                        <ul className="list-group list-group-flush">
                            {ingredients && ingredients.map(ing => {
                                return (
                                    <li className="list-group-item" key={ing.id}>{ing.name} - {ing.mix.quantity}</li>

                                );
                            })}
                        </ul>
                    </div>
                    : null}
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