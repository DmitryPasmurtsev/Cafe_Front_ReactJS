import { deliveriesAPI } from "../../api/restAPI";

const SET_DELIVERIES = 'SET_DELIVERIES';
const SET_DELIVERY_INFO = 'SET_DELIVERY_INFO';

let initialState = {
    deliveries: [],
    deliveryInfo: {product: {id: ""}, supplier: {id: ""}, employee: {id: ""}}
}

const deliveriesReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_DELIVERIES: {
            return {
                ...state,
                deliveries: action.deliveries
            };
        }
        case SET_DELIVERY_INFO: {
            return {
                ...state,
                deliveryInfo: action.deliveryInfo
            }
        }
        default: return state;
    }
}

export default deliveriesReducer;

export const setDeliveries = (deliveries) => ({ type: SET_DELIVERIES, deliveries });

export const getDeliveries = (jwt) => {
    return (dispatch) => {
        deliveriesAPI.getDeliveries(jwt).then((response) => {
            dispatch(setDeliveries(response));
        });
    }
}

export const setDelivery = (deliveryInfo) => ({ type: SET_DELIVERY_INFO, deliveryInfo});

export const getDelivery = (jwt, deliveryId) => {
    return (dispatch) => {
        deliveriesAPI.getDelivery(jwt, deliveryId).then((response) => {
            dispatch(setDelivery(response));
        });
    }
}

export const deleteDelivery = (jwt, deliveryId) => {
    return (dispatch) => {
        deliveriesAPI.deleteDelivery(jwt, deliveryId);
        dispatch(getDeliveries(jwt));
    }
}

export const editDelivery = (jwt, deliveryId, updatedDelivery) => {
    return (dispatch) => {
        deliveriesAPI.editDelivery(jwt, deliveryId, updatedDelivery);
        dispatch(getDeliveries(jwt));
    }
}

export const addDelivery = (jwt, newDelivery) => {
    return (dispatch) => {
        deliveriesAPI.addDelivery(jwt, newDelivery);
        dispatch(getDeliveries(jwt));
    }
}

