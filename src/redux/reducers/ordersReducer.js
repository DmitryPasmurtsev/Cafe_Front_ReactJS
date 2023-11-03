import { ordersAPI } from "../../api/restAPI";
import { setErrorMessage } from "./errorReducer";

const SET_ORDERS = 'SET_ORDERS';

let initialState = {
    orders: []
}

const ordersReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_ORDERS: {
            return {
                ...state,
                orders: action.orders
            };
        }
        default: return state;
    }
}

export default ordersReducer;

export const setOrders= (orders) => ({type: SET_ORDERS, orders});

export const getOrders = (jwt) => {
    return (dispatch) => {
        ordersAPI.getOrders(jwt).then((response) => {
            dispatch(setOrders(response));
          });
    }
}

export const deleteOrder = (jwt, orderId) => {
    return (dispatch) => {
        ordersAPI.deleteOrder(jwt, orderId);
        dispatch(getOrders(jwt));
    }
}

export const addOrderRed = (jwt, order) => {
    return (dispatch) => {
        ordersAPI.addOrder(jwt, order).then((response) => {
            if(response.status != 200) dispatch(setErrorMessage(response.data.message));
            else dispatch(getOrders(jwt), setErrorMessage(response.data.message));
          });
        
    }
}

