import { useNavigate, useParams } from "react-router-dom";
import { Form, Formik, Field } from "formik";
import { useEffect} from "react";
import { useDispatch, useSelector} from "react-redux";
import { getEmployee } from "../../../redux/reducers/employeeInfoReducer";
import { getEmployeeSel, getPositionsSel } from "../../../redux/selectors/employee-selectors";
import { editEmployee, getPositions } from "../../../redux/reducers/employeesReducer";
import { isSubmitting } from "redux-form";
import { getJwtSel, getUserSel } from "../../../redux/selectors/user-selectors";
import s from "../Employees.module.css";

const EmployeeEditing = () => {
    const navigate = useNavigate();
    let params = useParams();
    let dispatch = useDispatch();
    let employeeId = params.employeeId;
  
    let jwt = useSelector(getJwtSel);
    let positions = useSelector(getPositionsSel);
    let employee = useSelector(getEmployeeSel);
    let user = useSelector(getUserSel);

    useEffect(() => {
       dispatch(getEmployee(jwt, employeeId));
    }, [JSON.stringify(employee)]);
    useEffect(() => {
      dispatch(getPositions(jwt));
   }, []);
    



  return (
    <div>
      <h1>Редактирование информации о сотруднике</h1><br/><br/>
      <Formik
      enableReinitialize
      initialValues={employee}
      
      onSubmit={async (values) => {
        isSubmitting(true);
          await dispatch(await editEmployee(jwt, employee.id, values));
          isSubmitting(false);
          navigate('/employees');
      }}
    >
      {({
        values,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting
      }) => (
        
        <Form onSubmit={handleSubmit} class={s.form}>
         
        <div className="form-group">
          <label>ФИО</label><br/>
          <Field
            type="text"
            name="fullName"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.fullName}
            className={`form-control ${s.field}`}
          />
        </div>
        {user.role!=="ROLE_WAITER" && <>
          <div className={s.col}>
          <label>Должность</label><br/>
          <Field
            as="select"
            name="position.id"
            onChange={handleChange}
            onBlur={handleBlur}
            className={`form-control ${s.field}`}
          >
            {positions.map((position) => {
              return <option value={position.id}>{position.name}</option>
            })}
          </Field>
          </div>
          <div className={s.col}>
          <label>Опыт работы</label><br/>
          <Field
            type="number"
            name="experience"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.experience}
            className={`form-control ${s.field}`}
          /></div>
          <br/><br/>
        <div className={s.col}>
          <label>Зарплата</label>
          <Field
            type="number"
            name="salary"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.salary}
            className={`form-control ${s.field}`}
          />
          </div>
          <div className={s.col}>
          <label>Дата приёма на работу</label>
          <Field
            type="date"
            name="date"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.date}
            className={`form-control ${s.field}`}
          />
          </div><br/><br/></>}

          <div className={s.col}>
          <label>Телефон</label>
          <Field
            type="text"
            name="phone"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.phone}
            className={`form-control ${s.field}`}
          />
          </div>
          <div className={s.col}>
          <label>Электронная почта</label>
          <Field
            type="email"
            name="email"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.email}
            className={`form-control ${s.field}`}
          />
          </div><br/><br/>
          <button type="submit" disabled={isSubmitting} className="btn btn-primary">
            Сохранить
          </button>
        </Form>
      )}
    </Formik>
    </div>
  );
};

export default EmployeeEditing;
