import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, Route, withRouter } from 'react-router-dom';
import SearchBarCocktail from './SearchBarCocktail';
import SearchBarIngredients from './SearchBarIngredients';
import SingleCocktail from './SingleCocktail';
import SearchByInventory from './SearchByInventory';
import CocktailList from './CocktailList';
import Inventory from './Inventory';

class Search extends Component {
    constructor() {
        super();
        this.state = {
            search: ''
        }
    }

    componentDidMount(){
        this.setState({ search: this.props.location.pathname })
    }

    render() {
        const { cocktail, cocktails } = this.props;
        const { search } = this.state;

        return (
            <div>
                <div className='bg container-fluid'>
                    <div className='row'>
                        <div className='col-10 box'>
                            <div className="row h-100 header">
                                <div className="col-sm-6 align-self-center offset-sm-3">
                                    <div className="card text-center card-inverse card-warning">
                                        <div className="card-header">
                                            <ul className="nav nav-tabs card-header-tabs">
                                                <li className="nav-item">
                                                    <Link to='/barcart' className="nav-link active">Bar Cart</Link>
                                                </li>
                                                <li className="nav-item">
                                                    <Link to='/' className="nav-link">Search by Cocktail</Link>
                                                </li>
                                                <li className="nav-item">
                                                    <Link to='/ingredients' className="nav-link">Search by Ingredient</Link>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>

                                    <div className='row'>
                                        <div className='col-12'>
                                            <div className="card-block row search">
                                                <div className="card-block align-self-center searchArea">
                                                    <div className='col-sm-12 offset-sm-2'>
                                                        <Route exact path='/barcart' component={SearchByInventory} />
                                                        <Route exact path='/' component={SearchBarCocktail} />
                                                        <Route exact path='/ingredients' component={SearchBarIngredients} />
                                                    </div>
                                                </div>

                                            </div>

                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                        <div className='col-2'>
                            <Inventory />
                        </div>
                    </div>
                </div>
                <div>
                    {
                        search === '/' || '' ?
                            <Route render={(route) => <SingleCocktail cocktail={cocktail} route={route} />} />
                            :
                            null
                    }
                    {
                        search === '/ingredients' || '/barcart' ?

                            <Route render={(route) => <CocktailList cocktails={cocktails} route={route} />} />
                            :
                            null
                    }
                </div>

            </div>
        )
    }
}

const mapState = ({ cocktail, cocktails }) => {
    return { cocktail, cocktails }
}

export default withRouter(connect(mapState, null)(Search));


