import CloseIcon from "../assets/icons/closeIcon.svg";
import { Dispatch, SetStateAction, useEffect } from "react";
import AlertDto from "../dtos/AlertDto";

interface AlertProps {
  alert: AlertDto;
  setAlert: Dispatch<SetStateAction<AlertDto>>;
  closeAfter?: number | null;
}

function Alert({ alert, setAlert, closeAfter = null }: AlertProps) {
  useEffect(() => {
    if (alert.open) {
      if (closeAfter) {
        setTimeout(() => setAlert({ ...alert, open: false }), closeAfter);
      }
    }
  }, [alert, setAlert]);

  return (
    <div
      className={`${alert.severity === "error" ? "bg-red-800 text-white" : "bg-green text-dark"} font-nunito px-6 py-3 rounded-lg whitespace-nowrap fixed bottom-6 left-1/2 -translate-x-1/2 flex gap-4 z-40 text-base`}
      hidden={!alert.open}
    >
      <span>{alert.message}</span>
      <button
        type="button"
        className="cursor-pointer"
        onClick={() => setAlert((prev) => ({ ...prev, open: false }))}
      >
        <CloseIcon className="size-5" />
      </button>
    </div>
  );
}

export default Alert;
