import axios from 'axios';

const ADD_LIQUOR = 'ADD_LIQUOR';
const GET_BARCART = 'GET_BARCART';
const CLEAR_CART = 'CLEAR_CART';

export const addLiquor = (liquor) => {

    return {
        type: ADD_LIQUOR,
        liquor
    }
}

const getBarCart = (barCart) => {
    return {
        type: GET_BARCART,
        barCart
    }
}

export const clearCart = () => {
    return {
        type: CLEAR_CART
    }
}


//thunks

export const fetchBarcart = (userId) => {
    if (!userId) return;

    return (dispatch) => {
        axios.get(`/api/barcart/${userId}`)
            .then(res => res.data)
            .then(cart => {

                dispatch(getBarCart(cart))
            })
    }
}


export const filterBarCart = (barCart, ingredient, userId) => {
    return (dispatch) => {
        if (userId) {
            axios.delete(`/api/barcart/${userId}/${ingredient}`, { ingredient })
                .then(res => res.data)
                .then(() => {
                    return dispatch(fetchBarcart(userId));

                })
        } else {
            const filtered = barCart.filter(ing => {
                return ing !== ingredient
            })
            dispatch(getBarCart(filtered))
        }
    }
}

export const addIngredientToServer = (user, ingredient) => {
    if (!user.id) return;
    return (dispatch) => {
        axios.post(`/api/barcart/${user.id}`, { ingredient })
            .then(res => res.data)
            .then(ing => {
                dispatch(addLiquor(ing))
                dispatch(fetchBarcart(user.id))
            }).catch(console.log);
    }
}

//reducer

export default function (state = [], action) {
    switch (action.type) {
        case ADD_LIQUOR:
            return [...state, action.liquor];
        case GET_BARCART:
            return action.barCart;
        case CLEAR_CART:
            return [];
        default:
            return state;
    }
}