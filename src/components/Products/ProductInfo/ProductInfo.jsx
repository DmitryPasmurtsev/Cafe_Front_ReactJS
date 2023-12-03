import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductSel } from "../../../redux/selectors/product-selectors";
import { getProduct } from "../../../redux/reducers/productInfoReducer";
import { getJwtSel, getUserSel } from "../../../redux/selectors/user-selectors";
import Preloader from "../../commons/Preloader";
import { getErrorMessageSel } from "../../../redux/selectors/error-selectors";

const ProductInfo = () => {
    const navigate = useNavigate();
    let params = useParams();
    let dispatch = useDispatch();
    let productId = params.productId;
    let jwt = useSelector(getJwtSel);
    let user = useSelector(getUserSel);
    let product = useSelector(getProductSel);
    let errorMessage = useSelector(getErrorMessageSel);
    useEffect(()=> {
      dispatch(getProduct(jwt, productId))
    }, [JSON.stringify(product), errorMessage])
    return (
        <div>
            {productId == product.id &&
            <div><h4>{product.name}</h4><br/>
            <p><b>Калории:</b> {product.calories}, ккал</p>
            <p><b>Цена:</b> {product.price}, BYN</p>
            <p><b>Количество на складе:</b> {product.amount}</p>
            <p><b>Вес:</b> {product.unitWeight}, грамм</p>
            {product.description && <p><b>Описание:</b> {product.description}</p>}
            {(["ROLE_DIRECTOR", "ROLE_WAITER", "ROLE_ADMINISTRATOR"].includes(user.role)) &&
            <button
          className="btn btn-outline-primary"
          onClick={() => {
            return navigate("/products/edit/" + product.id);
          }}
        >
          Редактировать
        </button>}</div>
            }
            {productId != product.id && errorMessage == "" &&
            <div>
                <Preloader/>
            </div>
            }
            {errorMessage !== "" && <h3>{errorMessage}</h3>}
        </div>
    );
}

export default ProductInfo;