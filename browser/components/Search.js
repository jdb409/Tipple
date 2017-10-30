import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, Route, withRouter } from 'react-router-dom';
import { fetchBarcart } from '../store/barcart'

import SearchBarCocktail from './SearchBarCocktail';
import SearchBarIngredients from './SearchBarIngredients';
import SingleCocktail from './SingleCocktail';
import SearchByInventory from './SearchByInventory';
import CanMake from './CanMake';
import CocktailList from './CocktailList';
import Inventory from './Inventory';

class Search extends Component {
    constructor() {
        super();
        this.state = {
            search: '',
        }
    }

    componentDidMount() {

        this.setState({ search: this.props.location.pathname })

    }

    componentWillReceiveProps(next) {
        if (next.user.id) {
            this.props.fetchBarcart(next.user.id);
        }

    }

    render() {
        const { cocktail, cocktails, user } = this.props;
        const { search } = this.state;

        return (
            <div>
                <div className='bg container-fluid'>
                    <div className='row offset-3'>
                        <div>

                            <div className="card text-center card-inverse card-warning">
                                <div className="card-header container">

                                    <ul className="nav nav-pills card-header-tabs searchNav">
                                        <li className="nav-item">
                                            <Link to='/barcart' className={search === '/barcart' ? "nav-link active" : "nav-link"}>Bar Cart</Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link to='/' className={search === '/' ? "nav-link active" : "nav-link"}>Search by Cocktail</Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link to='/ingredients' className={search === '/ingredients' ? "nav-link active" : "nav-link"}>Search by Ingredient</Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>

                            <div className='row search'>
                                <div className = 'offset-4 align-self-center'>
                                    <Route exact path='/barcart' component={SearchByInventory} />
                                    <Route exact path='/' component={SearchBarCocktail} />
                                    <Route exact path='/ingredients' component={SearchBarIngredients} />
                                </div>
                            </div>
                        </div>

                        <Route exact path='/' render={(route) => <SingleCocktail cocktail={cocktail} route={route} />} />
                        <Route exact path='/ingredients' render={(route) => <CocktailList cocktails={cocktails} route={route} />} />
                        <Route exact path='/barcart' render={(route) => <CanMake user={user} cocktails={cocktails} route={route} />} />

                    </div>

                </div>
            </div>
        )
    }
}

const mapState = ({ cocktail, cocktails, user }) => {
    return { cocktail, cocktails, user }
}


const mapDispatchToProps = (dispatch) => {
    return {

        fetchBarcart: (userId) => {
            dispatch(fetchBarcart(userId))
        }

    }
}

export default withRouter(connect(mapState, mapDispatchToProps)(Search));


