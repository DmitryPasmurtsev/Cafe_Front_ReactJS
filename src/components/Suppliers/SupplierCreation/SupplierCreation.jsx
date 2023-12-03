import { useNavigate } from "react-router-dom";
import { Form, Formik, Field, ErrorMessage } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { getSuppliers } from "../../../redux/reducers/suppliersReducer";
import { getJwtSel } from "../../../redux/selectors/user-selectors";
import { suppliersAPI } from "../../../api/restAPI";
import s from "../Suppliers.module.css";

const SupplierCreation = () => {
  const navigate = useNavigate();
  let dispatch = useDispatch();

  let jwt = useSelector(getJwtSel);
  const validate = (values, props) => {
    const errors = {};
    if (!values.country) {
      errors.country = "Обязательное поле";
    } else if (!/^[а-яА-ЯёЁ-\s]+$/i.test(values.country)) {
      errors.country = "Только русские буквы";
    }
    if (!values.city) {
      errors.city = "Обязательное поле";
    } else if (!/^[а-яА-ЯёЁ-\s]+$/i.test(values.city)) {
      errors.city = "Только русские буквы";
    }
    if (!values.phone) {
      errors.phone = "Обязательное поле";
    } else if (!/^[0-9]+$/i.test(values.phone)) {
      errors.phone = "Только цифры";
    }
    return errors;
  };
  return (
    <div>
      <h1>Добавление поставщика</h1>
      <br />
      <br />
      <Formik
        enableReinitialize
        initialValues={{}}
        validate={validate}
        onSubmit={(values) => {
          suppliersAPI.addSupplier(jwt, values)
          .then((response) => {
               if (response.status == 400) {
                document.getElementById("company").style.color="red";
                document.getElementById("company").style.borderColor="red";
                document.getElementById("companyLabel").innerText="Компания должна иметь уникальное название";
                document.getElementById("companyLabel").style.color="red";
                document.getElementById("submitButton").disabled=false;
               }
              else {
                dispatch(getSuppliers(jwt));
                navigate("/suppliers");
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
          errors,
        }) => (
          <Form onSubmit={handleSubmit} class={s.form}>
            <div className={s.col}>
              <label id="companyLabel">Компания</label>
              <Field
                type="text"
                name="name"
                id="company"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.name}
                className={`form-control ${s.field}`}
                minLength="3"
                maxLength="30"
                required
              />
            </div>
            <div className={s.row}>
            <div className={touched.country && errors.country ? s.errorCol : s.col}>
                <label>Страна</label>
                <Field
                  type="text"
                  name="country"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.country}
                  minLength="2"
                  maxLength="30"
                  className={`form-control ${s.field} ${
                    touched.country && errors.country ? s.errorField : ""
                  }`}
                />
                <ErrorMessage
                  component="div"
                  name="country"
                  className={s.errorMessage}
                />
              </div>
              <div className={touched.city && errors.city ? s.errorCol : s.col}>
                <label>Город</label>
                <Field
                  type="text"
                  name="city"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.city}
                  minLength="3"
                  maxLength="30"
                  className={`form-control ${s.field} ${
                    touched.city && errors.city ? s.errorField : ""
                  }`}
                />
                <ErrorMessage
                  component="div"
                  name="city"
                  className={s.errorMessage}
                />
              </div>
            </div>
            <div className={s.col}>
              <label>Адрес</label>
              <Field
                type="text"
                name="address"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.address}
                className={`form-control ${s.field}`}
                minLength="5"
                maxLength="30"
                required
              />
            </div>
            <div className={touched.phone && errors.phone ? s.errorCol : s.col}>
              <label>Контактный телефон</label>
              <Field
                type="text"
                name="phone"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.phone}
                className={`form-control ${s.field} ${
                  touched.phone && errors.phone ? s.errorField : ""
                }`}
                minLength="11"
                maxLength="13"
              />
              <ErrorMessage
                component="div"
                name="phone"
                className={s.errorMessage}
              />
            </div>
            <button
              type="submit"
              id="submitButton"
              disabled={isSubmitting}
              className="btn btn-primary"
            >
              Добавить
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default SupplierCreation;
