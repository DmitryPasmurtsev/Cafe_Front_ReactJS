import { useNavigate, useParams } from "react-router-dom";
import { Form, Formik, Field, ErrorMessage } from "formik";
import { useEffect} from "react";
import { useDispatch, useSelector} from "react-redux";
import { getEmployee } from "../../../redux/reducers/employeeInfoReducer";
import { getEmployeeSel, getPositionsSel } from "../../../redux/selectors/employee-selectors";
import { editEmployee, getPositions } from "../../../redux/reducers/employeesReducer";
import { autofill, isSubmitting } from "redux-form";
import { getJwtSel, getUserSel } from "../../../redux/selectors/user-selectors";
import s from "../Employees.module.css";
import { employeesAPI } from "../../../api/restAPI";

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
    } else if (!/^(80(29|44|33|25|17)\d{7})$/i.test(values.phone)) {
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


  return (
    <div>
      <h1>Редактирование информации о сотруднике</h1><br/><br/>
      <Formik
      enableReinitialize
      initialValues={employee}
      validate={validate}
      onSubmit={(values) => {
        employeesAPI.editEmployee(jwt,employeeId, values)
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
              dispatch(getEmployee(jwt, employeeId));
              const path = "/employees/" + employeeId;
              navigate(path);
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
          <label>ФИО</label><br/>
          <Field
            type="text"
            name="fullName"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.fullName}
            className={`form-control ${s.field} ${
              touched.fullName && errors.fullName ? s.errorField : ""
            }`}
          />
        </div>
        <ErrorMessage
            component="div"
            name="fullName"
            className={s.errorMessage}
          />
        {user.role!=="ROLE_WAITER" && <>
        <div className={s.row}>
          <div className={s.col}>
          <label>Должность</label><br/>
          <Field
            as="select"
            name="position.id"
            onChange={handleChange}
            onBlur={handleBlur}
            required
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
            min="0"
            max="60"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.experience}
            className={`form-control ${s.field}`}
            required
          /></div></div>
          <div className={s.row}>
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
          /></div>
          </div> </>}
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
              touched.phone && errors.phone ? s.errorField : ""}`}
          />
          <ErrorMessage
            component="div"
            name="phone"
            className={s.errorMessage}
          />
          </div>
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
          /></div>
          </div>
          <button id="submitButton" type="submit" disabled={isSubmitting} className="btn btn-primary">
            Сохранить
          </button>
        </Form>
      )}
    </Formik>
    </div>
  );
};

export default EmployeeEditing;
