import { useSelector } from "react-redux";
import { getUserSel } from "../../redux/selectors/user-selectors";
import styles from './MainPage.module.css';

const MainPage = () => {
    const user = useSelector(getUserSel);
    const userName = user.employee.fullName
    return (
    <div>
        </div>
    )
}
export default MainPage;