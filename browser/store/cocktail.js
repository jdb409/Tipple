import axios from 'axios';

//Action Types

const GET_COCKTAIL = 'GET_COCKTAIL';

//Action Creators
const getCocktail = (cocktail) => {
    return {
        type: GET_COCKTAIL,
        cocktail
    }
}

//Thunks

export const getSingleCocktail = (name) => {
    return (dispatch) => {
        axios.get(`/api/cocktails/${name}`)
            .then(res => res.data)
            .then(cocktail => {
                dispatch(getCocktail(cocktail));
            })
    }
}

//Reducer

export default function (state = {}, action) {
    switch (action.type) {
        case GET_COCKTAIL:
            return Object.assign({}, state, action.cocktail);
        default:
            return state;
    }
}