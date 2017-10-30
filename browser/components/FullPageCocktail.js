import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'
import { getSingleCocktail } from '../store/cocktail';

class FullPageCocktail extends Component {

    componentDidMount() {

        this.props.getSingleCocktail(this.props.match.params.id)
    }
    render() {
        const { cocktail } = this.props;

        const { ingredients } = cocktail || [];

        return (
            <div className='fullpage'>
                
                <div className='container'>
                <Link to='/'>Back</Link>
                    {cocktail.name && cocktail.name.length > 0 ?
                        <div>

                            <h4>{cocktail.name}</h4>
                            <p>{cocktail.instructions}</p>

                            <ul className="list-group-item">
                                {ingredients && ingredients.map(ing => {
                                    return (
                                        <li className="list-group-item" key={ing.id}>{ing.name} - {ing.mix.quantity}</li>

                                    );
                                })}
                            </ul>
                        </div>
                        : null}
                </div>
            </div>
        );
    }
}

const mapStateToProps = ({ cocktail }) => {
    return {
        cocktail
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        getSingleCocktail: (name) => {
            dispatch(getSingleCocktail(name));
        },
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(FullPageCocktail);