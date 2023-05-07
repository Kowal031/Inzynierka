import { Snackbar, Alert } from "@mui/material";
import { FC } from "react";

interface CustomSnackbarProps {
  handleClose: (event?: React.SyntheticEvent | Event, reason?: string) => void;
  open: boolean;
  message: string;
  severity: "error" | "warning" | "info" | "success";
}

const CustomSnackbar: FC<CustomSnackbarProps> = ({
  handleClose,
  open,
  message,
  severity,
}) => {
  return (
    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
      <Alert onClose={handleClose} severity={severity} sx={{ width: "100%" }}>
        {message}
      </Alert>
    </Snackbar>
  );
};
export default CustomSnackbar;
