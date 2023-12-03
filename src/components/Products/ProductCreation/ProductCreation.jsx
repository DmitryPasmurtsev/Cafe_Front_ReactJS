import { useNavigate} from "react-router-dom";
import { Form, Formik, Field, ErrorMessage } from "formik";
import { useDispatch, useSelector} from "react-redux";
import { getProducts } from "../../../redux/reducers/productsReducer";
import {getJwtSel } from "../../../redux/selectors/user-selectors";
import s from "../Products.module.css";
import { productsAPI } from "../../../api/restAPI";


const ProductCreation = () => {

    const navigate = useNavigate();
    let dispatch = useDispatch();
    let jwt = useSelector(getJwtSel)

    const validate = (values, props) => {
      const errors = {};
      if (!values.name) {
        errors.name = 'Обязательное поле';
      } else if (!/^[а-яА-ЯёЁ\s]+$/i.test(values.name)) {
        errors.name = 'Только русские буквы';
      }
      return errors;
    };

  return (
    
    <div>
      <h1>Добавление продукта</h1><br/><br/>
      <Formik
      enableReinitialize
      initialValues={{amount:0}}
      validate={validate}
      onSubmit={(values) => {
        productsAPI.addProduct(jwt, values)
          .then((response) => {
               if (response.status == 400) {
                document.getElementById("product").style.color="red";
                document.getElementById("product").style.borderColor="red";
                document.getElementById("productLabel").innerText="Продукт должен иметь уникальное название";
                document.getElementById("productLabel").style.color="red";
                document.getElementById("submitButton").disabled=false;
               }
              else {
                dispatch(getProducts(response));
                navigate("/products");
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
        <div className={touched.name && errors.name ? s.errorCol : s.col}>
          <label id="productLabel">Название</label>
          <Field
            type="text"
            name="name"
            id="product"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.name}
            className={`form-control ${s.field} ${
              touched.name && errors.name ? s.errorField : ""
            }`}
          /><ErrorMessage
          component="div"
          name="name"
          className={s.errorMessage}
        />
        </div>
        <div className={s.row}>
        <div className={s.col}>
          <label>Количество на складе</label>
          <Field
            type="number"
            name="amount"
            min="0"
            max="3000"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.amount}
            className={`form-control ${s.field}`}
            required
          />
        </div>
        <div className={s.col}>
          <label>Калорийность</label>, ккал
          <Field
            type="number"
            name="calories"
            min="1"
            max="1000"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.calories}
            className={`form-control ${s.field}`}
            required
          />
        </div></div>
        <div className={s.row}>
        <div className={s.col}>
          <label>Стоимость</label>, BYN
          <Field
            type="number"
            name="price"
            min="0.1"
            max="1000"
            step="0.1"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.price}
            className={`form-control ${s.field}`}
            required
          />
          </div>
          <div className={s.col}>
          <label>Вес</label>, грамм
          <Field
            type="number"
            name="unitWeight"
            min="1"
            max="1000"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.unitWeight}
            className={`form-control ${s.field}`}
            required
          />
          </div></div>
          <div className={s.row}>
          <div className={s.col}>
          <label>Описание</label>
          <Field
            type="text"
            name="description"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.description}
            className={`form-control ${s.field}`}
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

export default ProductCreation;
