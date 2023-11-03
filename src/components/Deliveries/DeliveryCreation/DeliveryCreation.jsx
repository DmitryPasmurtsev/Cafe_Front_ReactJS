import { useNavigate, useParams } from "react-router-dom";
import { Form, Formik, Field } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { useEffect} from "react";
import { getProductsSel } from "../../../redux/selectors/product-selectors";
import { getSuppliersSel } from "../../../redux/selectors/supplier-selectors";
import { getEmployeesSel } from "../../../redux/selectors/employee-selectors";
import { getEmployees } from "../../../redux/reducers/employeesReducer";
import { getSuppliers } from "../../../redux/reducers/suppliersReducer";
import { getProducts } from "../../../redux/reducers/productsReducer";
import { addDelivery } from "../../../redux/reducers/deliveriesReducer";
import { getJwtSel } from "../../../redux/selectors/user-selectors";
import s from "../Deliveries.module.css";


const DeliveryCreation = () => {

    const navigate = useNavigate();
    let dispatch = useDispatch();

    let jwt = useSelector(getJwtSel);
    let employees = useSelector(getEmployeesSel);
    let suppliers = useSelector(getSuppliersSel)
    let products = useSelector(getProductsSel);

    useEffect(() => {
       dispatch(getEmployees(jwt));
    }, [JSON.stringify(employees)]);
    useEffect(() => {
        dispatch(getSuppliers(jwt));
     }, [JSON.stringify(suppliers)]);
     useEffect(() => {
        dispatch(getProducts(jwt));
     }, [JSON.stringify(products)]);

  return (
    
    <div>
      <h1>Добавление поставки</h1><br/>
      <Formik
      enableReinitialize
      initialValues={{}}
      onSubmit={(values) => {
          dispatch(addDelivery(jwt, values));
          navigate('/deliveries');
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
          <label>Дата поставки</label>
          <Field
            type="date"
            name="date"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.date}
            className="form-control"
            required
          />
        </div>
        <div className="form-group">
          <label>Поставляемый продукт</label>
          <Field
            as="select"
            name="product.id"
            onChange={handleChange}
            onBlur={handleBlur}
            className="form-control"
            required
          >
            <option value="">Не выбран</option>
            {products.map((product) => {
              return <option value={product.id}>{product.name}</option>
            })}
        </Field>
        </div>
        <div className="form-group">
          <label>Количество</label>
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
          <label>Поставщик</label>
          <Field
            as="select"
            name="supplier.id"
            onChange={handleChange}
            onBlur={handleBlur}
            className="form-control"
            required
          >
            <option value="">Не выбран</option>
            {suppliers.map((supplier) => {
              return <option value={supplier.id}>{supplier.name}</option>
            })}
          </Field>
          </div>
        <div className="form-group">
          <label>Принимающий работник</label>
          <Field
            as="select"
            name="employee.id"
            onChange={handleChange}
            onBlur={handleBlur}
            className="form-control"
            required
          >
            <option value="">Не выбран</option>
            {employees.map((employee) => {
              return <option value={employee.id}>{employee.fullName}</option>
            })}
          </Field>
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

export default DeliveryCreation;
