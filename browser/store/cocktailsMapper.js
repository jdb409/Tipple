import axios from 'axios';

//Action Types

const MAP = 'MAP';

//Action Creators
const map = (cocktails) => {
    return {
        type: MAP,
        cocktails
    }
}

//Thunks

export const mapCocktails = () => {
    return (dispatch) => {
        axios.get(`/api/cocktails/`)
            .then(res => res.data)
            .then(cocktails => {

                cocktails = cocktails.map(cocktail => {
                    return { value: cocktail.id, label: cocktail.name };
                })

                dispatch(map(cocktails));
            })

    }
}

//Reducer

export default function (state = {}, action) {
    switch (action.type) {
        case MAP:
            return action.cocktails;
        default:
            return state;
    }
}