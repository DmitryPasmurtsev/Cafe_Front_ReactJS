import { useDispatch, useSelector } from "react-redux";
import {useNavigate } from "react-router-dom";
import { deleteEmployee } from "../../../redux/reducers/employeesReducer";
import s from "../Employees.module.css";
import { getJwtSel, getUserSel } from "../../../redux/selectors/user-selectors";
import cafeLogo from "../../../resources/cafeLogo.png";

const EmployeeItem = (props) => {
    let employee = props.employee;
    let dispatch = useDispatch();
  const navigate = useNavigate();
  let position = {...employee.position}
  let jwt = useSelector(getJwtSel);
  let user = useSelector(getUserSel);

  return (
  <div className={s.employeeItem}>
    {employee.linkToImage===null && <img className={s.img} src={cafeLogo} alt="smth"/>}
    {employee.linkToImage!==null && <img className={s.img} src={employee.linkToImage} alt="smth"/>}
     
         <div className={s.content}>
      <h4>{employee.fullName}</h4>
      <p><b>Должность:</b> {position.name}</p>
      <p><b>Телефон:</b> {employee.phone}</p>
      <p><b>Зарплата:</b> {employee.salary}</p>
      <p><b>Электронная почта:</b> {employee.email}</p>
      <p><b>Дата приема на работу:</b> {employee.date}</p><br/>
        {(["ROLE_DIRECTOR", "ROLE_MENEGER"].includes(user.role)) &&
        <button
          className="btn btn-outline-danger mx-2"
          onClick={() => {
            dispatch(deleteEmployee(jwt, employee.id));
            navigate("/employees" );
          }}
        >
          Удалить
          </button>}
          {(["ROLE_DIRECTOR", "ROLE_ACCOUNTANT", "ROLE_ADMINISTRATOR"].includes(user.role) || (user.role==="ROLE_WAITER" && user.employee.id == employee.id)) &&
            <button
            className="btn btn-outline-primary"
            onClick={() => {
              return navigate("/employees/edit/" + employee.id);
            }}
            >
            Редактировать
            </button>}
          </div>
        </div>
    );
}

export default EmployeeItem;