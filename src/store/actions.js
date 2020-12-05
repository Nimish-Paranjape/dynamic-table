import * as actionTypes from './constants';

export const updateData = updatedObj => {
    return {
        type: actionTypes.UPDATE_DATA, 
        payload: updatedObj
    };
}

export const addUser = updatedObj => {
    return {
        type: actionTypes.ADD_USER,
        payload: updatedObj
    };
}

export const fetchDataInit = currentlyEditing => {
    return {
        type: actionTypes.FETCH_DATA_INIT,
        payload: currentlyEditing
    };
}

export const fetchData = data => {
    return {
        type: actionTypes.FETCH_DATA,
        payload: data
    };
}

export const deleteUser = id => {
    return {
        type: actionTypes.DELETE_USER,
        payload: id
    }
}

export const updateUsersLocal = users => {
    return {
        type: actionTypes.UPDATE_USERS_LOCAL,
        payload: users
    }
}