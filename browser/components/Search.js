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
        console.log('search', search)
        return (

            <div>
                <div className='bg container-fluid'>
                    <div className='row offset-3'>
                        <div className='col-9'>
                            <div>
                                <ul className="nav nav-tabs">
                                    <li className={search === '/barcart' ? "nav-link active" : "nav-link"}><Link to='/barcart'>Bar Cart</Link></li>
                                    <li className={search === '/' ? "nav-link active" : "nav-link"}><Link to='/'>Search by Cocktails</Link></li>
                                    <li className={search === '/ingredients' ? "nav-link active" : "nav-link"}><Link to='/ingredients'>Search by Ingredients</Link></li>
                                </ul>


                                <div className="tab-content">

                                    <Route exact path='/barcart' component={SearchByInventory} />


                                    <Route exact path='/' component={SearchBarCocktail} />


                                    <Route exact path='/ingredients' component={SearchBarIngredients} />

                                </div>
                            </div>
                        </div>
                    </div>
                    <Route exact path='/' render={(route) => <SingleCocktail cocktail={cocktail} route={route} />} />
                    <Route exact path='/ingredients' render={(route) => <CocktailList cocktails={cocktails} route={route} />} />
                    <Route exact path='/barcart' render={(route) => <CanMake user={user} cocktails={cocktails} route={route} />} />
                    <div className='col-2'>
                        <Inventory />
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


