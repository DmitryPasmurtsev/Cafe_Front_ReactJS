import React, { useState } from "react";
import EmployeeItem from "./EmployeeItem/EmployeeItem";
import { useDispatch, useSelector } from "react-redux";
import { getEmployeesSel } from "../../redux/selectors/employee-selectors";
import { useEffect } from "react";
import { getEmployees } from "../../redux/reducers/employeesReducer";
import Preloader from "../commons/Preloader";
import { useNavigate } from "react-router-dom";
import s from "./Employees.module.css"
import { getJwtSel, getUserSel } from "../../redux/selectors/user-selectors";



const EmployeesPage = () => {
  let employees = useSelector(getEmployeesSel);
  let jwt = useSelector(getJwtSel);
  let dispatch = useDispatch();
  useEffect(() => {
  dispatch(getEmployees(jwt));
  }, [JSON.stringify(employees)]);
  
  return (
    <div>
      {employees.length == 0 && <div><Preloader/></div>}
      {employees.length != 0 && <div><Employees employees = {employees}/></div>}
    </div>
  );
};

const Employees = (props) => {
  let navigate = useNavigate();
  let user = useSelector(getUserSel);
  const [employeeName, setEmployeeName] = useState('');
  const filteredEmployees = props.employees.filter(employee => {
    return employee.fullName.toLowerCase().includes(employeeName.toLowerCase())
  })
  return (
    <div>
      <div className={s.head}>
        <h2>Работники нашего кафе</h2>
        {(["ROLE_DIRECTOR", "ROLE_ADMINISTRATOR"].includes(user.role)) &&
        <button
          class="btn"
          onClick={() => {
            return navigate("/employees/create");
          }}
          type="submit"
        >
          Добавить работника
        </button>}
        <br/><br/>
      </div>
      <div>
        <form >
          <input
          className={s.searchInput}
          type="text"
          placeholder="Поиск работника по ФИО..."
          onChange={(e) => setEmployeeName(e.target.value)}
          />
        </form>
        <br/>
      </div>
      {filteredEmployees.length != 0 && 
          filteredEmployees.map((employee) => (
    <EmployeeItem employee={employee} key={employee.id}/>
  ))}
      {filteredEmployees.length == 0 && <h4>Таких сотрудников мы не знаем</h4>}
    </div>
  );
}

export default EmployeesPage;
