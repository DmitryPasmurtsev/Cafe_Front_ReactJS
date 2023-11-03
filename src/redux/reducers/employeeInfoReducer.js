import { employeesAPI } from "../../api/restAPI";
import { setErrorMessage } from "./errorReducer";

const SET_EMPLOYEE = 'SET_EMPLOYEE';

let initialState = {
    employee: {}
}

const employeeInfoReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_EMPLOYEE: {
            return {
                ...state,
                employee: action.employee
            };
        }
        default: return state;
    }
}

export default employeeInfoReducer;

export const setEmployee = (employee) => ({type: SET_EMPLOYEE, employee});

export const getEmployee = (jwt, employeeId) => {
    return (dispatch) => {
        employeesAPI.getEmployee(jwt, employeeId)
        .then((response) => {
            if(response.status == 404) dispatch(setErrorMessage(response.data.message));
            else dispatch(setEmployee(response), setErrorMessage(""));
          });
    }
}