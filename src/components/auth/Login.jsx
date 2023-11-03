import { useLocation, useNavigate } from "react-router-dom";
import { Form, Formik, Field } from "formik";
import { useDispatch } from "react-redux";
import { isSubmitting } from "redux-form";
import { setJwt, setUser } from "../../redux/reducers/userInfoReducer";
import s from "./Auth.module.css";
import { authAPI } from "../../api/restAPI";

const Login = () => {
  let dispatch = useDispatch();
  let navigate = useNavigate();
  let location = useLocation();
  return (
    <div>
      <h2>Авторизация</h2>
      <br />
      <Formik
        enableReinitialize
        initialValues={{login: "", password: ""}}
        onSubmit={(values, {resetForm}) => {
          isSubmitting(true);
          authAPI.authentication({ login: values.login, password: values.password })
          .then(response => {
            if (response.status == 403)  {alert("Неверный логин или пароль"); resetForm()}
            else {
              dispatch(setUser(response.user));
              dispatch(setJwt(response.jwt));
              isSubmitting(false);
              if (location.pathname == "/login") navigate ("/");
              else navigate(location);
            }
          });
          
        }}
      >
        {({ values, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
          <Form onSubmit={handleSubmit} class={s.form}>
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
            <div class={s.buttons}>
              <button
                type="submit"
                disabled={isSubmitting}
                class="btn btn-primary"
              >
                Войти
              </button>
                <button
                  class={s.btnReg}
                  onClick={() => {
                    return navigate("/registration");
                  }}
                  type="btn"
                >
                  Зарегистрироваться
                </button>
              
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Login;
