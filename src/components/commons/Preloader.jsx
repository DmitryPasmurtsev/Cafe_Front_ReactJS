import preloader from "../../resources/preloader.gif";
import s from "./Preloader.module.css";

const Preloader = () => {
    return (
        <div>
<img src={preloader} alt="smth" className={s.preloader}/>
        </div>
    );
}

export default Preloader;