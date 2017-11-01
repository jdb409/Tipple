import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'
import { getSingleCocktail } from '../store/cocktail';
import { likeCocktail } from '../store/user';


class FullPageCocktail extends Component {

    componentDidMount() {

        this.props.getSingleCocktail(this.props.match.params.id)
    }
    render() {
        const { cocktail, user } = this.props;

        const { ingredients } = cocktail || [];

        return (
            <div className='fullpage'>

                <div className='container'>
                    <Link to='/'>Back</Link>
                    {cocktail.name && cocktail.name.length > 0 ?

                        <div className='row'>
                            <div className='col-sm-2'>
                                <button className='btn btn-default btn-lg' onClick={() => this.props.likeCocktail(user.id, cocktail.id)}>Like</button>
                            </div>
                            <div className='col-sm-10'>

                                <h2>{cocktail.name}</h2>
                                <p>{cocktail.instructions}</p>

                                <ul className="list-group-item">
                                    {ingredients && ingredients.map(ing => {
                                        return (
                                            <li className="list-group-item" key={ing.id}>{ing.name} - {ing.mix.quantity}</li>

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

const mapStateToProps = ({ cocktail, user }) => {
    return {
        cocktail, user
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        getSingleCocktail: (name) => {
            dispatch(getSingleCocktail(name));
        },
        likeCocktail: (userId, cocktailId) => {
            dispatch(likeCocktail(userId, cocktailId));
        }
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(FullPageCocktail);