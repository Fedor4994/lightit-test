import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FaListUl, FaSignOutAlt, FaUserAlt } from "react-icons/fa";

import { selectUser } from "../../redux/auth/auth-selectors";
import { useAppDispatch } from "../../redux/store";
import { logOut } from "../../redux/auth/auth-operations";

import s from "./UserMenu.module.scss";

const UserMenu = () => {
  const { username } = useSelector(selectUser);
  const dispatch = useAppDispatch();

  return (
    <div className={s.dropdown}>
      <button className={s.dropButton}>
        <FaUserAlt className={s.userIcon} size={18} />
        <span>{username}</span>
      </button>
      <div className={s.dropdownContent}>
        <Link className={s.favoriteLink} to="/favorite">
          <FaListUl size={16} />
          Favorite
        </Link>
        <div
          onClick={() => {
            dispatch(logOut());
          }}
        >
          <FaSignOutAlt size={16} />
          Log out
        </div>
      </div>
    </div>
  );
};

export default UserMenu;
