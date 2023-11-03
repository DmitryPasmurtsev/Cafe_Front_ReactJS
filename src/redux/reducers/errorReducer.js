const SET_ERROR_MESSAGE = 'SET_ERROR_MESSAGE';

let initialState = {
    errorMessage: "", 
}

const errorReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_ERROR_MESSAGE: {
            return {
                ...state,
                errorMessage: action.message
            }
        }
        default: return state;
    }
}

export default errorReducer;

export const setErrorMessage = (message) => ({type: SET_ERROR_MESSAGE, message})


