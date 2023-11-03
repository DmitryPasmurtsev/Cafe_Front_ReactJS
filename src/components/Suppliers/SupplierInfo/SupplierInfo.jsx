import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSupplierSel } from "../../../redux/selectors/supplier-selectors";
import { getJwtSel, getUserSel } from "../../../redux/selectors/user-selectors";
import { getSupplier } from "../../../redux/reducers/suppliersReducer";
import Preloader from "../../commons/Preloader";

const SupplierInfo = () => {
    const navigate = useNavigate();
    let params = useParams();
    let dispatch = useDispatch();
    let supplierId = params.supplierId;
    let jwt = useSelector(getJwtSel);
    let user = useSelector(getUserSel);
    let supplier = useSelector(getSupplierSel);
    useEffect(()=> {
      dispatch(getSupplier(jwt, supplierId))
    }, [JSON.stringify(supplier)])

    return (
        <div>
            {supplierId == supplier.id &&
            <div><h4>{supplier.name}</h4><br/>
            <p><b>Страна:</b> {supplier.country}</p>
            <p><b>Город:</b> {supplier.city}</p>
            <p><b>Адрес:</b> {supplier.address}</p>
            <p><b>Контактный телефон:</b> {supplier.phone}</p>
            {(["ROLE_DIRECTOR", "ROLE_ADMINISTRATOR"].includes(user.role)) &&
            <button
          className="btn btn-outline-primary"
          onClick={() => {
            return navigate("/suppliers/edit/" + supplier.id);
          }}
        >
          Редактировать
        </button>}
            </div>
            }
            {supplierId != supplier.id &&
            <div>
                <Preloader/>
            </div>
            }
        </div>
    );
}

export default SupplierInfo;