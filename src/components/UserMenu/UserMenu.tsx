import { useSelector } from "react-redux";
import { FaSignOutAlt, FaUserAlt } from "react-icons/fa";

import { openConfirmModal } from "../../utils/openConfirmModal";
import { selectUser } from "../../redux/auth/auth-selectors";
import { useAppDispatch } from "../../redux/store";
import { logOut } from "../../redux/auth/auth-operations";

import s from "./UserMenu.module.scss";

const UserMenu = () => {
  const { username } = useSelector(selectUser);
  const dispatch = useAppDispatch();

  return (
    <div className={s.usermenu}>
      <div className={s.usermenuItem}>
        <FaUserAlt size={18} />
        <span>{username}</span>

        <div
          className={s.logout}
          onClick={() =>
            openConfirmModal(() => {
              dispatch(logOut());
            }, "logout")
          }
        >
          <FaSignOutAlt size={16} />
        </div>
      </div>
    </div>
  );
};

export default UserMenu;
