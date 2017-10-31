import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getCocktailsByInventory } from '../store/cocktails';
import { getRecos } from '../store/recommendation'

class Profile extends Component {
    componentDidMount() {
        if (this.props.user.id > 0) {
            this.props.getRecos(this.props.user.id)
        }
        if (this.props.barcart.length) {
            this.props.getCocktailsByInventory(this.props.barcart);
        }
    }
    render() {

        const cocktails = this.props.cocktails || [];
        const exact = cocktails.exact || [];
        const recoDrinks = this.props.recommendation || [];

        return (
            <div className='container text-center bgSearch'>
                <h1>Welcome Back {this.props.user.email}</h1>


                        <h3>You can make:</h3>
                        <div className='container'>
                            <ul className='list-group-item'>
                                {exact.map(drink => {
                                    return (
                                        <Link key={drink.id} to={`/cocktail/${drink.id}`}><li className="list-group-item">{drink.name}</li></Link>
                                    );
                                })}
                            </ul>


                            <h3>Recommendations</h3>

                            <ul className='list-group-item'>
                                {recoDrinks.length && recoDrinks.map(drink => {
                                    return (
                                        <Link key={drink.id} to={`/cocktail/${drink.id}`}><li className="list-group-item">{drink.name}</li></Link>
                                    );
                                })}
                            </ul>


                </div>
            </div>
        );
    }
}

const mapState = ({ barcart, cocktails, user, recommendation }) => {
    return {
        barcart, cocktails, user, recommendation
    }
}

const mapDispatch = (dispatch) => {
    return {
        getCocktailsByInventory: (ingredients) => {
            dispatch(getCocktailsByInventory(ingredients));
        },
        getRecos: (userId) => {
            dispatch(getRecos(userId));
        }
    }
}

export default connect(mapState, mapDispatch)(Profile);