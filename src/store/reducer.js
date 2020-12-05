import * as actionTypes from './constants';

const initialState = {
    users: [],
    hobbies: []
}

const reducer = (state=initialState, action) => {
    switch(action.type) {
        case actionTypes.FETCH_DATA:
            let keys = Object.keys(action.payload.currentlyEditing);
            let users = action.payload.users.map((user, index) => {
                return {
                    ...user,
                    editing: keys.includes(''+index) ? true : false
                };
            });
            return {
                ...state,
                users: users,
                hobbies: action.payload.hobbies
            };
        case actionTypes.UPDATE_USERS_LOCAL:
            return {
                ...state,
                users: action.payload
            };
        default: 
            return {
                ...state
            };
    }
}

export default reducer;