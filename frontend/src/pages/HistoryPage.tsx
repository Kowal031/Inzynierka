import { Box, Paper } from "@mui/material";
import { FC, useEffect, useState } from "react";
import historyApi from "../api/historyApi";
import SelectWorkoutDay from "../components/History/selectWorkoutDay/SelectWorkoutDay";
import SelectWorkoutList from "../components/History/selectWorkoutList/SelectWorkoutList";
import WorkoutHistoryTable from "../components/History/selectWorkoutList/WorkoutHistoryTable";
import ExerciseBase from "../types/ExerciseBase";
import HistoryOfWorkouts from "../types/HistoryOfWorkouts";

const HistoryPage: FC = () => {
  const [historyOfWorkouts, setHistoryOfWorkouts] = useState<
    HistoryOfWorkouts[]
  >([]);

  const [valueForExercise, setValueForExercise] = useState<ExerciseBase | null>(
    null
  );
  const [valueForSelectedWorkoutsList, setValueForSelectedWorkoutsList] =
    useState<HistoryOfWorkouts[]>([]);

  const getTrainingValueFromCalendar = async (title: string, start: Date | null) => {
    await setValueForSelectedWorkoutsList([])
    setValueForExercise(null)
    setValueForSelectedWorkoutsList(
      historyOfWorkouts.filter(
        (his) =>
          new Date(his.date).getTime() ===
            (start !== null
              ? new Date(start).getTime()
              : new Date(his.date).getTime()) &&
          his.trainingTitle.includes(title)
      )
    );
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

  const getValueForWorkoutsList = async (value: ExerciseBase | null) => {
    await setValueForSelectedWorkoutsList([])
    setValueForSelectedWorkoutsList(
      historyOfWorkouts.filter((his) => his.idBaseExercise === value?.id)
    );
  };

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
        />
        <SelectWorkoutDay
          historyOfWorkouts={historyOfWorkouts}
          getTrainingValueFromCalendar={getTrainingValueFromCalendar}
        />
      </Box>
      <Box
        sx={{
          width: "100%",
          maxHeight: "87vh",
          margin: "2rem 2rem 0 2rem",
          overflow: "auto",
        }}
        component={Paper}
        elevation={3}
      >
        <WorkoutHistoryTable workouts={valueForSelectedWorkoutsList} />
      </Box>
    </Box>
  );
};

export default HistoryPage;
