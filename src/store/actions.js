import * as actionTypes from './constants';

export const updateUsers = users => {
    return {type: actionTypes.UPDATE_USERS, payload: users}
}

export const updateHobbies = hobbies => {
    return {type: actionTypes.UPDATE_HOBBIES, payload: hobbies}
}