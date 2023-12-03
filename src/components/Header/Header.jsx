import s from "./Header.module.css";
import cafeLogo from "../../resources/cafeLogo.png";
import { useSelector } from "react-redux";
import { getJwtSel, getUserSel } from "../../redux/selectors/user-selectors";
import { NavLink, useNavigate } from "react-router-dom";

const Header = () => {
  let user = useSelector(getUserSel);
  let jwt = useSelector(getJwtSel);
  let navigate = useNavigate();
  return (
    <header className={s.header}>
       <div>
        <img className={s.img}
           src={cafeLogo}
           alt="smth"
         />
       </div>
       <div className={s.title}>Cafe</div>
       <div className={s.profile}>
        {jwt != "" && <div class={s.user}onClick={()=> navigate("/account")}><i class={`fa-solid fa-user ${s.icon}`}/><h3>{user?.login}</h3></div>}
        {jwt == "" && <NavLink to='/login' className={s.link}><h3>Войти</h3></NavLink>}
       </div>
    </header>
  );
};

export default Header;
