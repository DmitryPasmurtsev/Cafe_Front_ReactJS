import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../redux/reducers/productsReducer";
import { getProductsSel } from "../../redux/selectors/product-selectors";
import { getJwtSel } from "../../redux/selectors/user-selectors";
import { useEffect } from "react";

const ProductsStatusView = () => {
    let dispatch = useDispatch();
    let jwt = useSelector(getJwtSel);
    let products = useSelector(getProductsSel);
    
     useEffect(() => {
       dispatch(getProducts(jwt));
    }, [JSON.stringify(products)]);
  
    return (
      <div>
        <h1>Статус продуктов</h1><br/>
        <table className="table table-striped border shadow">
          <thead>
            <tr>
              <th scope="col">Продукт</th>
              <th scope="col">Количество на складе, шт</th>
              <th scope="col">Статус</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr>
              <td>{product.name}</td>
              <td>{product.amount}</td>
              {product.amount < 30 && <td>Допускается поставка</td>}
              {product.amount >= 30 && <td>Поставка не требуется</td>}
            </tr>
            ))}
          </tbody>
        </table>
        <hr/>
        <br/>
      </div>
    );
}

export default ProductsStatusView;