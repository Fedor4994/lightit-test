import { FaStore } from "react-icons/fa";
import { Link } from "react-router-dom";
import s from "./Logo.module.scss";

const Logo = () => {
  return (
    <Link to="/" className={s.logo}>
      <FaStore size={46} className={s.logoIcon} />
      <span className={s.logoText}>STUFFSTORE</span>
    </Link>
  );
};

export default Logo;
