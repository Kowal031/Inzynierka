import { Box, styled } from "@mui/material";
import { FC, useEffect, useState } from "react";
import exerciseApi from "../api/exerciseApi";
import trainingApi from "../api/trainingApi";
import AddWorkouts from "../components/Workouts/AddWorkouts";
import WorkoutsTable from "../components/Workouts/WorkoutsTable";
import Training from "../types/Training";

const ContainerForTable = styled(Box)({
  display: "flex",
  flexDirection: "row",
  minWidth: "100vw",
  flexWrap: "wrap",
  justifyContent: "space-around",
});

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
    void trainingApi
      .getAll()
      .then(({ data }) => {
        setTraining(data);
        const lastId = Math.max(...data.map(({ id }) => id));
        data.length > 0 ? setLastTrainingId(lastId + 1) : setLastTrainingId(0);
        return lastId;
      })
      .then((lastId) => {
        void exerciseApi.deleteExercises(lastId + 1);
      });
  }, [refreshTraining]);

  return (
    <Box>
      <ContainerForAddButton>
        <AddWorkouts
          lastTrainingId={lastTrainingId}
          handleRefreshTraining={handleRefreshTraining}
        />
      </ContainerForAddButton>
      <ContainerForTable>
        {training?.map((tra) => (
          <WorkoutsTable
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
