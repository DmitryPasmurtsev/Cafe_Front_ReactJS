import { useNavigate, useParams } from "react-router-dom";
import { Form, Formik, Field } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { useEffect} from "react";
import { getSupplierSel } from "../../../redux/selectors/supplier-selectors";
import { getJwtSel } from "../../../redux/selectors/user-selectors";
import { editSupplier, getSupplier } from "../../../redux/reducers/suppliersReducer";
import s from "../Suppliers.module.css";

const SupplierEditing = () => {

    const navigate = useNavigate();
    let params = useParams();
    let dispatch = useDispatch();
    let supplierId = params.supplierId;
    let jwt = useSelector(getJwtSel);
    let supplier = useSelector(getSupplierSel);

    useEffect(()=> {
      dispatch(getSupplier(jwt, supplierId))
    }, [JSON.stringify(supplier)])

  return (
    
    <div>
      <h1>Редактирование поставщика</h1><br/><br/>
      <Formik
      enableReinitialize
      initialValues={supplier}
      
      onSubmit={(values) => {
          dispatch(editSupplier(jwt, supplier.id, values));
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
          <label>Компания</label>
          <Field
            type="text"
            name="name"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.name}
            className={`form-control ${s.field}`}
          /><br/>
        <div className={s.col}>
          <label>Страна</label>
          <Field
            type="text"
            name="country"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.country}
            className={`form-control ${s.field}`}
          />
        </div>
        <div className={s.col}>
          <label>Город</label>
          <Field
            type="text"
            name="city"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.city}
            className={`form-control ${s.field}`}
          />
        </div><br/><br/>
        <div className={s.col}>
          <label>Адрес</label>
          <Field
            type="text"
            name="address"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.address}
            className={`form-control ${s.field}`}
          />
          </div>
          <div className={s.col}>
          <label>Контактный телефон</label>
          <Field
            type="text"
            name="phone"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.phone}
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

export default SupplierEditing;
