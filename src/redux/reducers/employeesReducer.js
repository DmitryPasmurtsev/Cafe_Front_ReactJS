import { employeesAPI, positionsAPI } from "../../api/restAPI";
import { setErrorMessage } from "./errorReducer";

const SET_POSITIONS ='SET_POSITIONS';
const SET_EMPLOYEES = 'SET_EMPLOYEES';

let initialState = {
    employeesObjects: [],
    employeeName: '', 
    positions: []
}

const employeesReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_EMPLOYEES: {
            return {
                ...state,
                employeesObjects: [...action.employees]
            }
        }
        case SET_POSITIONS: {
            return {
                ...state,
                positions: [...action.positions]
            }
        }
        default: return state;
    }
}

export default employeesReducer;

export const setEmployees = (employees) => ({type: SET_EMPLOYEES, employees})
export const setPositions = (positions) => ({type: SET_POSITIONS, positions}) 

export const getPositions = (jwt) => {
    return (dispatch) => {
        positionsAPI.getPositions(jwt).then((response) => {
            dispatch(setPositions(response));
        })
    }
}

export const getEmployees = (jwt) => {
    return (dispatch) => {
        employeesAPI.getEmployees(jwt).then((response) => {
            dispatch(setEmployees(response));
          });
    }
}

export const deleteEmployee = (jwt, employeeId) => {
    return (dispatch) => {
        employeesAPI.deleteEmployee(jwt, employeeId);
        dispatch(getEmployees(jwt));
    }
}

export const editEmployee = async (jwt, employeeId, updatedEmployee) => {
    return async (dispatch) => {
        await employeesAPI.editEmployee(jwt, employeeId, updatedEmployee).then((response) => {
            if(response.status != 200) dispatch(setErrorMessage(response.data.message));
            else dispatch(getEmployees(jwt), setErrorMessage(''));
          });
    }
}

export const addEmployee = (jwt, employee) => {
    return (dispatch) => {
        employeesAPI.addEmployee(jwt, employee)
        .then((response) => {
            if(response.status != 200) dispatch(setErrorMessage(response.data.message));
            else  dispatch(getEmployees(jwt), setErrorMessage(''))
          });    
    }
}

