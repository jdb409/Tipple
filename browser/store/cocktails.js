import axios from 'axios';

//Action Types

const GET_COCKTAILS = 'GET_COCKTAILS';

//Action Creators
const getCocktails = (cocktails) => {
    return {
        type: GET_COCKTAILS,
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
                console.log(cocktails);
                dispatch(getCocktails(cocktails));
            })

    }
}

export const getCocktailsByIngredient = (id) => {
    return (dispatch) => {
        axios.get(`/api/ingredients/${id}`)
            .then(res => res.data)
            .then(cocktails => {
                dispatch(getCocktails(cocktails));
            })

    }
}

export const getCocktailsByInventory = (ingredients) => {
    console.log('thunk', ingredients)
    return (dispatch) => {
        axios.post(`/api/cocktails/findCocktails`, { ingredients })
            .then(res => res.data)
            .then(cocktails => {
                console.log('inventory', cocktails)
                dispatch(getCocktails(cocktails));
            })
    }
}

//Reducer

export default function (state = {}, action) {
    switch (action.type) {
        case GET_COCKTAILS:
            return action.cocktails;
        default:
            return state;
    }
}