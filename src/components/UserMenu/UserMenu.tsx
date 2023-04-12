import { FaListUl, FaSignOutAlt, FaUserAlt } from "react-icons/fa";
import s from "./UserMenu.module.scss";

const UserMenu = () => {
  return (
    <div className={s.dropdown}>
      <button className={s.dropButton}>
        <FaUserAlt className={s.userIcon} size={18} />
        <span>Usename</span>
      </button>
      <div className={s.dropdownContent}>
        <div>
          <FaListUl size={16} />
          My reviews
        </div>
        <div>
          <FaSignOutAlt size={16} />
          Log out
        </div>
      </div>
    </div>
  );
};

export default UserMenu;
