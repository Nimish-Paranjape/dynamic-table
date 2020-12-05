import * as actionTypes from './constants';

const initialState = {
    users: [
        {name: 'Female1', gender: 'female', hobbies: 'reading', active: 'No', editing: false},
        {name: 'Female2', gender: 'female', hobbies: 'music', active: 'Yes', editing: false},
        {name: 'Female3', gender: 'female', hobbies: 'pilates', active: 'Yes', editing: false}
    ],
    hobbies: ['dancing']
}

const reducer = (state=initialState, action) => {
    switch(action.type) {
        case actionTypes.UPDATE_USERS:
            return {
                ...state,
                users: action.payload
            };
        case actionTypes.UPDATE_HOBBIES:
            return {
                ...state,
                hobbies: action.payload
            };
        default: 
            return {
                ...state
            }
    }
}

export default reducer;