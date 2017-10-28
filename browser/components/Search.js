import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, Route, withRouter } from 'react-router-dom';
import SearchBarCocktail from './SearchBarCocktail';
import SearchBarIngredients from './SearchBarIngredients';
import SingleCocktail from './SingleCocktail';
import CocktailList from './CocktailList';

class Search extends Component {
    constructor() {
        super();
        this.state = {
            search: ''
        }
    }

    componentWillReceiveProps(nextProps) {
        console.log(nextProps);
        this.setState({ search: nextProps.location.pathname })

    }
    render() {
        const { cocktail, cocktails } = this.props;
        const { search } = this.state;
    
        return (
            <div>
                <div className='bg container-fluid'>
                    <div className="row h-100 header">
                        <div className="col-sm-6 align-self-center offset-sm-3">
                            <div className="card text-center card-inverse card-warning">
                                <div className="card-header">
                                    <ul className="nav nav-tabs card-header-tabs">
                                        <li className="nav-item">
                                            <Link to='/' className="nav-link active">Cocktails</Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link to='/ingredients' className="nav-link">Ingredient</Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="card-block row search">
                                <div className="card-block align-self-center">

                                    <div className='col-sm-12 offset-sm-3'>
                                        <h1>Make me a Cocktail</h1>
                                        <Route exact path='/' component={SearchBarCocktail} />
                                        <Route exact path='/ingredients' component={SearchBarIngredients} />
                                    </div>
                                </div>

                            </div>
                        </div>

                    </div>
                </div>
                {search === '/' || '' ?
                    <SingleCocktail cocktail={cocktail} />
                    :
                    null}
                {search === '/ingredients' ?
                    <CocktailList cocktails={cocktails} />
                    :
                    null}
                
            </div>
        )
    }
}

const mapState = ({ cocktail, cocktails }) => {
    return { cocktail, cocktails }
}

export default withRouter(connect(mapState, null)(Search));


