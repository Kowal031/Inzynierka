import { Box, Paper } from "@mui/material";
import { FC, useEffect, useState } from "react";
import historyApi from "../api/historyApi";
import SelectWorkoutDay from "../components/History/selectWorkoutDay/SelectWorkoutDay";
import SelectWorkoutList from "../components/History/selectWorkoutList/SelectWorkoutList";
import WorkoutHistoryTable from "../components/History/selectWorkoutList/WorkoutHistoryTable";
import ExerciseBase from "../types/ExerciseBase";
import HistoryOfWorkouts from "../types/HistoryOfWorkouts";
import SloRenderValueForHistory from "../utils/SloRenderValueForHistory";
import sumValuesForHistory from "../utils/SumValuesForHistory";



const HistoryPage: FC = () => {
  const [historyOfWorkouts, setHistoryOfWorkouts] = useState<
    HistoryOfWorkouts[]
  >([]);

  const [valueForExercise, setValueForExercise] = useState<ExerciseBase | null>(
    null
  );
  const [valueForSelectedWorkoutsList, setValueForSelectedWorkoutsList] =
    useState<HistoryOfWorkouts[]>([]);

  const [valueForCalendary, setValueForCalendary] = useState<
    HistoryOfWorkouts[]
  >([]);

  const [renderValueFrom, setRenderValueFrom] =
    useState<SloRenderValueForHistory | null>(null);

  const changeRenderValue = (value: SloRenderValueForHistory) => {
    setRenderValueFrom(value);
  };

  const inputValueExercise = (value: ExerciseBase | null) => {
    setValueForExercise(value);
    getValueForWorkoutsList(value);
  };

  useEffect(() => {
    void historyApi.getHistory().then(({ data }) => {
      setHistoryOfWorkouts(data);
    });
  }, []);

  const getValueForWorkoutsList = (value: ExerciseBase | null) => {
    setValueForSelectedWorkoutsList(
      historyOfWorkouts.filter((his) => his.idBaseExercise === value?.id)
    );
  };

  // console.log(summedValues);

  const result = () => {
    switch (renderValueFrom) {
      case SloRenderValueForHistory.ValueForList:
        return valueForSelectedWorkoutsList;

      case SloRenderValueForHistory.ValueFromCalendar:
        return valueForCalendary;
      default:
        return valueForSelectedWorkoutsList;
    }
  };

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
          history={historyOfWorkouts}
          changeRenderValue={changeRenderValue}
        />
        <SelectWorkoutDay
          historyOfWorkouts={historyOfWorkouts}
          changeRenderValue={changeRenderValue}
        />
      </Box>
      <Box
        sx={{ width: "100%", margin: "2rem 2rem 0 2rem" }}
        component={Paper}
        elevation={3}
      >
        <WorkoutHistoryTable
          workouts={result()}
        />
      </Box>
    </Box>
  );
};

export default HistoryPage;
