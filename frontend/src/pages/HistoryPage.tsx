import { Box, Paper } from "@mui/material";
import { FC, useEffect, useState } from "react";
import historyApi from "../api/historyApi";
import SelectWorkoutDay from "../components/History/selectWorkoutDay/SelectWorkoutDay";
import SelectWorkoutList from "../components/History/selectWorkoutList/SelectWorkoutList";
import WorkoutHistoryTable from "../components/History/selectWorkoutList/WorkoutHistoryTable";
import ExerciseBase from "../types/ExerciseBase";
import HistoryOfWorkouts from "../types/HistoryOfWorkouts";
import sumValuesForHistory from "../utils/SumValuesForHistory";

const HistoryPage: FC = () => {
  const [history, setHistory] = useState<HistoryOfWorkouts[]>([]);
  const summedValues = sumValuesForHistory(history);
  const [valueForExercise, setValueForExercise] = useState<ExerciseBase | null>(
    null
  );
  const [valueForSelectedWorkoutsList, setValueForSelectedWorkoutsList] = useState<HistoryOfWorkouts[]>([]);



  const inputValueExercise = (value: ExerciseBase | null) => {
    setValueForExercise(value);
    getValueForWorkoutsList(value);
  };

  useEffect(() => {
    void historyApi.getHistory().then(({ data }) => {
      setHistory(data);
    });
  }, []);

 const getValueForWorkoutsList = (value: ExerciseBase | null) =>{
  setValueForSelectedWorkoutsList(history.filter((his) => his.idBaseExercise === value?.id));
 }

// console.log(summedValues);

  console.log(valueForSelectedWorkoutsList);

  return (
    <Box sx={{ display: "flex", flexDirection: "row" }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <SelectWorkoutList
          inputValueExercise={inputValueExercise}
          valueForExercise={valueForExercise}
          history={history}
          getValueForWorkoutsList={getValueForWorkoutsList}
        />
        <SelectWorkoutDay history={history} />
      </Box>
      <Box
        sx={{ width: "100%", margin: "2rem 2rem 0 2rem" }}
        component={Paper}
        elevation={3}
      >
       <WorkoutHistoryTable workouts={valueForSelectedWorkoutsList} />
      </Box>
    </Box>
  );
};

export default HistoryPage;
