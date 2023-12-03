import { useNavigate, useParams } from "react-router-dom";
import { Form, Formik, Field, validateYupSchema, ErrorMessage } from "formik";
import { editProduct } from "../../../redux/reducers/productsReducer";
import { useDispatch, useSelector } from "react-redux";
import { useEffect} from "react";
import { getProduct, setProduct } from "../../../redux/reducers/productInfoReducer";
import { getProductSel } from "../../../redux/selectors/product-selectors";
import { getJwtSel } from "../../../redux/selectors/user-selectors";
import s from "../Products.module.css";
import { productsAPI } from "../../../api/restAPI";

const ProductEditing = () => {

    const navigate = useNavigate();
    let params = useParams();
    let dispatch = useDispatch();
    let productId = params.productId;
    let jwt = useSelector(getJwtSel);
    let product = useSelector(getProductSel);
    const validate = (values, props) => {
      const errors = {};
      if (!values.name) {
        errors.name = 'Обязательное поле';
      } else if (!/^[а-яА-ЯёЁ\s]+$/i.test(values.name)) {
        errors.name = 'Только русские буквы';
      }
      return errors;
    };
    useEffect(()=> {
      dispatch(getProduct(jwt, productId))
    }, [JSON.stringify(product)])
    {console.log(product)}
  return (
    
    <div>
      <h1>Редактирование продукта</h1><br/><br/>
      <Formik
      enableReinitialize
      initialValues={product}
      validate={validate}
      onSubmit={(values) => {
        productsAPI.editProduct(jwt, product.id, values)
        .then((response) => {
             if (response.status == 400) {
              document.getElementById("product").style.color="red";
              document.getElementById("product").style.borderColor="red";
              document.getElementById("productLabel").innerText="Продукт должен иметь уникальное название";
              document.getElementById("productLabel").style.color="red";
              document.getElementById("submitButton").disabled=false;
             }
            else {
              dispatch(getProduct(jwt, productId));
              const path = "/products/" + productId;
              navigate(path);
            }
          });
      }}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
      }) => (
        
        <Form onSubmit={handleSubmit} class={s.form}>
          <div className={touched.name && errors.name ? s.errorCol : s.col}>
          <label id="productLabel">Название</label><br/>
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
            required
            min="1"
            max="1000"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.unitWeight}
            className={`form-control ${s.field}`}
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
          </div>
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

export default ProductEditing;
