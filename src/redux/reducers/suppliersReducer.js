import { suppliersAPI } from "../../api/restAPI";

const SET_SUPPLIERS = 'SET_SUPPLIERS';
const SET_SUPPLIER_INFO = 'SET_SUPPLIER_INFO';

let initialState = {
    suppliersItems: [],
    supplierInfo: {}
}

const suppliersReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_SUPPLIERS: {
            return {
                ...state,
                suppliersItems: action.suppliers
            };
        } 
        case SET_SUPPLIER_INFO: {
            return {
                ...state,
                supplierInfo: action.supplier
            }
        }
        default: return state;
    }
}

export default suppliersReducer;

export const setSuppliers= (suppliers) => ({type: SET_SUPPLIERS, suppliers});

export const getSuppliers = (jwt) => {
    return (dispatch) => {
        suppliersAPI.getSuppliers(jwt).then((response) => {
            dispatch(setSuppliers(response));
          });
    }
}

export const getSupplier = (jwt, supplierId) => {
    return (dispatch) => {
        suppliersAPI.getSupplier(jwt, supplierId).then((response) => {
            dispatch(setSupplierInfo(response));
        });
    }
}

export const setSupplierInfo= (supplier) => ({type: SET_SUPPLIER_INFO, supplier});

export const deleteSupplier = (jwt, supplierId) => {
    return (dispatch) => {
        suppliersAPI.deleteSupplier(jwt, supplierId);
        dispatch(getSuppliers(jwt));
    }
}

export const editSupplier = (jwt, supplierId, updatedSupplier) => {
    return (dispatch) => {
        suppliersAPI.editSupplier(jwt, supplierId, updatedSupplier);
        dispatch(getSuppliers(jwt));
    }
}

export const addSupplier = (jwt, newSupplier) => {
    return (dispatch) => {
        suppliersAPI.addSupplier(jwt, newSupplier);
        dispatch(getSuppliers(jwt));
    }
}

