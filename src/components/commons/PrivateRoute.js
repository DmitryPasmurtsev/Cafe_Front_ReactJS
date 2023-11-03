import { useSelector } from "react-redux"
import { getJwtSel } from "../../redux/selectors/user-selectors"
import Login from "../auth/Login";

const PrivateRoute = ({children}) => {
    let jwt = localStorage.getItem('token');;
    return jwt ? children : <Login/>
}

export default PrivateRoute;