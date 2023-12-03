import { ordersAPI } from "../../api/restAPI";
import { setErrorMessage } from "./errorReducer";

const SET_ORDER = 'SET_ORDER';

let initialState = {
    order: {}
}

const orderInfoReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_ORDER: {
            return {
                ...state,
                order: action.order
            };
        }
        default: return state;
    }
}

export default orderInfoReducer;

export const setOrder = (order) => ({type: SET_ORDER, order});

export const getOrder = (jwt, orderId) => {
    return (dispatch) => {
        ordersAPI.getOrder(jwt, orderId).then((response) => {
            if(response.status == 404) dispatch(setErrorMessage(response.data.message));
            else dispatch(setOrder(response));
          });
    }
}