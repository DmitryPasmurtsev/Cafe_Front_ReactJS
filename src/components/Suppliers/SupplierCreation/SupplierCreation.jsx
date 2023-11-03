import { useNavigate } from "react-router-dom";
import { Form, Formik, Field } from "formik";
import { useDispatch, useSelector} from "react-redux";
import { addSupplier } from "../../../redux/reducers/suppliersReducer";
import { getJwtSel } from "../../../redux/selectors/user-selectors";
import s from "../Suppliers.module.css";


const SupplierCreation = () => {

    const navigate = useNavigate();
    let dispatch = useDispatch();

    let jwt = useSelector(getJwtSel);

  return (
    
    <div>
      <h1>Добавление поставщика</h1>
      <Formik
      enableReinitialize
      initialValues={{}}
      
      onSubmit={(values) => {
          dispatch(addSupplier(jwt, values));
          navigate('/suppliers');
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
          <label>Компания</label>
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
          <label>Страна</label>
          <Field
            type="text"
            name="country"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.country}
            className="form-control"
            required
          />
        </div>
        <div className="form-group">
          <label>Город</label>
          <Field
            type="text"
            name="city"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.city}
            className="form-control"
            required
          />
        </div>
        <div className="form-group">
          <label>Адрес</label>
          <Field
            type="text"
            name="address"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.address}
            className="form-control"
            required
          />
          </div>
        <div className="form-group">
          <label>Контактный телефон</label>
          <Field
            type="text"
            name="phone"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.phone}
            className="form-control"
            required
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

export default SupplierCreation;
