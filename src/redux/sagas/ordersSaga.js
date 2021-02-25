import { call, put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
import * as type from '../actions/types';

function userOrdersService(data) {
    return axios.get(`/user/orders/${data.payload}`)
    .then(response => {return response.data.orders})
    .catch(error => {throw error.response.data.message})
}


function* userOrdersSaga(action) {
    try {
        const orders = yield call(userOrdersService, action);
        yield put({ type: type.USER_ORDERS_REQUEST_SUCCESS, orders})
    } catch (error) {
        yield put({ type: type.USER_ORDERS_REQUEST_FAILED, message: error})
    }
}


function userOrdersAddService(data) {
    return axios.post('/user/orders/add', data.payload)
    .then(response => {return response.data.orders})
    .catch(error => {throw error.response.data.message})
}


function* userOrdersAddSaga(action) {
    try {
        const orders = yield call(userOrdersAddService, action);
        yield put({ type: type.USER_ORDERS_REQUEST_SUCCESS, orders})
    } catch (error) {
        yield put({ type: type.USER_ORDERS_REQUEST_FAILED, message: error})
    }
}

function* ordersSaga() {
    yield takeEvery(type.USER_ORDERS_REQUEST, userOrdersSaga)
    yield takeEvery(type.USER_ORDERS_ADD, userOrdersAddSaga)
}

export default ordersSaga;