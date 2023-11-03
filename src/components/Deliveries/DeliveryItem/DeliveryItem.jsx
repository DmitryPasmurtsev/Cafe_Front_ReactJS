import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteDelivery } from "../../../redux/reducers/deliveriesReducer";
import s from "../Deliveries.module.css";
import { getJwtSel, getUserSel } from "../../../redux/selectors/user-selectors";


const DeliveryItem = (props) => {
  let delivery = props.delivery;
  const navigate = useNavigate();
  let dispatch = useDispatch();
  let user = useSelector(getUserSel);
  let jwt = useSelector(getJwtSel);
  return (
    <tr>
      <th scope="row">{delivery.id}</th>
      <td>{delivery.date}</td>
      <td>{delivery.product.name}</td>
      <td>{delivery.supplier.name}</td>
      <td className={s.center}>
        <button
          className="btn btn-primary mx-2"
          onClick={() => {
            return navigate("/deliveries/" + delivery.id);
          }}
        >
          Подробнее
        </button>
        {(["ROLE_DIRECTOR", "ROLE_WAITER", "ROLE_ADMINISTRATOR"].includes(user.role)) &&
        <button
          className="btn btn-danger mx-2"
          onClick={() => {
            dispatch(deleteDelivery(jwt, delivery.id));
            navigate("/deliveries" );
          }}
        >
          Удалить
        </button>
        }
      </td>
    </tr>
  );
};

export default DeliveryItem;
