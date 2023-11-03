import { authAPI} from "../../api/restAPI";

const SET_JWT = 'SET_JWT';
const SET_USER = 'SET_USER';

let initialState = {
    jwt: "",
    user: {}
}

const userInfoReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER: {
            return {
                ...state,
                user: action.user
            };
        }
        case SET_JWT: {
            return {
                ...state,
                jwt: action.jwt
            };
        }
        default: return state;
    }
}

export default userInfoReducer;

export const setUser = (user) => ({type: SET_USER, user});
export const setJwt = (jwt) => ({type: SET_JWT, jwt});

export const authentication = (authRequest) => {
    return (dispatch) => {
        authAPI.authentication(authRequest).then((response) => {
            dispatch(setUser(response.user));
            dispatch(setJwt(response.jwt));
          });
    }
}