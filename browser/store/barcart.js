import axios from 'axios';

const ADD_LIQUOR = 'ADD_LIQUOR';
const REMOVE_LIQUOR = 'REMOVE_LIQUOR';

export const addLiquor = (liquor) => {
    console.log('dasfasd',liquor);
    return {
        type: ADD_LIQUOR,
        liquor
    }
}

const removeLiquor = (barCart) => {
    return {
        type: removeLiquor,
        barCart
    }
}

//thunks

export const filterBarCart = (barCart, id) => {
    return (dispatch) => {
        const filtered = barCart.filter(ing => {
            return ing !== id
        })
        dispatch(removeLiquor(filtered))
    }
}



export default function (state = [], action) {
    switch (action.type) {
        case ADD_LIQUOR:
            return [...state, action.liquor];
        case removeLiquor:
            return action.barCart;
        default:
            return state;
    }
}