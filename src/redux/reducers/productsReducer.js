import { productsAPI } from "../../api/restAPI";

const SET_PRODUCTS = 'SET_PRODUCTS';

let initialState = {
    productsItems: []
}

const productsReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_PRODUCTS: {
            return {
                ...state,
                productsItems: action.products
            };
        }
        default: return state;
    }
}

export default productsReducer;

export const setProducts= (products) => ({type: SET_PRODUCTS, products});

export const getProducts = (jwt) => {
    return (dispatch) => {
        productsAPI.getProducts(jwt).then((response) => {
            dispatch(setProducts(response));
          });
    }
}

export const deleteProduct = (jwt, productId) => {
    return () => {
        productsAPI.deleteProduct(jwt, productId);
    }
}

export const editProduct = (jwt, productId, updatedProduct) => {
    return (dispatch) => {
        productsAPI.editProduct(jwt, productId, updatedProduct);
        dispatch(getProducts(jwt));
    }
}

export const addProduct = (jwt, newProduct) => {
    return (dispatch) => {
        productsAPI.addProduct(jwt, newProduct);
        dispatch(getProducts(jwt));
    }
}

