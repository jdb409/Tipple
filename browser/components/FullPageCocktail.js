import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'
import { getSingleCocktail } from '../store/cocktail';

class FullPageCocktail extends Component {

    componentDidMount() {
        console.log('sadfds', this.props);
        this.props.getSingleCocktail(this.props.match.params.id)
    }
    render() {
        const { cocktail } = this.props;
        console.log(this.props);

        return (
            <div>
                <Link to='/'>Back</Link>
                <div className="card container" style={{ "width": "20rem" }}>
                    <div className="card-body">
                        <h4 className="card-title">{cocktail.name}</h4>
                        <p className="card-text">{cocktail.instructions}</p>
                    </div>
                    <ul className="list-group list-group-flush">
                        {cocktail.ingredientList && cocktail.ingredientList.map(ing => {
                            return (
                                <li className="list-group-item" key={ing}>{ing}</li>
                            );
                        })}
                    </ul>
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