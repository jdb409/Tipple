import axios from 'axios';

//Action Types

const GET_RECO = 'GET_RECO';

//Action Creators
const getReco = (cocktails) => {
    return {
        type: GET_RECO,
        cocktails
    }
}

//Thunks

export const getRecos = (userId) => {
    return (dispatch) => {
        axios.get(`/api/likes/recommendation/${userId}`)
            .then(res => res.data)
            .then(cocktails => {

                dispatch(getReco(cocktails));

            })
    }
}

//Reducer

export default function (state = {}, action) {
    switch (action.type) {
        case GET_RECO:
            return action.cocktails;
        default:
            return state;
    }
}