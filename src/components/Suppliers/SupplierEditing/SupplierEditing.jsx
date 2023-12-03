import { useNavigate, useParams } from "react-router-dom";
import { Form, Formik, Field, ErrorMessage } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getSupplierSel } from "../../../redux/selectors/supplier-selectors";
import { getJwtSel } from "../../../redux/selectors/user-selectors";
import {
  editSupplier,
  getSupplier,
  setSupplierInfo,
} from "../../../redux/reducers/suppliersReducer";
import { suppliersAPI } from "../../../api/restAPI";
import s from "../Suppliers.module.css";
import { isSubmitting } from "redux-form";


const SupplierEditing = () => {
  const navigate = useNavigate();
  let params = useParams();
  let dispatch = useDispatch();
  let supplierId = params.supplierId;
  let jwt = useSelector(getJwtSel);
  let supplier = useSelector(getSupplierSel);

  useEffect(() => {
    dispatch(getSupplier(jwt, supplierId));
  }, [JSON.stringify(supplier)]);
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
      <h1>Редактирование поставщика</h1>
      <br />
      <br />
      <Formik
        enableReinitialize
        initialValues={supplier}
        validate={validate}
        onSubmit={(values) => {
          suppliersAPI.editSupplier(jwt, supplier.id, values)
          .then((response) => {
               if (response.status == 400) {
                document.getElementById("company").style.color="red";
                document.getElementById("company").style.borderColor="red";
                document.getElementById("companyLabel").innerText="Компания должна иметь уникальное название";
                document.getElementById("companyLabel").style.color="red";
                document.getElementById("submitButton").disabled=false;
                isSubmitting(false);
               }
              else {
                dispatch(getSupplier(jwt, supplierId));
                const path = "/suppliers/" + supplierId;
                navigate(path);
              }
            });
        }}
      >
        {({ values, handleChange, handleBlur, handleSubmit, isSubmitting, touched, errors }) => (
          <Form onSubmit={handleSubmit} class={s.form}>
            <div className={touched.name && errors.name ? s.errorCol : s.col}>
              <label id="companyLabel">Компания</label>
              <Field
                type="text"
                name="name"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.name}
                id="company"
                className={`form-control ${s.field} ${
                  touched.name && errors.name ? s.errorField : ""
                }`}
                minLength="3"
                maxLength="30"
                required
              />
              <ErrorMessage
                  component="div"
                  name="name"
                  className={s.errorMessage}
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
            <div className={s.row}>
            <div className={s.col}>
              <label>Адрес</label>
              <Field
                type="text"
                name="address"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.address}
                minLength="5"
                maxLength="30"
                className={`form-control ${s.field}`}
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
            </div>
            <button
              id="submitButton"
              type="submit"
              disabled={isSubmitting}
              className="btn btn-primary"
            >
              Сохранить
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default SupplierEditing;
