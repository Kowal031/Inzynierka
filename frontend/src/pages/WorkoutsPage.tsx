import { Box, styled } from "@mui/material";
import { FC, useEffect, useState, useContext } from "react";
import exerciseApi from "../api/exerciseApi";
import trainingApi from "../api/trainingApi";
import CustomSnackbar from "../components/common/CommonSnackbar";
import AddWorkouts from "../components/Workouts/AddWorkouts";
import WorkoutsTable from "../components/Workouts/workoutsTable/WorkoutsTable";
import TrainingContextProvider, {
  TrainingContext,
} from "../context/training-context";
import Training from "../types/Training";
import getTrainingId from "../utils/GetTrainingId";

const ContainerForTable = styled(Box)({
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  justifyContent: "center",
});

const ContainerForAddButton = styled(Box)({
  display: "flex",
  justifyContent: "flex-end",
  alignItems: "center",
  marginRight: "2rem",
});

const WorkoutsPage: FC = () => {
  const [training, setTraining] = useState<Training[]>([]);
  const [openModal, setOpenModal] = useState(false);
  const [refreshTraining, setRefreshTraining] = useState(false);
  const [open, setOpen] = useState(false);
  const { userId } = useContext(TrainingContext);
  const [message, setMessage] = useState<string>("");
  const [severity, setSeverity] = useState<
    "error" | "warning" | "info" | "success"
  >("success");

  const handleOpenSnackBar = (succesfull: boolean, message: string) => {
    if (succesfull) {
      setMessage(message);
      setSeverity("success");
    } else {
      setMessage(message);
      setSeverity("error");
    }
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

  const handleRefreshTraining = () => {
    setRefreshTraining(!refreshTraining);
  };

  const fetchData = async () => {
    await getTrainingId()
      .then((trainingId) => {
        exerciseApi.deleteExercises(trainingId);
      })
      .then(() => {
        setRefreshTraining(!refreshTraining);
        setOpenModal(false);
      });
  };

  const handleOpenModal = (): void => {
    setOpenModal(true);
    handleRefreshTraining();
  };
  const handleCloseModal = () => {
    fetchData();
  };

  useEffect(() => {
    if (userId !== 0) {
      void trainingApi.getAllTrainingsByUserId(userId).then(({ data }) => {
        setTraining(data);
      });
    }
  }, [refreshTraining, userId]);

  return (
    <Box>
      <TrainingContextProvider>
        <ContainerForAddButton>
          <AddWorkouts
            handleCloseModal={handleCloseModal}
            handleOpenModal={handleOpenModal}
            openModal={openModal}
            handleOpenSnackBar={handleOpenSnackBar}
          />
        </ContainerForAddButton>

        <ContainerForTable>
          {training.map((tra) => (
            <WorkoutsTable
              key={tra.id}
              training={tra}
              handleRefreshTraining={handleRefreshTraining}
              handleOpenSnackBar={handleOpenSnackBar}
            />
          ))}
        </ContainerForTable>
        <CustomSnackbar
          handleClose={handleClose}
          open={open}
          message={message}
          severity={severity}
        />
      </TrainingContextProvider>
    </Box>
  );
};

export default WorkoutsPage;
