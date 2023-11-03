import React, { useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOrders } from "../../redux/reducers/ordersReducer";
import { getOrdersSel } from "../../redux/selectors/order-selectors";
import OrderItem from "./OrderItem/OrderItem";
import { useNavigate } from "react-router-dom";
import Preloader from "../commons/Preloader";
import s from "./Orders.module.css";
import { getJwtSel, getUserSel } from "../../redux/selectors/user-selectors";

const OrdersPage = () => {
  let dispatch = useDispatch();
  let jwt = useSelector(getJwtSel);
  let orders = useSelector(getOrdersSel);
   useEffect(() => {
     dispatch(getOrders(jwt));
  }, [JSON.stringify(orders)]);
  
  return (
    <div>
      {orders.length == 0 && <div><Preloader/></div>}
      {orders.length != 0 && <div><Orders orders = {orders}/></div>}
    </div>
  );
};

const Orders = (props) => {
  let navigate = useNavigate();
  let user = useSelector(getUserSel);
  return (
    <div>
      <div className={s.head}>
        <h2>Принятые заказы</h2>
        {(["ROLE_DIRECTOR", "ROLE_WAITER", "ROLE_ADMINISTRATOR"].includes(user.role)) &&
        <button
          class="btn"
          onClick={() => {
            return navigate("/orders/create");
          }}
          type="submit"
        >
          Добавить заказ
        </button>}
        <br/><br/>
      </div>
      <table className={`table table-striped border shadow ${s.table}`}>
        <thead className={s.thead}>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Дата</th>
            <th scope="col">Официант</th>
            <th scope="col">Стоимость</th>
            <th scope="col" className={s.center}>Действие</th>
          </tr>
        </thead>
        <tbody>
          {props.orders.map((order) => (
            <OrderItem order={order}/>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default OrdersPage;
