import { productsAPI } from "../../api/restAPI";
import { setErrorMessage } from "./errorReducer";

const SET_PRODUCT = 'SET_PRODUCT';

let initialState = {
    product: {}
}

const productInfoReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_PRODUCT: {
            return {
                ...state,
                product: action.product
            };
        }
        default: return state;
    }
}

export default productInfoReducer;

export const setProduct = (product) => ({type: SET_PRODUCT, product});

export const getProduct = (jwt, productId) => {
    return (dispatch) => {
        productsAPI.getProduct(jwt, productId).then((response) => {
            if(response.status == 404) dispatch(setErrorMessage(response.data.message));
            else dispatch(setProduct(response));
          });
    }
}