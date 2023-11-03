import React, { useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSuppliersSel } from "../../redux/selectors/supplier-selectors";
import { getSuppliers } from "../../redux/reducers/suppliersReducer";
import SupplierItem from "./SupplierItem/SupplierItem";
import Preloader from "../commons/Preloader";
import { useNavigate } from "react-router-dom";
import s from "./Suppliers.module.css";
import { getJwtSel, getUserSel } from "../../redux/selectors/user-selectors";

const SuppliersPage = () => {
  let dispatch = useDispatch();
  let jwt = useSelector(getJwtSel);
  let suppliers = useSelector(getSuppliersSel);
  useEffect(() => {
     dispatch(getSuppliers(jwt));
  }, [JSON.stringify(suppliers)]);  
  
  return (
    <div>
      {suppliers.length == 0 && <div><Preloader/></div>}
      {suppliers.length != 0 && <div><Suppliers suppliers = {suppliers}/></div>}
    </div>
  );
};

const Suppliers = (props) => {
  let navigate = useNavigate();
  let user = useSelector(getUserSel);
  const [companyName, setCompanyName] = useState('');
  const filteredSuppliers = props.suppliers.filter(supplier => {
    return supplier.name.toLowerCase().includes(companyName.toLowerCase())
  })
  return (
    <div>
      <div className={s.head}>
        <h2>Поставщики продуктов</h2>
        {(["ROLE_DIRECTOR", "ROLE_ADMINISTRATOR"].includes(user.role)) &&
        <button
          class="btn"
          onClick={() => {
            return navigate("/suppliers/create");
          }}
          type="submit"
        >
          Добавить поставщика
        </button>}
        <br/><br/>
        <div>
        <form >
          <input
          className={s.searchInput}
          type="text"
          placeholder="Поиск компании по названию..."
          onChange={(e) => setCompanyName(e.target.value)}
          />
        </form>
        <br/>
      </div>
      </div>
      {filteredSuppliers.length != 0 && 
      <table className={`table table-striped border shadow ${s.table}`}>
        <thead className={s.thead}>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Компания</th>
            <th scope="col">Страна</th>
            <th scope="col">Телефон</th>
            <th scope="col" className={s.center}>Действие</th>
          </tr>
        </thead>
        <tbody>
          {filteredSuppliers.map((supplier) => (
            <SupplierItem supplier={supplier}/>
          ))}
        </tbody>
      </table>
} {filteredSuppliers.length == 0 && <h4>Таких поставщиков мы не знаем</h4>}
    </div>
  );
}

export default SuppliersPage;
