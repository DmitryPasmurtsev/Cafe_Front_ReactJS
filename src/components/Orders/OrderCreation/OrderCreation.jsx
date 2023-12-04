import { useEffect, useState } from "react";
import { getProducts } from "../../../redux/reducers/productsReducer";
import { getProductsSel } from "../../../redux/selectors/product-selectors";
import { getJwtSel } from "../../../redux/selectors/user-selectors"
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addOrderRed, getOrders } from "../../../redux/reducers/ordersReducer";
import { Field, Form, Formik } from "formik";
import { isSubmitting } from "redux-form";
import s from "../Orders.module.css"

const OrderCreation = () => {
    let [orderPositions, setOrderPositions] = useState([]);

    let [productsNames, setProductsNames] = useState([]);
    let [amountsOfProducts, setAmountsOfProducts] = useState([]);

    const navigate = useNavigate();
    let dispatch = useDispatch();
  
    let jwt = useSelector(getJwtSel);
    let allProducts = useSelector(getProductsSel);
    useEffect(() => {
      dispatch(getProducts(jwt));
   }, [JSON.stringify(allProducts)]);

   const addProductInOrder = (values) => {
    if(values.amount && values.productName) {
      setProductsNames([...productsNames, values.productName]);
      setAmountsOfProducts([...amountsOfProducts, values.amount])
      setOrderPositions([...orderPositions, {
        productName: values.productName,
        amount: values.amount
      }])
    }
    } 

    const addOrder= (values ) => {
          isSubmitting(true);
          dispatch(addOrderRed(jwt, {productsNames: productsNames, amounts: amountsOfProducts, description: values.description}))
          dispatch(getOrders(jwt));
          isSubmitting(false);
          navigate('/orders');
    }
    
    return (
    <div>
      <h2>Добавление заказа</h2><br/>
      <Formik
      enableReinitialize
      initialValues={{
        productName: "",
        amount: "",
        description: ""
      }
      }
    >
        
      {({
        values,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
        resetForm
      }) => (
        
        <Form onSubmit={handleSubmit} class={s.form}>
        <div className="form-group">
          <label>Продукт</label>
          <Field
            as="select"
            name="productName"
            onChange={handleChange}
            onBlur={handleBlur}
            className="form-control"
          >
            <option value={""}>Не выбран</option>
            {allProducts.map((product) => {
              return <option value={product.name}>{product.name}</option>
            })}
          </Field>
        </div>
        <div className="form-group">
          <label>Количество</label>
          <Field
            type="number"
            name="amount"
            max="5"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.amount}
            className="form-control"
          />
        </div>
          <button type="button" onClick={() => {addProductInOrder(values); resetForm()}} disabled={isSubmitting} className="btn btn-primary">
        Добавить в заказ
          </button><br/><br/>
          {productsNames.length!=0 && amountsOfProducts.length!=0 &&<>
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
          <button type="submit" disabled={isSubmitting} onClick={()=>addOrder(values)} className="btn btn-primary">
        Сохранить заказ
          </button><br/><br/></>}
        </Form>
      )}
    </Formik>
    <ul>
        {orderPositions.map((position) => (
            <li>{position.productName} {position.amount} шт.</li>
        ))}
    </ul>
    
    </div>
    );
}

export default OrderCreation;