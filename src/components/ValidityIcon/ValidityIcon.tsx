import { FaCheck } from "react-icons/fa";
import { ImCross } from "react-icons/im";

import s from "./ValidityIcon.module.scss";

const ValidityIcon = ({ isError }: { isError: boolean }) => {
  return (
    <div className={s.crossIcon}>
      {isError ? (
        <ImCross className={s.crossIcon} />
      ) : (
        <FaCheck className={s.checkIcon} />
      )}
    </div>
  );
};

export default ValidityIcon;
