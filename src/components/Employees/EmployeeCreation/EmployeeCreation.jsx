import { useNavigate } from "react-router-dom";
import { Form, Formik, Field, ErrorMessage } from "formik";
import { useEffect} from "react";
import { useDispatch, useSelector} from "react-redux";
import { addEmployee, getEmployees, getPositions } from "../../../redux/reducers/employeesReducer";
import { isSubmitting } from "redux-form";
import { getPositionsSel } from "../../../redux/selectors/employee-selectors";
import { getJwtSel } from "../../../redux/selectors/user-selectors";
import s from "../Employees.module.css";
import { employeesAPI } from "../../../api/restAPI";


const validate = (values, props) => {
  const errors = {};
  if (!values.fullName) {
    errors.fullName = 'Обязательное поле';
  } else if (!/^[а-яА-ЯёЁ\s]+$/i.test(values.fullName)) {
    errors.fullName = 'Только русские буквы';
  } else if (!/^(?:[А-ЯЁ][а-яё]+ ){2}[А-ЯЁ][а-яё]+$/i.test(values.fullName)) {
    errors.fullName = 'Введите ФИО в три слова';
  }
  if (!values.phone) {
    errors.phone = 'Обязательное поле';
  } else if (!/^(80(29|44|33|25)\d{7})$/i.test(values.phone)) {
    errors.phone= 'Проверьте код и длину';
  }
  return errors;
};

const errorPhone = () => {
  document.getElementById("phone").style.color="red";
  document.getElementById("phone").style.borderColor="red";
  document.getElementById("phoneLabel").innerText="Телефон должен быть уникальным";
  document.getElementById("phoneLabel").style.color="red";

  document.getElementById("email").style.color="black";
  document.getElementById("email").style.borderColor="black";
  document.getElementById("emailLabel").innerText="Электронная почта";
  document.getElementById("emailLabel").style.color="black";
}

const errorEmail = () => {
  document.getElementById("email").style.color="red";
  document.getElementById("email").style.borderColor="red";
  document.getElementById("emailLabel").innerText="Почта должна быть уникальной";
  document.getElementById("emailLabel").style.color="red";

  document.getElementById("phone").style.color="black";
  document.getElementById("phone").style.borderColor="black";
  document.getElementById("phoneLabel").innerText="Номер телефона";
  document.getElementById("phoneLabel").style.color="black";
}


const EmployeeCreation = () => {
    const navigate = useNavigate();
    let dispatch = useDispatch();
    let jwt = useSelector(getJwtSel);
    let positions = useSelector(getPositionsSel);

    useEffect(() => {
      dispatch(getPositions(jwt));
   }, [JSON.stringify(positions)]);
    
  return (
    <div>
      <h1>Добавление сотрудника</h1><br/><br/>
      <Formik
      enableReinitialize
      initialValues={{}}
      validate={validate}
      onSubmit={(values) => {
        employeesAPI.addEmployee(jwt, values)
        .then((response) => {
             if (response.status == 400) {
              if(response.data.field==="email") {
                errorEmail();
              } else if(response.data.field==="phone"){
                errorPhone();
              }
              document.getElementById("submitButton").disabled=false;
             }
            else {
              dispatch(getEmployees(jwt));
              navigate("/employees");
            }
          });
      }}
    >
      {({
        values,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
        touched,
        errors
      }) => (
        
        <Form onSubmit={handleSubmit} class={s.form}>
          <div className={touched.fullName && errors.fullName ? s.errorCol : s.col}>
          <label>ФИО</label>
          <Field
            type="text"
            name="fullName"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.fullName}
            className={`form-control ${s.field} ${
              touched.fullName && errors.fullName ? s.errorField : ""
            }`}
            required
          /><ErrorMessage
          component="div"
          name="fullName"
          className={s.errorMessage}
        /></div>
          <div className={s.row}>
          <div className={s.col}>
          <label id="emailLabel">Электронная почта</label>
          <Field
            type="email"
            name="email"
            id="email"
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
        </div></div>
        <div className={s.row}>
        <div className={s.col}>
          <label>Опыт работы</label>
          <Field
            type="number"
            name="experience"
            max="60"
            min="0"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.experience}
            className={`form-control ${s.field}`}
            required
          />
        </div>
        <div className={s.col}>
          <label>Зарплата</label>, BYN
          <Field
            type="number"
            name="salary"
            min="0"
            max="5000"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.salary}
            className={`form-control ${s.field}`}
            required
          /></div>
          </div>
          <div className={s.row}>
          <div className={touched.phone && errors.phone ? s.errorCol : s.col}>
          <label id="phoneLabel">Телефон</label>
          <Field
            type="text"
            name="phone"
            id="phone"
            placeholder="80XXXXXXXXX"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.phone}
            className={`form-control ${s.field} ${
              touched.phone && errors.phone ? s.errorField : ""
            }`}
          /><ErrorMessage
          component="div"
          name="phone"
          className={s.errorMessage}
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
          </div></div>
          <button id="submitButton" type="submit" disabled={isSubmitting} className="btn btn-primary">
            Добавить
          </button>
        </Form>
      )}
    </Formik>
    </div>
  );
};

export default EmployeeCreation;
