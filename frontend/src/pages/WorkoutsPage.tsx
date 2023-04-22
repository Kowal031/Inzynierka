import { Box, styled } from "@mui/material";
import { FC, useEffect, useState } from "react";
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
  useEffect(() => {
    void trainingApi.getAll().then(({ data }) => setTraining(data));
  }, []);
  return (
    <Box>
      <ContainerForAddButton>
        <AddWorkouts />
      </ContainerForAddButton>
      <ContainerForTable>
        {training?.map((name) => (
          <WorkoutsTable name={name.name} />
        ))}
      </ContainerForTable>
    </Box>
  );
};
export default WorkoutsPage;
