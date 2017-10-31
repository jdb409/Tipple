import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getCocktailsByInventory } from '../store/cocktails';

class Profile extends Component {
    componentDidMount() {
        if (this.props.barcart.length) {
            this.props.getCocktailsByInventory(this.props.barcart);
        }
    }
    render() {

        const cocktails = this.props.cocktails || [];
        const exact = cocktails.exact || [];
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
                </div>
            </div>
        );
    }
}

const mapState = ({ barcart, cocktails, user }) => {
    return {
        barcart, cocktails, user
    }
}

const mapDispatch = (dispatch) => {
    return {
        getCocktailsByInventory: (ingredients) => {
            dispatch(getCocktailsByInventory(ingredients));
        }
    }
}

export default connect(mapState, mapDispatch)(Profile);