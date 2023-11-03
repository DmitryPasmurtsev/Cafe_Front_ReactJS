import { NavLink, useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDeliverySel } from "../../../redux/selectors/delivery-selectors";
import { getDelivery } from "../../../redux/reducers/deliveriesReducer";
import {getJwtSel, getUserSel} from "../../../redux/selectors/user-selectors";
import Preloader from "../../commons/Preloader";
import s from "../Deliveries.module.css";


const DeliveryInfo = () => {
    let params = useParams();
    let dispatch = useDispatch();
    let deliveryId = params.deliveryId;
    let jwt = useSelector(getJwtSel);
    let user = useSelector(getUserSel);
    let delivery = useSelector(getDeliverySel);
    let navigate = useNavigate();


    
    let pathToProduct = "/products/" + delivery.product.id;
    let pathToEmployee = "/employees/" + delivery.employee.id;
    let pathToSupplier = "/suppliers/" + delivery.supplier.id;

    useEffect(()=> {
      dispatch(getDelivery(jwt, deliveryId))
    }, [JSON.stringify(delivery)])
    return (
        <div>
            {deliveryId == delivery.id &&
            <div><h4>Информация о поставке {delivery.date}</h4><br/>
            <p><b>Продукт:</b> <NavLink to={pathToProduct} className={s.link}>{delivery.product.name}</NavLink></p>
            <p><b>Количество:</b> {delivery.amount}</p>
            <p><b>Поставщик:</b> <NavLink to={pathToSupplier} className={s.link}>{delivery.supplier.name}</NavLink></p>
            <p><b>Принимающий работник:</b> <NavLink to={pathToEmployee} className={s.link}>{delivery.employee.fullName}</NavLink></p>
            {(["ROLE_DIRECTOR", "ROLE_WAITER", "ROLE_ADMINISTRATOR"].includes(user.role)) &&
            <button
            className="btn btn-outline-primary"
            onClick={() => {
              return navigate("/deliveries/edit/" + delivery.id);
            }}
          >
            Редактировать
          </button>}</div>
            }
            {deliveryId != delivery.id &&
            <div>
                <Preloader/>
            </div>
            }
        </div>
    );
}

export default DeliveryInfo;