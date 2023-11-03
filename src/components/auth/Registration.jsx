import { useNavigate } from "react-router-dom";
import { Form, Formik, Field } from "formik";
import { initialize, isSubmitting } from "redux-form";
import s from "./Auth.module.css";
import { authAPI } from "../../api/restAPI";

const Registration = () => {
    let navigate = useNavigate();
    
    return (
        <div>
            <h2>Регистрация</h2><br/>
            <Formik
            onSubmit= {(values, {resetForm})=>{
              authAPI.registration({email: values.email, login: values.login, password: values.password})
              .then(response => {
                if (response.status == 500)  {alert(response.data); resetForm()}
                else navigate('/login');
              });
            }}
            enableReinitialize
            initialValues={{email: "", login: "", password: ""}}
    >
      {({
        values,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
        resetForm, 
      }) => (
        <Form onSubmit={handleSubmit} class={s.form}>
        <div className="form-group">
          <label>Email</label>
          <Field
            type="email"
            name="email"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.email}
            className="form-control"
            required
          />
        </div>
        <div className="form-group">
          <label>Логин</label>
          <Field
            type="text"
            name="login"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.login}
            className="form-control"
            required
          />
        </div>
        <div className="form-group">
          <label>Пароль</label>
          <Field
            type="password"
            name="password"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.password}
            className="form-control"
            required
          />
        </div>
        <div class={s.regBtn}>
          <button type="submit" disabled={isSubmitting} class={s.btnReg}>
           Зарегистрироваться
          </button>
          </div>
        </Form>
      )}
    </Formik>
        </div>
    );
}

export default Registration;