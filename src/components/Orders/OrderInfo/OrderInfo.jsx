import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOrderSel } from "../../../redux/selectors/order-selectors";
import { getJwtSel } from "../../../redux/selectors/user-selectors";
import { getOrder } from "../../../redux/reducers/orderInfoReducer";
import s from "./OrderInfo.module.css";
import Preloader from "../../commons/Preloader";
import { getErrorMessageSel } from "../../../redux/selectors/error-selectors";

const OrderInfo = () => {
  let params = useParams();
  let dispatch = useDispatch();
  let orderId = params.orderId;
  let errorMessage = useSelector(getErrorMessageSel);
  let jwt = useSelector(getJwtSel);
  let order = useSelector(getOrderSel);

  useEffect(() => {
    dispatch(getOrder(jwt, orderId));
  }, [JSON.stringify(order), errorMessage]);
  return (
    <div>
      {orderId == order.id && (
        <div>
          <h4>Информация о заказе</h4>
          <br />
          <p><b>Официант:</b> {order.waiter.fullName}</p>
          <p><b>Дата и время заказа:</b> {order.time}</p>
          <p><b>Стоимость:</b> {order.price} руб.</p>
          <ul>
            {order.orderComposition.map((orderPosition) => (
              <li>
                {orderPosition.id.product.name} {orderPosition.amount} шт.{" "}
              </li>
            ))}
          </ul>
        </div>
      )}
      {orderId != order.id && errorMessage =="" (
        <div>
          <Preloader />
        </div>
      )}
      {errorMessage !== "" && <h3>{errorMessage}</h3>}
    </div>
  );
};

export default OrderInfo;
