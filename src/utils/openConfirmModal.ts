import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

export const openConfirmModal = (
  confirmedFunction: () => void,
  confirmedText: string
) => {
  confirmAlert({
    title: `Confirm to ${confirmedText}`,
    message: "Are you sure to do this?",
    buttons: [
      {
        label: "Yes",
        onClick: () => {
          confirmedFunction();
        },
      },
      {
        label: "No",
        onClick: () => {},
      },
    ],
  });
};
