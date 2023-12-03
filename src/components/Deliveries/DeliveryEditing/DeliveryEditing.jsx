import { useNavigate, useParams } from "react-router-dom";
import { Form, Formik, Field } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { useEffect} from "react";
import { getDeliverySel } from "../../../redux/selectors/delivery-selectors";
import { editDelivery, getDelivery, setDelivery } from "../../../redux/reducers/deliveriesReducer";
import { getProductsSel } from "../../../redux/selectors/product-selectors";
import { getSuppliersSel } from "../../../redux/selectors/supplier-selectors";
import { getEmployeesSel } from "../../../redux/selectors/employee-selectors";
import { getEmployees } from "../../../redux/reducers/employeesReducer";
import { getSuppliers } from "../../../redux/reducers/suppliersReducer";
import { getProducts } from "../../../redux/reducers/productsReducer";
import { getJwtSel } from "../../../redux/selectors/user-selectors";
import s from "../Deliveries.module.css";
import { deliveriesAPI } from "../../../api/restAPI";

const DeliveryEditing = () => {

    const navigate = useNavigate();
    let params = useParams();
    let dispatch = useDispatch();
    let deliveryId = params.deliveryId;


    let jwt = useSelector(getJwtSel)
    let delivery = useSelector(getDeliverySel);
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

    useEffect(()=> {
      dispatch(getDelivery(jwt, deliveryId))
    }, [JSON.stringify(delivery)])

  return (
    
    <div>
      <h1>Редактирование поставки</h1><br/><br/>
      <Formik
      enableReinitialize
      initialValues={delivery}
      
      onSubmit={(values) => {
          deliveriesAPI.editDelivery(jwt, delivery.id, values)
          .then((response) => {
            dispatch(getDelivery(jwt, deliveryId));
           });
          const path = "/deliveries/" + deliveryId;
          navigate(path);
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
          <label>Дата поставки</label><br/>
          <Field
            type="date"
            name="date"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.date}
            className={`form-control ${s.field}`}
          /><br/>
        <div className={s.col}>
          <label>Поставляемый продукт</label>
          <Field
            as="select"
            name="product.id"
            onChange={handleChange}
            onBlur={handleBlur}
            className={`form-control ${s.field}`}
          >
            {products.map((product) => {
              return <option value={product.id}>{product.name}</option>
            })}
        </Field>
        </div>
        <div className={s.col}>
          <label>Количество</label>
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
          <label>Поставщик</label>
          <Field
            as="select"
            name="supplier.id"
            onChange={handleChange}
            onBlur={handleBlur}
            className={`form-control ${s.field}`}
          >
            {suppliers.map((supplier) => {
              return <option value={supplier.id}>{supplier.name}</option>
            })}
          </Field>
          </div>
          <div className={s.col}>
          <label>Принимающий работник</label>
          <Field
            as="select"
            name="employee.id"
            onChange={handleChange}
            onBlur={handleBlur}
            className={`form-control ${s.field}`}
          >
            {employees.map((employee) => {
              return <option value={employee.id}>{employee.fullName}</option>
            })}
          </Field>
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

export default DeliveryEditing;
