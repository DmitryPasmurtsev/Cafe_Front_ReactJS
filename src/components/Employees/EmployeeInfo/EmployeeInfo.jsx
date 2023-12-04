import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getEmployeeSel, getPositionsSel } from "../../../redux/selectors/employee-selectors";
import { getEmployee } from "../../../redux/reducers/employeeInfoReducer";
import Preloader from "../../commons/Preloader";
import { getJwtSel, getUserSel } from "../../../redux/selectors/user-selectors";
import { getErrorMessageSel } from "../../../redux/selectors/error-selectors";

const EmployeeInfo = () => {
  let dispatch = useDispatch();
  let navigate = useNavigate();
    let params = useParams();
    let employeeId = params.employeeId;
    let jwt = useSelector(getJwtSel);
    let employee = useSelector(getEmployeeSel);
    let errorMessage = useSelector(getErrorMessageSel);
    let user = useSelector(getUserSel);
    let position = {...employee.position}
    useEffect(()=> {
      dispatch(getEmployee(jwt, employeeId));
    }, [JSON.stringify(employee), errorMessage]);
    
  return (
  <div>
    {employeeId == employee.id &&
            <div><h4>{employee.fullName}</h4><br/>
            <p><b>Должность:</b> {position.name}</p>
            <p><b>Телефон:</b> {employee.phone}</p>
            <p><b>Зарплата:</b> {employee.salary}</p>
            <p><b>Электронная почта:</b> {employee.email}</p>
            <p><b>Дата приема на работу:</b> {employee.date}</p>
            {(["ROLE_DIRECTOR", "ROLE_ACCOUNTANT", "ROLE_ADMINISTRATOR"].includes(user.role) || (user.role==="ROLE_WAITER" && user.employee.id == employee.id)) &&
            <button
            className="btn btn-outline-primary"
            onClick={() => {
              return navigate("/employees/edit/" + employee.id);
            }}
            >
            Редактирование
            </button>}
            </div>}
            {employeeId != employee.id && errorMessage == "" &&
            <div>
               <Preloader/>
            </div>
            }
            {errorMessage !== "" && <h3>{errorMessage}</h3>}
  </div>
  );
};

export default EmployeeInfo;
