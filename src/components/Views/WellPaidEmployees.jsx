import React from "react";
import EmployeeItem from "./EmployeeItem/EmployeeItem";
import { useDispatch, useSelector } from "react-redux";
import { getEmployeesSel } from "../../redux/selectors/employee-selectors";
import { useEffect } from "react";
import { getEmployees } from "../../redux/reducers/employeesReducer";



const Employees = () => {
  let employees = useSelector(getEmployeesSel);
  let dispatch = useDispatch();
  useEffect(() => {
  dispatch(getEmployees());
  }, [JSON.stringify(employees)]);
  
  return (
    <div>
      <table className="table table-striped border shadow">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">ФИО</th>
            <th scope="col">Должность</th>
            <th scope="col">Опыт работы</th>
            <th scope="col">Действие</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
    <EmployeeItem employee={employee} key={employee.id}/>
  ))}
        </tbody>
      </table>
    </div>
  );
};

export default Employees;
