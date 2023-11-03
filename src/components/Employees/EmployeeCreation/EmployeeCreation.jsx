import { useNavigate } from "react-router-dom";
import { Form, Formik, Field } from "formik";
import { useEffect} from "react";
import { useDispatch, useSelector} from "react-redux";
import { addEmployee, getPositions } from "../../../redux/reducers/employeesReducer";
import { isSubmitting } from "redux-form";
import { getPositionsSel } from "../../../redux/selectors/employee-selectors";
import { getJwtSel } from "../../../redux/selectors/user-selectors";
import s from "../Employees.module.css";

const EmployeeCreation = () => {
    const navigate = useNavigate();
    let dispatch = useDispatch();
  
    let jwt = useSelector(getJwtSel);
    let positions = useSelector(getPositionsSel);

    useEffect(() => {
      dispatch(getPositions(jwt));
   }, []);
    
  return (
    <div>
      <h1>Добавление сотрудника</h1><br/><br/>
      <Formik
      enableReinitialize
      initialValues={{}}

      onSubmit={(values) => {
        isSubmitting(true);
          dispatch(addEmployee(jwt, values));
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
          <div className={s.col}>
          <label>ФИО</label>
          <Field
            type="text"
            name="fullName"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.fullName}
            className={`form-control ${s.field}`}
            required
          /></div><br/><br/>
          <div className={s.col}>
          <label>Электронная почта</label>
          <Field
            type="email"
            name="email"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.email}
            className={`form-control ${s.field}`}
            required
          /></div>
        <div className={s.col}>
          <label>Должность</label>
          <Field
            as="select"
            name="position.id"
            onChange={handleChange}
            onBlur={handleBlur}
            className={`form-control ${s.field}`}
            required
          >
            <option value="">Не выбрана</option>
            {positions.map((position) => {
              return <option value={position.id}>{position.name}</option>
            })}
          </Field>
        </div><br/><br/>
        <div className={s.col}>
          <label>Опыт работы</label>
          <Field
            type="number"
            name="experience"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.experience}
            className={`form-control ${s.field}`}
            required
          />
        </div>
        <div className={s.col}>
          <label>Зарплата</label>
          <Field
            type="number"
            name="salary"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.salary}
            className={`form-control ${s.field}`}
            required
          />
          </div><br/><br/>
          <div className={s.col}>
          <label>Телефон</label>
          <Field
            type="text"
            name="phone"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.phone}
            className={`form-control ${s.field}`}
        
            required
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
            required
          />
          </div><br/><br/>
          <button type="submit" disabled={isSubmitting} className="btn btn-primary">
            Добавить
          </button>
        </Form>
      )}
    </Formik>
    </div>
  );
};

export default EmployeeCreation;
