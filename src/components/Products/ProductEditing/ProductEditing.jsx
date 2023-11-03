import { useNavigate, useParams } from "react-router-dom";
import { Form, Formik, Field } from "formik";
import { editProduct } from "../../../redux/reducers/productsReducer";
import { useDispatch, useSelector } from "react-redux";
import { useEffect} from "react";
import { getProduct } from "../../../redux/reducers/productInfoReducer";
import { getProductSel } from "../../../redux/selectors/product-selectors";
import { getJwtSel } from "../../../redux/selectors/user-selectors";
import s from "../Products.module.css";

const ProductEditing = () => {

    const navigate = useNavigate();
    let params = useParams();
    let dispatch = useDispatch();
    let productId = params.productId;
    let jwt = useSelector(getJwtSel);
    let product = useSelector(getProductSel);

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
      // validate (values=> {
      //     const errors = {};
      //     if (!values.email) {
      //       errors.email = 'Required';
      //     } else if (
      //       !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
      //     ) {
      //       errors.email = 'Invalid email address';
      //     }
      //     return errors;
      // })
      onSubmit={(values) => {
          dispatch(editProduct(jwt, product.id, values));
          navigate('/products');
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
        /* and other goodies */
      }) => (
        
        <Form onSubmit={handleSubmit} class={s.form}>
          <div className={s.col}>
          <label>Название</label><br/>
          <Field
            type="text"
            name="name"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.name}
            className={`form-control ${s.field}`}
          />
          </div>
        <div className={s.col}>
          <label>Количество на складе</label>
          <Field
            type="number"
            name="amount"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.amount}
            className={`form-control ${s.field}`}
          />
        </div><br/><br/>
        <div className={s.col}>
          <label>Калорийность</label>
          <Field
            type="number"
            name="calories"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.calories}
            className={`form-control ${s.field}`}
          />
        </div>
        <div className={s.col}>
          <label>Стоимость</label>
          <Field
            type="number"
            name="price"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.price}
            className={`form-control ${s.field}`}
          />
          </div><br/><br/>
          <div className={s.col}>
          <label>Вес</label>
          <Field
            type="number"
            name="unitWeight"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.unitWeight}
            className={`form-control ${s.field}`}
          />
          </div>
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

export default ProductEditing;
