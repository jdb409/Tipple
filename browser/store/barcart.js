import axios from 'axios';

const ADD_LIQUOR = 'ADD_LIQUOR';
const REMOVE_LIQUOR = 'REMOVE_LIQUOR';
const GET_BARCART = 'GET_BARCART';

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


//thunks

export const fetchBarcart = (userId) => {
    if (!userId) return;
    console.log(userId);
    return (dispatch) => {
        axios.get(`/api/barcart/${userId}`)
            .then(res => res.data)
            .then(cart => {
                console.log(cart);
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
                    return;
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
    console.log('thuk',user);
    return (dispatch) => {
        axios.post(`/api/barcart/${user.id}`, { ingredient })
            .then(res => res.data)
            .then(ing => {
                console.log(ing)
                dispatch(addLiquor(ing))
                dispatch(fetchBarcart(user.id))
            }).catch(err => {
                console.log('err', err)
            })
    }
}

//reducer

export default function (state = [], action) {
    switch (action.type) {
        case ADD_LIQUOR:
            return [...state, action.liquor];
        case GET_BARCART:
            return action.barCart;
        default:
            return state;
    }
}