import { Box, styled } from "@mui/material";
import { FC, useEffect, useState } from "react";
import exerciseApi from "../api/exerciseApi";
import trainingApi from "../api/trainingApi";
import AddWorkouts from "../components/Workouts/AddWorkouts";
import WorkoutsTable from "../components/Workouts/WorkoutsTable";
import Training from "../types/Training";
import getTrainingId from "../utils/GetTrainingId";

// Container for the WorkoutsTable components
const ContainerForTable = styled(Box)({
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  justifyContent: "space-around",
});

// Container for the AddWorkouts component
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
    void trainingApi.getAllTrainings().then(({ data }) => {
      setTraining(data);
    });
  }, [refreshTraining]);

  return (
    <Box>
      {/* Container for the AddWorkouts component */}
      <ContainerForAddButton>
        <AddWorkouts
          handleCloseModal={handleCloseModal}
          handleOpenModal={handleOpenModal}
          openModal={openModal}
        />
      </ContainerForAddButton>

      {/* Container for the WorkoutsTable components */}
      <ContainerForTable>
        {/* Render a WorkoutsTable component for each training */}
        {training.map((tra) => (
          <WorkoutsTable
            key={tra.id} // Add a key prop to fix a warning
            training={tra}
            handleRefreshTraining={handleRefreshTraining}
          />
        ))}
      </ContainerForTable>
    </Box>
  );
};

export default WorkoutsPage;
