import { useDispatch, useSelector } from "react-redux";
import { getJwtSel, getUserSel } from "../../redux/selectors/user-selectors";
import { NavLink, useNavigate } from "react-router-dom";
import { setJwt, setUser } from "../../redux/reducers/userInfoReducer";
import s from "./AccountInfo.module.css";
import cafeLogo from "../../resources/cafeLogo.png";
import { employeesAPI } from "../../api/restAPI";
import { Field, Form, Formik } from "formik";

const AccountInfo = () => {
    let user = useSelector(getUserSel);
    let jwt = useSelector(getJwtSel);
    let dispatch = useDispatch();
    let navigate = useNavigate();
    let pathToEmployee = "/employees/" + user.employee.id;
    return (
      <div>
        <h2>Аккаунт</h2>
        {user.employee.linkToImage===null && <img className={s.img} src={cafeLogo} alt="smth"/>}
        {user.employee.linkToImage!==null && <img className={s.img} src={user.employee.linkToImage} alt="smth"/>}<br/>
        <form onSubmit={() => employeesAPI.updateImage(jwt, user.employee.id, document.getElementById("linkToImage").value)}>
            <input type="text" placeholder="Вставьте ссылку на фото..." id="linkToImage"/>
            <button>Добавить фото</button>
        </form><br/>
        <p>
          <b>Логин:</b> {user.login}
        </p>
        <p>
          <b>Email:</b> {user.employee.email}
        </p>
        <p>
          <b>Работник:</b>{" "}
          <NavLink to={pathToEmployee}>{user.employee.fullName}</NavLink>
        </p>
        <p>
          <b>Должность:</b> {user.employee.position.name}
        </p>
        <br />
        <button
          className="btn btn-danger"
          onClick={() => {
            dispatch(setUser({}));
            dispatch(setJwt(""));
            localStorage.setItem('token', '');
            localStorage.setItem('user', '');
            navigate("/login");
          }}
        >
          Выйти из аккаунта
        </button>
      </div>
    );
}

export default AccountInfo;