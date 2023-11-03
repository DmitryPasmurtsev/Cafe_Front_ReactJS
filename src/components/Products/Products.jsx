import React, { useEffect, useState } from "react";
import ProductItem from "./ProductItem/ProductItem";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../redux/reducers/productsReducer";
import { getProductsSel } from "../../redux/selectors/product-selectors";
import { useNavigate } from "react-router-dom";
import s from "./Products.module.css";
import Preloader from "../commons/Preloader";
import { getJwtSel, getUserSel } from "../../redux/selectors/user-selectors";

const ProductsPage = () => {
  let dispatch = useDispatch();
  let jwt = useSelector(getJwtSel);
  let products = useSelector(getProductsSel);

  useEffect(() => {
    dispatch(getProducts(jwt));
  }, [JSON.stringify(products)]);

  return (
    <div>
      {products.length == 0 && (
        <div>
          <Preloader />
        </div>
      )}
      {products.length != 0 && (
        <div>
          <Products products={products} />
        </div>
      )}
    </div>
  );
};

const Products = (props) => {
  let navigate = useNavigate();
  let user = useSelector(getUserSel);
  const [productName, setProductName] = useState('');
  const filteredProducts = props.products.filter(product => {
    return product.name.toLowerCase().includes(productName.toLowerCase())
  })
  return (
    <div>
      <div className={s.head}>
        <h2>Продукты на складе нашего кафе</h2>
        {(["ROLE_DIRECTOR", "ROLE_WAITER", "ROLE_ADMINISTRATOR"].includes(user.role)) &&
        <button
          class="btn"
          onClick={() => {
            return navigate("/products/create");
          }}
          type="submit"
        >
          Добавить продукт
        </button>}
        <br /><br />
        <div>
        <form >
          <input
          className={s.searchInput}
          type="text"
          placeholder="Поиск продукта по названию..."
          onChange={(e) => setProductName(e.target.value)}
          />
        </form>
        <br/>
      </div>
      </div>
      {filteredProducts.length != 0 && 
      <table className={`table table-striped border shadow ${s.table}`}>
        <thead className={s.thead}>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Название</th>
            <th scope="col">Стоимость</th>
            <th scope="col">Количество на складе</th>
            <th scope="col" className={s.center}>Действие</th>
          </tr>
        </thead>
        <tbody>
          {filteredProducts.map((product) => (
            <ProductItem product={product} />
          ))}
        </tbody>
      </table>
    }
    {filteredProducts.length == 0 && <h4>Такого продукта нет на складе</h4>}
    </div>
  );
};

export default ProductsPage;
