import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import s from "../Orders.module.css";
import { deleteOrder, getOrders } from "../../../redux/reducers/ordersReducer";
import { getJwtSel, getUserSel } from "../../../redux/selectors/user-selectors";

const OrderItem = (props) => {
  let order = props.order;
  let jwt = useSelector(getJwtSel)
  let user = useSelector(getUserSel);
  const navigate = useNavigate();
  let dispatch = useDispatch();
  return (
    <tr>
      <th scope="row">{order.id}</th>
      <td>{order.time}</td>
      <td>{order.waiter.fullName}</td>
      <td>{order.price}</td>
      <td className={s.center}>
        <button
          className="btn btn-primary mx-2"
          onClick={() => {
            return navigate("/orders/" + order.id);
          }}
        >
          Подробнее
        </button>
        {(["ROLE_DIRECTOR", "ROLE_WAITER", "ROLE_ADMINISTRATOR"].includes(user.role)) &&
        <button
          className="btn btn-danger mx-2"
          onClick={() => {
            dispatch(deleteOrder(jwt, order.id));
            dispatch(getOrders(jwt));
            navigate("/orders" );
          }}
        >
          Удалить
        </button>}
      </td>
    </tr>
  );
};

export default OrderItem;
