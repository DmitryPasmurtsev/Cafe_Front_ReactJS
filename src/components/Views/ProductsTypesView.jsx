import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../redux/reducers/productsReducer";
import { getProductsSel } from "../../redux/selectors/product-selectors";
import { getJwtSel } from "../../redux/selectors/user-selectors";
import { useEffect } from "react";

const ProductsTypesView = () => {
    let dispatch = useDispatch();
    let products = useSelector(getProductsSel);
    let jwt = useSelector(getJwtSel);
     useEffect(() => {
       dispatch(getProducts(jwt));
    }, [JSON.stringify(products)]);
  
    return (
      <div>
        <h1>Типы продуктов</h1><br/>
        <table className="table table-striped border shadow">
          <thead>
            <tr>
              <th scope="col">Продукт</th>
              <th scope="col">Цена за единицу</th>
              <th scope="col">Тип</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr>
              <td>{product.name}</td>
              <td>{product.price}</td>
              <td>
              {product.name.toLowerCase().includes("кофе") && "Кофе"}
              {product.name.toLowerCase().includes("слойка") && "Слойка"}
              {product.name.toLowerCase().includes("молоко") && "Молоко"}
              {product.name.toLowerCase().includes("сироп") && "Сироп"}
              {product.name.toLowerCase().includes("сливки") && "Сливки"}
              </td>
            </tr>
            ))}
          </tbody>
        </table>
        <hr/><br/>
      </div>
    );
}

export default ProductsTypesView;