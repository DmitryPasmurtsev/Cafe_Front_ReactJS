import { combineReducers, createStore, applyMiddleware } from "redux";
import employeeInfoReducer from "./reducers/employeeInfoReducer";
import employeesReducer from "./reducers/employeesReducer";
import productInfoReducer from "./reducers/productInfoReducer";
import productsReducer from "./reducers/productsReducer";
import thunkMiddleware from "redux-thunk";
import {reducer as formReducer} from "redux-form"
import suppliersReducer from "./reducers/suppliersReducer";
import ordersReducer from "./reducers/ordersReducer";
import orderInfoReducer from "./reducers/orderInfoReducer";
import deliveriesReducer from "./reducers/deliveriesReducer";
import userInfoReducer from "./reducers/userInfoReducer";
import errorReducer from "./reducers/errorReducer";

let reducers = combineReducers({
    userInfo: userInfoReducer,
    employeesPage: employeesReducer,
    employeeInfoPage: employeeInfoReducer,
    productsPage: productsReducer,
    productInfoPage: productInfoReducer,
    suppliersPage: suppliersReducer,
    ordersPage: ordersReducer,
    orderInfoPage: orderInfoReducer,
    deliveriesPages: deliveriesReducer,
    errorMessage: errorReducer,
    form: formReducer
});

let store = createStore(reducers, applyMiddleware(thunkMiddleware));

export default store;