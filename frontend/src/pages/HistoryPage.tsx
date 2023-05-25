import { Box, Paper } from "@mui/material";
import { FC, useContext, useEffect, useState } from "react";
import historyApi from "../api/historyApi";
import SelectWorkoutDay from "../components/History/selectWorkoutDay/SelectWorkoutDay";
import SelectWorkoutList from "../components/History/selectWorkoutList/SelectWorkoutList";
import WorkoutHistoryTable from "../components/History/selectWorkoutList/WorkoutHistoryTable";
import TrainingContextProvider, {
  TrainingContext,
} from "../context/training-context";
import ExerciseBase from "../types/ExerciseBase";
import HistoryOfWorkouts from "../types/HistoryOfWorkouts";
import getAverageWeightForTrenings from "../utils/GetAverageWeightForTrenings";

const HistoryPage: FC = () => {
  const [historyOfWorkouts, setHistoryOfWorkouts] = useState<
    HistoryOfWorkouts[]
  >([]);
  const { userId } = useContext(TrainingContext);
  const [valueForExercise, setValueForExercise] = useState<ExerciseBase | null>(
    null
  );
  const [valueForSelectedWorkoutsList, setValueForSelectedWorkoutsList] =
    useState<HistoryOfWorkouts[]>([]);

  const getTrainingValueFromCalendar = async (
    title: string,
    start: Date | null
  ) => {
    await setValueForSelectedWorkoutsList([]);
    setValueForExercise(null);
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
    void historyApi.getHistory(userId).then(({ data }) => {
      setHistoryOfWorkouts(data);
    });
  }, []);

  const getValueForWorkoutsList = async (value: ExerciseBase | null) => {
    await setValueForSelectedWorkoutsList([]);
    setValueForSelectedWorkoutsList(
      historyOfWorkouts.filter((his) => his.idBaseExercise === value?.id)
    );
  };

  const averageWeight = getAverageWeightForTrenings(historyOfWorkouts);
  return (
    <TrainingContextProvider>
      <Box sx={{ display: "flex", flexDirection: "row", marginLeft: "2rem" }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            flex: 0.4,
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
            flex: 0.6,
            maxHeight: "87vh",
            margin: "2rem 2rem 0 2rem",
            overflow: "auto",
          }}
          component={Paper}
          elevation={3}
        >
          <WorkoutHistoryTable
            workouts={valueForSelectedWorkoutsList}
            averageWeight={averageWeight}
          />
        </Box>
      </Box>
    </TrainingContextProvider>
  );
};

export default HistoryPage;
