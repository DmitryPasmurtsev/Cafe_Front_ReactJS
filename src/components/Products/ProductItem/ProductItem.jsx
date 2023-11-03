import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteProduct } from "../../../redux/reducers/productsReducer";
import { getJwtSel, getUserSel } from "../../../redux/selectors/user-selectors"
import s from "../Products.module.css";

const ProductItem = (props) => {
  let product = props.product;
  let jwt = useSelector(getJwtSel);
  let user = useSelector(getUserSel);
  const navigate = useNavigate();
  let dispatch = useDispatch();
  return (
    <tr>
      <th scope="row">{product.id}</th>
      <td>{product.name}</td>
      <td>{product.price}</td>
      <td>{product.amount}</td>
      <td className={s.center}>
        <button
          className="btn btn-primary mx-2"
          onClick={() => {
            return navigate("/products/" + product.id);
          }}
        >
          Подробнее
        </button>
        {(["ROLE_DIRECTOR", "ROLE_WAITER", "ROLE_ADMINISTRATOR"].includes(user.role)) &&
        <button
          className="btn btn-danger mx-2"
          onClick={() => {
            dispatch(deleteProduct(jwt, product.id));
            navigate("/products" );
          }}
        >
          Удалить
        </button>}
      </td>
    </tr>
  );
};

export default ProductItem;
