import { FC, useState } from "react";
import CustomSnackbar from "../components/common/CommonSnackbar";


const TrainingPage: FC = () => {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  return (
    <div>
      <button onClick={handleClick}>Show Snackbar</button>

      <CustomSnackbar
        handleClose={handleClose}
        open={open}
        message={"xd"}
        severity={"error"}
      />
    </div>
  );
};
export default TrainingPage;
