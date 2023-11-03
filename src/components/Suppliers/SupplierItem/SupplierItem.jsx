import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteSupplier } from "../../../redux/reducers/suppliersReducer";
import s from "../Suppliers.module.css";
import { getJwtSel, getUserSel } from "../../../redux/selectors/user-selectors";

const SupplierItem = (props) => {
  let supplier = props.supplier;
  const navigate = useNavigate();
  let dispatch = useDispatch();

  let jwt = useSelector(getJwtSel);
  let user = useSelector(getUserSel);

  return (
    <tr>
      <th scope="row">{supplier.id}</th>
      <td>{supplier.name}</td>
      <td>{supplier.country}</td>
      <td>{supplier.phone}</td>
      <td className={s.center}>
        <button
          className="btn btn-primary mx-2"
          onClick={() => {
            return navigate("/suppliers/" + supplier.id);
          }}
        >
          Подробнее
        </button>
        {(["ROLE_DIRECTOR", "ROLE_ADMINISTRATOR"].includes(user.role)) &&
        <button
          className="btn btn-danger mx-2"
          onClick={() => {
            dispatch(deleteSupplier(jwt, supplier.id));
            navigate("/suppliers" );
          }}
        >
          Удалить
        </button>}
      </td>
    </tr>
  );
};

export default SupplierItem;
