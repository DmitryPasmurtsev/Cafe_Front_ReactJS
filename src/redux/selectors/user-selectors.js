export const getUserSel = (state) => {
    if(localStorage.getItem('user') === "") return {};
    console.log(JSON.parse(localStorage.getItem('user')));
    return JSON.parse(localStorage.getItem('user'));
    //return state.userInfo.user;
}

export const getJwtSel = (state) => {
    return localStorage.getItem('token');
    //return state.userInfo.jwt;
}