import { Box, styled } from "@mui/material";
import { FC, useEffect, useState } from "react";
import exerciseApi from "../api/exerciseApi";
import trainingApi from "../api/trainingApi";
import AddWorkouts from "../components/Workouts/AddWorkouts";
import WorkoutsTable from "../components/Workouts/WorkoutsTable";
import Training from "../types/Training";

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
  const [refreshTraining, setRefreshTraining] = useState(false);
  const [lastTrainingId, setLastTrainingId] = useState<number>(0);

  const handleRefreshTraining = () => {
    setRefreshTraining(!refreshTraining);
  };

  useEffect(() => {
    // Fetch all trainings and update state
    void trainingApi
      .getAllTrainings()
      .then(({ data }) => {
        setTraining(data);

        // Get the last training ID, or 0 if there are no trainings
        const lastId = data.length > 0 ? Math.max(...data.map(({ id }) => id)) : 0;

        // Set the last training ID state variable
        setLastTrainingId(lastId + 1);

        // Delete any exercises for a training that doesn't exist
        void exerciseApi.deleteExercises(lastId + 1);
      });
  }, [refreshTraining]);

  return (
    <Box>
      {/* Container for the AddWorkouts component */}
      <ContainerForAddButton>
        <AddWorkouts
          lastTrainingId={lastTrainingId}
          handleRefreshTraining={handleRefreshTraining}
        />
      </ContainerForAddButton>

      {/* Container for the WorkoutsTable components */}
      <ContainerForTable>
        {/* Render a WorkoutsTable component for each training */}
        {training.map((tra) => (
          <WorkoutsTable
            key={tra.id} // Add a key prop to fix a warning
            training={tra}
            lastTrainingId={lastTrainingId}
            handleRefreshTraining={handleRefreshTraining}
          />
        ))}
      </ContainerForTable>
    </Box>
  );
};

export default WorkoutsPage;