import axios from 'axios';

//Action Types

const GET_INGREDIENTS = 'GET_INGREDIENTS';

//Action Creators
const getIngredients = (ingredients) => {
    return {
        type: GET_INGREDIENTS,
        ingredients
    }
}

//Thunks

export const mapIngredients = () => {
    return (dispatch) => {
        axios.get(`/api/ingredients/`)
            .then(res => res.data)
            .then(ingredients => {
                ingredients = ingredients.map(cocktail => {
                    return { value: cocktail.id, label: cocktail.name };
                })
                dispatch(getIngredients(ingredients));
            })

    }
}

//Reducer

export default function (state = {}, action) {
    switch (action.type) {
        case GET_INGREDIENTS:
            return action.ingredients;
        default:
            return state;
    }
}