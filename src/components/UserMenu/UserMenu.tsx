import { useSelector } from "react-redux";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { FaSignOutAlt, FaUserAlt } from "react-icons/fa";

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
            confirmAlert({
              title: "Confirm to logout",
              message: "Are you sure to do this?",
              buttons: [
                {
                  label: "Yes",
                  onClick: () => {
                    dispatch(logOut());
                  },
                },
                {
                  label: "No",
                  onClick: () => {},
                },
              ],
            })
          }
        >
          <FaSignOutAlt size={16} />
        </div>
      </div>
    </div>
  );
};

export default UserMenu;
