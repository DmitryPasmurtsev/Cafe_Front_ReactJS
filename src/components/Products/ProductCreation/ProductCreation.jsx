import { useNavigate} from "react-router-dom";
import { Form, Formik, Field } from "formik";
import { useDispatch, useSelector} from "react-redux";
import { addProduct } from "../../../redux/reducers/productsReducer";
import {getJwtSel } from "../../../redux/selectors/user-selectors";
import s from "../Products.module.css";


const ProductCreation = () => {

    const navigate = useNavigate();
    let dispatch = useDispatch();
    let jwt = useSelector(getJwtSel)

  return (
    
    <div>
      <h1>Добавление продукта</h1>
      <Formik
      enableReinitialize
      initialValues={{}}

      onSubmit={(values) => {
          dispatch(addProduct(jwt, values));
          navigate('/products');
      }}
    >
      {({
        values,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
      }) => (
        
        <Form onSubmit={handleSubmit} class={s.form}>
        <div className="form-group">
          <label>Название</label>
          <Field
            type="text"
            name="name"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.name}
            className="form-control"
            required
          />
        </div>
        <div className="form-group">
          <label>Количество на складе</label>
          <Field
            type="number"
            name="amount"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.amount}
            className="form-control"
            required
          />
        </div>
        <div className="form-group">
          <label>Калорийность</label>
          <Field
            type="number"
            name="calories"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.calories}
            className="form-control"
            required
          />
        </div>
        <div className="form-group">
          <label>Стоимость</label>
          <Field
            type="number"
            name="price"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.price}
            className="form-control"
            required
          />
          </div>
        <div className="form-group">
          <label>Вес</label>
          <Field
            type="number"
            name="unitWeight"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.unitWeight}
            className="form-control"
            required
          />
          </div>
        <div className="form-group">
          <label>Описание</label>
          <Field
            type="text"
            name="description"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.description}
            className="form-control"
          />
          </div>
          <button type="submit" disabled={isSubmitting} className="btn btn-primary">
            Добавить
          </button>
        </Form>
      )}
    </Formik>
    </div>
  );
};

export default ProductCreation;
