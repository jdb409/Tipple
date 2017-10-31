import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, Route, withRouter } from 'react-router-dom';
import Scroll from 'react-scroll';
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
        const Element = Scroll.Element;
        return (

            <div>
                <div className='bg container-fluid'>
                    <div className='row '>
                        <div className='col-9'>
                            <div>
                                <ul className="nav nav-tabs">
                                    <li className={search === '/' ? "nav-link active" : "nav-link"}><Link to='/'>Bar Cart</Link></li>
                                    <li className={search === '/cocktail' ? "nav-link active" : "nav-link"}><Link to='/cocktail'>Search by Cocktails</Link></li>
                                    <li className={search === '/ingredients' ? "nav-link active" : "nav-link"}><Link to='/ingredients'>Search by Ingredients</Link></li>
                                </ul>
                                <div className='row'>
                                    <div className='col-md-10 searchForm' id='search'>
                                        <Element name='cocktail'><Route exact path='/' component={SearchByInventory}></Route></Element>
                                        <Route exact path='/cocktail' component={SearchBarCocktail} />
                                        <Route exact path='/ingredients' component={SearchBarIngredients} />
                                    </div>
                                    <div className='col-md-2 inventory'>
                                        <Inventory />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Route exact path='/cocktail' render={(route) => <SingleCocktail cocktail={cocktail} route={route} />} />
                    <Route exact path='/ingredients' render={(route) => <CocktailList cocktails={cocktails} route={route} />} />
                    <Route exact path='/' render={(route) => <CanMake user={user} cocktails={cocktails} route={route} />} />

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


