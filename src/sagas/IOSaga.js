import { put, takeEvery } from 'redux-saga/effects';
import { fetchData, fetchDataInit } from '../store/actions'
import * as actionTypes from '../store/constants';

export function* ioSaga(action) {
    yield takeEvery(actionTypes.FETCH_DATA_INIT, fetchDataSaga);
    yield takeEvery(actionTypes.ADD_USER, addUserSaga);
    yield takeEvery(actionTypes.UPDATE_DATA, updateDataSaga);
    yield takeEvery(actionTypes.DELETE_USER, deleteUserSaga);
}

function* fetchDataSaga(action) {
    const usersData = yield localStorage.getItem('users');
    const hobbiesData = yield localStorage.getItem('hobbies');
    let users = [];
    let hobbies = [];
    if(usersData)
        users = JSON.parse(usersData);
    if(hobbiesData)
        hobbies = JSON.parse(hobbiesData);
    yield put(fetchData({users: users, hobbies: hobbies, currentlyEditing: action.payload}));
}

function* addUserSaga(action) {
    const newUser = action.payload.newUser;
    const newHobbies = action.payload.updatedHobbies;
    let users = [];
    const usersData = yield localStorage.getItem('users');
    if(usersData)
        users = JSON.parse(usersData);
    users.push(newUser);
    yield localStorage.setItem('users', JSON.stringify(users));
    yield localStorage.setItem('hobbies', JSON.stringify(newHobbies));
    yield put(fetchDataInit({}));
}

function* updateDataSaga(action) {
    const id = action.payload.id;
    let usersData = yield localStorage.getItem('users');
    let users = JSON.parse(usersData);
    users[id] = action.payload.updatedUser;
    delete users[id].editing;
    yield localStorage.setItem('users', JSON.stringify(users));
    yield localStorage.setItem('hobbies', JSON.stringify(action.payload.newHobbies));
    yield put(fetchDataInit(action.payload.currentlyEditing));
}

function* deleteUserSaga(action) {
    const id = action.payload;
    let usersData = yield localStorage.getItem('users');
    let users = JSON.parse(usersData);
    users.splice(id, 1);
    yield localStorage.setItem('users', JSON.stringify(users));
    yield put(fetchDataInit({}));
}