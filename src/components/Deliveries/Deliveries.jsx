import React, { useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDeliveriesSel } from "../../redux/selectors/delivery-selectors";
import { getDeliveries } from "../../redux/reducers/deliveriesReducer";
import {getJwtSel, getUserSel} from "../../redux/selectors/user-selectors";
import DeliveryItem from "./DeliveryItem/DeliveryItem";
import Preloader from "../commons/Preloader";
import { useNavigate } from "react-router-dom";
import s from "./Deliveries.module.css";


const DeliveriesPage = () => {
  
  let dispatch = useDispatch();
  let deliveries = useSelector(getDeliveriesSel);
  let jwt = useSelector(getJwtSel);
  useEffect(() => {
     dispatch(getDeliveries(jwt));
  }, [JSON.stringify(deliveries)]);  
  
  return (
    <div>
      {deliveries.length == 0 && <div><Preloader/></div>}
      {deliveries.length != 0 && <div><Deliveries deliveries={deliveries}/></div>}
    </div>
  );
};

const Deliveries = (props) => {
  let navigate = useNavigate();
  let user = useSelector(getUserSel);
  return (
    <div>
      <div className={s.head}>
        <h2>Прошедшие и запланированные поставки</h2>
        {(["ROLE_DIRECTOR", "ROLE_WAITER", "ROLE_ADMINISTRATOR"].includes(user.role)) &&
        <button
          className="btn"
          onClick={() => {
            return navigate("/deliveries/create");
          }}
          type="submit"
        >
          Добавить поставку
        </button>}
        <br/><br/>
      </div>
        <table className={`table table-striped border shadow ${s.table}`}>
        <thead className={s.thead}>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Дата</th>
            <th scope="col">Продукт</th>
            <th scope="col">Поставщик</th>
            <th scope="col" className={s.center}>Действие</th>
          </tr>
        </thead>
        <tbody>
          {props.deliveries.map((delivery) => (
            <DeliveryItem delivery={delivery}/>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DeliveriesPage;
